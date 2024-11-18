"use client"

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Header } from "@/components/organisms";
import { Box, Paper, styled } from "@mui/material";
import Sidebar from "@/components/organisms/Sidebar";
import { FormProvider, useForm } from "react-hook-form";

type refType = {
  // add anything atribute with ref related
} | any;

const sidebarWidth = {
  expand: 256,
  collapse: 120
}

const Main = styled(Box, { shouldForwardProp: (prop: any) => prop !== 'width' })(({ theme, width }) => ({
  position: 'relative', 
  marginLeft: `${width}px`,
  width: '100%',
  height: '100%', 
  minHeight: '100vh',
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.enteringScreen,
  }),
  boxSizing: 'border-box',
}));

const Layout = forwardRef<refType, { children: React.ReactNode }>(({
  children
}, ref) => {
  const [open, setIsOpen] = useState(true);
  const [isOpenNotif, setIsOpenNotif] = useState(false);
  const sidebarRef = useRef();
  const methods = useForm();

  useImperativeHandle(ref, () => ({

  }));

  const onChangeOpen = () => {
    if(isOpenNotif) setIsOpenNotif(false);
    setIsOpen(open => !open);
  }

  const onChangeOpenNotif = () => {
    if(!open) {
      setIsOpen(true);
      setIsOpenNotif(open => !open);
    } else {
      setIsOpenNotif(open => !open);
    }
  } 

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar 
          sidebarWidth={sidebarWidth}
          ref={sidebarRef}
          open={open}
          onChangeOpen={onChangeOpen}
          onChangeOpenNotif={onChangeOpenNotif}
        />
        <Box 
          sx={(theme: any) => ({ 
            display: 'flex', 
            width: '100%', 
            position: 'relative', 
            zIndex: 0,
            "*::-webkit-scrollbar": {
              width: "5px",
              height: "5px",
            },
            "*::-webkit-scrollbar-track": {
              background: theme.palette?.whiteGray?.main,
            },
            "*::-webkit-scrollbar-thumb": {
              background: theme.palette?.whiteGray?.dark,
              borderRadius: "12px"
            },
          })}
        >
          <Main 
            width={open ? sidebarWidth.expand : sidebarWidth.collapse}
          >
            <Header />           
            <Box sx={{ p: 2 }}>
              <Paper 
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  padding: 4,
                }}
              >
                {children}
              </Paper>
            </Box>
          </Main>
        </Box>
      </Box>
    </FormProvider>
  )
});

export default Layout;