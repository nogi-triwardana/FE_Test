'use client';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/themes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};