import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { API } from "../../utils/config";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface RegisterValues {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<RegisterValues>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext) as { setAuth: (value: boolean) => void };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const res = await API.post("/signup", {
        name: values.username,
        email: values.email,
        key: values.password,
        secret: "MySecret1",
      });
      localStorage.setItem("key", res.data.data.key);
      localStorage.setItem("secret", res.data.data.secret);
      setAuth(true);
      toast.success("Sign Up successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Username or password is incorrect! Please try again.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ width: 430, p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
            Sign up
          </Typography>

          <TextField
            label="Username"
            id="username"
            fullWidth
            margin="normal"
            value={values.username}
            onChange={handleChange}
            required
          />

          <TextField
            label="Email"
            id="email"
            fullWidth
            margin="normal"
            value={values.email}
            onChange={handleChange}
            required
          />

          <Box position="relative">
            <TextField
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={values.password}
              onChange={handleChange}
              required
            />
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              sx={{ position: "absolute", right: 10, top: 30 }}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </IconButton>
          </Box>

          <TextField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={values.confirmPassword}
            onChange={handleChange}
            error={values.confirmPassword !== "" && values.password !== values.confirmPassword}
            helperText={
              values.confirmPassword !== "" && values.password !== values.confirmPassword
                ? "Passwords do not match"
                : ""
            }
            required
          />

          {error && (
            <Typography color="error" fontSize={14} mt={1} mb={2}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#7A00FF", mt: 2, mb: 2, "&:hover": { bgcolor: "#5a00c4" } }}
          >
            Submit
          </Button>
        </form>

        <Typography textAlign="center" variant="body2" color="textSecondary">
          Already signed up?{" "}
          <Link to="/signin" style={{ color: "#7A00FF", textDecoration: "none" }}>
            Go to sign in.
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
