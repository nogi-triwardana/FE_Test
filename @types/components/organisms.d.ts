type ISidebarProps = {
  sidebarWidth: { expand: number; collapse: number; };
  onChangeOpen: () => void;
  onChangeOpenNotif?: () => void;
} & DrawerProps;