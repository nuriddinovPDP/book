import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth";

const Header = ({ setSearchTitle }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext) || {};

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTitle && setSearchTitle(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("secret");
    localStorage.removeItem("auth");
    setAuth && setAuth(false);
    navigate("/signin");
    toast.info("Logged out successfully!");
  };

  return (
    <header className="text-white flex items-center px-6 py-3 rounded-bl-[80px] justify-between ">
      <div className="flex gap-6 items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="w-[150px] h-[36px]" />
        </div>

        <div className="flex items-center px-3 py-1.5 w-80 border border-gray-600 rounded">
          <input
            type="text"
            placeholder="Search for any training you want"
            className="bg-transparent outline-none text-sm text-white w-full placeholder-gray-400"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 hover:bg-red-500 text-white py-1.5 px-4 rounded transition"
        >
          Log Out
        </button>
        <img
          src="/user-image.svg"
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-pink-500"
        />
      </div>
    </header>
  );
};

export default Header;
