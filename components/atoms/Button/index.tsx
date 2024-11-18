"use client"

import { forwardRef, useImperativeHandle } from "react";
import { Button as MuiButton } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { TButtonProps } from "@/@types/components/atoms";

type refType = {
  // add anything atribute with ref related
} | any;

const Button = forwardRef<refType, TButtonProps>(({
  children,
  sx,
  isLoading,
  loadingWithoutText = false,
  ...props
}, ref) => {

  useImperativeHandle(ref, () => ({

  }));

  return (
    <MuiButton
      {...props}
      {...(isLoading && {
        startIcon: <CircularProgress size={18} sx={{ color: 'white' }} />
      })}
      sx={{
        outline: 'none !important',
        fontWeight: 500,
        ...(isLoading && {
          background: (theme: any) => theme.palette.whiteGray.dark,
          color: '#FFFFFF',
        }),
        ...sx
      }}
    >
      {isLoading ? (loadingWithoutText ? null : children) : children}
    </MuiButton>
  );
});

export default Button;