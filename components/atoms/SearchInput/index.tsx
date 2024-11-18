import { Box, TextField } from "@mui/material"
import { forwardRef, useImperativeHandle, useState } from "react"

type refType = {
  // add anything atribute with ref related
} | any;

const InputSearch = forwardRef<refType, any>(({
  control,
  controllerName,
  label,
  value,
  onChange,
  id,
  type = "text",
  startIcon,
  ...props
}, ref) => {
  const [defaultType] = useState(type);

  useImperativeHandle(ref, () => ({

  }));

  return (
    <Box 
      id={id}
      sx={{
        // padding: '12px 0px',
        // width: '100%',
      }}
    >
      <TextField 
        label={label}
        value={value}
        variant="outlined"
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            "& > fieldset": {
              borderColor: "#128DA6",
              borderRadius: '8px',
            },
          },
        }}
        InputLabelProps={{
          style: {
            color: "#128DA6",
          },
          sx: {
            display: 'none'
          },
          shrink: true
        }}
        InputProps={{
          style: {
            borderColor: "#128DA6"
          },
          startAdornment: startIcon
        }}
        onChange={onChange}
        type={defaultType}
        {...props}
      />
    </Box>
  );
});

export default InputSearch;