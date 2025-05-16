import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

type SearchBarProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  setPaginate: (page: number) => void;
};

export default function SearchBar({
  searchText,
  setSearchText,
  setPaginate,
}: SearchBarProps) {
  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setPaginate(1);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <TextField
      id="search-bar"
      className="search-bar-root"
      value={searchText}
      onChange={handleChange}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "white" }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={clearSearch}>
              <CancelIcon sx={{ color: "white" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
        },
      }}
    />
  );
}
