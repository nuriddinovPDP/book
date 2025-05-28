import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { API } from "../../utils/config";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/signup", {
        name: values.username,
        key: values.password,
        secret: "MySecret1",
      });

      localStorage.setItem("key", res.data.data.key);
      localStorage.setItem("secret", res.data.data.secret);
      setAuth(true);
      toast.success("Sign In successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Username or password is incorrect! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Box className="w-[430px] bg-white rounded-xl shadow-lg px-7 py-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            Sign in
          </Typography>

          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={values.username}
            onChange={handleChange}
            required
          />

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#6B21A8", "&:hover": { bgcolor: "#581C87" } }}
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2} color="text.secondary">
          Not signed up yet?{" "}
          <Link to="/signup" className="text-purple-700 hover:underline">
            Go to sign up.
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
