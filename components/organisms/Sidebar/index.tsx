import Image from "next/image";
import { 
  Avatar,
  Box, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Stack, 
  styled, 
  SvgIcon, 
  Typography 
} from '@mui/material';
import { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { menus } from "@/constants/menus";
import { useRouter } from "next/navigation";

const WrapperDrawer = styled(Drawer, { shouldForwardProp: (prop: any) =>  prop !== "isOpen"})<{
  width: number;
}>(({ theme, width }: any) => ({
  padding: '12px',
  flexShrink: 1,
  height: '100%',
  flex: 'none !important',
  position: 'absolute',
  '& .MuiDrawer-paper': {
    width: `${width}px`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  "*::-webkit-scrollbar": {
    width: "5px"
  },
  "*::-webkit-scrollbar-track": {
    background: theme.palette?.whiteGray?.main,
  },
  "*::-webkit-scrollbar-thumb": {
    background: theme.palette?.whiteGray?.dark,
    borderRadius: "12px"
  }
}));

type refType = {
  // add anything atribute with ref related
} | any;

const ImageStyled = styled(Image)`
  width: 100%;
  height: 100%;
  inset: 0;
`;

const Sidebar = forwardRef<refType, ISidebarProps>(({
  sidebarWidth,
  open,
  onChangeOpen,
  onChangeOpenNotif,
}, ref) => {
  const router = useRouter();
  const [menuList, setMenuList] = useState(menus);

  useImperativeHandle(ref, () => ({

  }));

  const handleRoute = (item: any) => {
    if(item.route) {
      router.push(item.route);
    }
    else {
      setMenuList((curr: any) => {
        let temp = curr.map((el: any, i: number) => ({
            ...el,
            isOpenChild: !el.isOpenChild,
          })
        );

        return temp;
      })
    }
  }

  return (
      <Box sx={{ display: 'flex', flex: 'none' }}>
      <WrapperDrawer 
        variant="permanent"
        width={open ? sidebarWidth.expand : sidebarWidth.collapse}
      >
        <Box
          sx={{ 
            display: 'flex', 
            justifyContent: open ? 'space-between' : 'center', 
            padding: '16px' 
          }}
        >
          <Box 
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            <ImageStyled
              width={'0'}
              height={'0'}
              sizes={'100vw'}
              src={open ? "/assets/images/landscape-logo.jpeg" : "/assets/images/logo-icon.png"}
              alt="logo jasa marga"
            />
          </Box>
          <IconButton
            onClick={onChangeOpen}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon 
              sx={{
                transform: open ? "rotate(0)" : "rotate(180deg)",
                transition: "all 0.4s linear"
              }}
            />
          </IconButton>
        </Box>
        <List>
          {menuList.map((item: any, idx: number) => {
            let Icon = item.icon;
            return (
              <ListItem 
                key={'sidebar-item-' + idx} 
                disablePadding
                alignItems='center'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  textAlign: 'left',
                  padding: '8px 16px',
                }}
              >
                <ListItemButton
                  id={item.id}
                  sx={{ 
                    '& > :not(:last-child)': { 
                      marginRight: open ? 2 : 0 
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    p: '12px 8px',
                    ...(!open && {
                      flex: 'none'
                    })
                  }}
                  onClick={() => handleRoute(item)}
                  selected={Boolean(window.location.pathname === item.route)}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <ListItemIcon 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignSelf: 'center',
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                    {open ? <ListItemText primary={item.label} /> : null}
                  </Box>
                  {item?.child?.length > 0 && (
                    <ListItemIcon>
                      <KeyboardArrowDownIcon 
                        sx={{
                          transform: item?.isOpenChild ? "rotate(180deg)" : "rotate(0)",
                          transition: "all 0.4s linear"
                        }}
                      />
                    </ListItemIcon>
                  )}
                </ListItemButton>
                {item?.child?.length > 0 && item?.isOpenChild && (
                  <List
                    sx={{
                      width: "100%"
                    }}
                  >
                    {item?.child.map((child: any, key: number) => {
                      let Icon = child?.icon;
                      return (
                        <ListItem key={'list-child-sidebar-' + key}>
                          <ListItemButton 
                            sx={{ gap: 2, p: 0 }}
                            onClick={() => router.push(child?.route)}
                            selected={Boolean(window.location.pathname === item.route)}
                          >
                            <ListItemIcon>
                              <Icon />
                            </ListItemIcon>
                            <ListItemText>
                              {child.label}
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </ListItem>
            );
          })}
        </List>
      </WrapperDrawer>
      </Box>
  );
});

export default Sidebar;