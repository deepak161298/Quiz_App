import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { handleNameChange } from "../Redux/action";

const TextFieldCom = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(handleNameChange(event.target.value));
  };

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
        required
          onChange={handleChange}
          variant="outlined"
          placeholder="Name"
          className="input-name input-txt"
          size="small"
          borderRadius="14px"
          sx={{color:"#fff",border:"2px solid #fff",borderRadius:"8px"}}
        />
      </FormControl>
    </Box>
  );
};

export default TextFieldCom;
