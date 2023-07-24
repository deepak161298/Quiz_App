import { useDispatch } from "react-redux";
import React, { useState } from "react";

import { handleCategoryChange,handleLimitChange,handleDifficultyChange } from "../Redux/action";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

const SelectField = (props) => {
  const { label, options } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(event.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(event.target.value));
        break;
      case "Limit":
        dispatch(handleLimitChange(event.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <Box mt={3} width="100%">
      <FormControl size="small" fullWidth sx={{textAlign:"left"}}>
        {/* <InputLabel className="input-txt">{label}</InputLabel> */}
        <Select  className="input-txt" placeholder={label} required sx={{textAlign:"left"}} value={value} label={label} onChange={handleChange}  sx={{color:"#fff",border:"2px solid #fff",borderRadius:"8px"}} displayEmpty
        fullWidth
        >
           <MenuItem value="" color="#fff" disabled>
          {label}
        </MenuItem>
          {options.map(({ id, name }) => (
            <MenuItem value={id} key={id} >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectField;
