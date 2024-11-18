"use client"

import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, Button } from "@/components/atoms";
import styled from "@emotion/styled";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { useYupValidationResolver } from "@/utils/helpers";
import { useSnackbar } from "notistack";
import { useState } from "react";

const ImageStyled = styled(Image)`
  width: 100%;
  height: 100%;
  inset: 0;
  
`;

type TDefaultValues = {
  username: string;
  password: string;
}

const defaultValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required("Username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const resolver = useYupValidationResolver(validationSchema);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<TDefaultValues>({
    defaultValues,
    resolver
  });
  const { control, watch } = methods;

  const handleSubmit = async (payload: any) => {
    setIsLoading(true);
    const response = await signIn('credentials', {
      username: payload.username,
      password: payload.password,
      redirect: false
    });
    
    if(response?.status === 401) {
      enqueueSnackbar(response?.error, { variant: "error" });
    }

    if(response?.status === 200) {
      window.location.href = '/dashboard';
    }

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <Box 
        sx={{ 
          display: "flex", 
          height: "100vh",
        }}
      >
        <Box 
          sx={{ 
            display: "flex",
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%"
          }}
        >
          <Stack 
            sx={{
              width: "80%",
            }}
            spacing={2}
            alignItems={"center"}
          >
            <Box 
              sx={{
                position: "relative",
                width: "200px",
              }}
            >
              <ImageStyled
                width={'0'}
                height={'0'}
                sizes={'100vw'}
                src={"/assets/images/main-logo.png"}
                alt="logo-jasa-marga"
              />
            </Box>
            <FormInput
              control={control}
              controllerName={'username'}
              label={'Username'}
            />
            <FormInput
              control={control}
              controllerName={'password'}
              label={'Password'}
              type={"password"}
            />
            <Box 
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant={"contained"}
                sx={{
                  width: "100px",
                  borderRadius: "100px",
                }}
                isLoading={isLoading}
                onClick={() => methods.handleSubmit(handleSubmit)()}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </Box>
        <Box 
          sx={{ 
            flex: 1,
          }}
        >
          <ImageStyled
            width={'0'}
            height={'0'}
            sizes={'100vw'}
            src={'/assets/images/office-logo.jpeg'}
            alt={"illustration-logo"}
          />
        </Box>
      </Box>
    </FormProvider>
  );
}
