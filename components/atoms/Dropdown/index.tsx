import { Menu } from "@mui/material";
import { Children, cloneElement, createElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { TDropdownProps } from "@/@types/components/atoms";

type refType = {
  // add anything atribute with ref related
} | any;

const Dropdown = forwardRef<refType, TDropdownProps>(({
  trigger,
  menu,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  width,
}, ref) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let anchorRef: any = useRef(null);

  useEffect(() => {
    if(ref) {
      anchorRef = ref;
    }
  }, [ref]);

  const isOpen = Boolean(anchorEl);

  useImperativeHandle(ref, () => ({
    onClose() {
      setAnchorEl(null);
    },
  }));

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  }

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const renderMenu: any = (menuItem: any, index: number) => {
    const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

    return createElement(menuItem.type, {
      key: index,
      sx: {
        fontSize: '14px',
        color: '#585858',
      },
      onClick: (e: React.MouseEvent<HTMLElement>) => { 
        e.stopPropagation();
        menuItem.props.onClick(e);
      },
      children: props.menu ? Children.map(props.menu, renderMenu) : props.children
    });
  }
  
  return (
    <>
      {cloneElement(trigger, {
        onClick: isOpen ? handleClose : handleOpen,
        ref: anchorRef,
      })}
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        sx={{
          '& .MuiMenu-paper': {
            borderRadius: '12px',
            ...(width && {
              width: width
            }),
          },
        }}
      >
        {Children.map(menu, renderMenu)}
      </Menu>
    </>
  );
});

export default Dropdown;