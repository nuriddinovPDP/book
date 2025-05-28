import React, { ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderInpProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void;
}

const HeaderInp: React.FC<HeaderInpProps> = ({ value, onChange, onSearchClick }) => {
  return (
    <Paper
      component="form"
      sx={{
        bgcolor: "#333333",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        ml: "20px",
        color: "#fff",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder="Search for any training you want"
        inputProps={{ "aria-label": "search input" }}
        value={value}
        onChange={onChange}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={onSearchClick}>
        <SearchIcon sx={{ color: "#fff" }} />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

export default HeaderInp;
