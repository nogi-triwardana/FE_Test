import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { forwardRef, useImperativeHandle, useState } from "react"
import { Controller } from "react-hook-form"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { TFormInputProps } from "@/@types/components/atoms";

enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

type refType = {
  // add anything atribute with ref related
} | any;

const FormInput = forwardRef<refType, TFormInputProps>(({
  control,
  controllerName,
  id,
  type = "text",
  endIcon = null,
  startIcon = null,
  borderColor = "",
  borderRadius = "0px",
  width = "100%",
  maxCharCounter = false,
  customLabelBottom = false,
  isPaddingWrapper = true,
  label,
  prefixInput,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [defaultType, setDefaultType] = useState(type);

  useImperativeHandle(ref, () => ({

  }));

  const handleClickShowPassword = () => {
    setShowPassword((curr) => !curr);
    setDefaultType(showPassword ? InputType.PASSWORD : InputType.TEXT);
  }

  return (
    <Controller 
      control={control}
      name={controllerName}
      render={({ 
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => {
        return (
          <Box 
            id={id}
            sx={{
              padding: isPaddingWrapper ? '12px 0px' : 0,
              width: width,
            }}
          >
            <TextField 
              label={label}
              value={value}
              variant="outlined"
              InputProps={{
                startAdornment: (startIcon && prefixInput) ? (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="start-icon-text-field"
                      >
                        {startIcon}
                      </IconButton>
                      <Typography color={'#585858'} fontWeight={500}>{prefixInput}</Typography>
                    </InputAdornment>
                  </Box>
                ) : startIcon ? (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="start-icon-text-field"
                    >
                      {startIcon}
                    </IconButton>
                  </InputAdornment>
                ) : prefixInput ? (
                  <InputAdornment position="start">
                    {prefixInput}
                  </InputAdornment>
                ) : null,
                endAdornment: type === "password" ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon 
                          sx={{ fontSize: '24px', color: '#585858' }} 
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon 
                          sx={{ fontSize: '24px', color: '#585858' }} 
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ) : endIcon ? (
                  <InputAdornment position="end">
                    <IconButton sx={{ p: 0 }}>
                      {endIcon}
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
              sx={{
                color: '#585858',
                width: width, 
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: borderColor,
                    borderRadius: borderRadius,
                  },
                },
                "& .MuiOutlinedInput-root.Mui-disabled": {
                  "& fieldset": {
                    borderColor: borderColor,
                    backgroundColor: '#E1E1E1',
                    opacity: 0.5,
                  },
                },
                '& .MuiFormLabel-root': {
                  backgroundColor: '#E8F8FC',
                  padding: 1,
                  fontSize: '14px',
                  borderRadius: '16px',
                },
                ...((props.select && !!props.placeholder) && {
                  "& .MuiSelect-select span::before": {
                    content: `"${props.placeholder}"`,
                    opacity: 0.4,
                  }
                }),
                ...props?.sx,
              }}
              InputLabelProps={{
                shrink: true,
                // style: {
                //   backgroundColor: '#E8F8FC',
                //   padding: 1,
                //   fontSize: '14px',
                // },
              }}
              onChange={onChange}
              type={defaultType}
              {...props}
            />
            <Box 
              sx={{
                display: 'flex',
                justifyContent: maxCharCounter && customLabelBottom ? 
                  'space-between' : 'flex-end',
                width: '100%',
                marginTop: '8px',
              }}
            >
              {customLabelBottom}
              {maxCharCounter && (
                <Typography color={'#969696'} fontWeight={500} fontSize={14}>
                  {value?.length ?? 0}/{maxCharCounter}
                </Typography>
              )}
            </Box>
            {invalid && (
              <Box>
                <Typography fontSize={14} color={'#C33025'}>
                  {error?.message}
                </Typography>
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
});

export default FormInput;