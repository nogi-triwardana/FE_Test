import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const menus = [
  {
    id: 'dashboard-button-sidebar',
    icon: DashboardOutlinedIcon,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    id: 'dashboard-button-sidebar',
    icon: AssessmentIcon,
    label: "Laporan lalin",
    isOpenChild: false,
    child: [
      {
        id: 'daily-traffic-report-button-sidebar',
        icon: AssessmentIcon,
        label: "Laporan Per Hari",
        route: "/daily-traffic-report",
      }
    ]
  },
  {
    id: 'gate-master-button-sidebar',
    icon: SettingsIcon,
    label: "Master Gerbang",
    route: "/gate-master",
  },
];