import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme();

const theme = createTheme({
  palette: {
    darkBlue: {
      light: '#e8ebee',
      main: '#1b3b50',
      dark: '#142c3c'
    },
    oceanBlue: {
      light: '#eaeef2',
      main: '#2d567c',
      dark: '#22415d'
    },
    blueSky: {
      light: '#ebf4fa',
      main: '#3990ca',
      dark: '#2b6c98'
    },
    magenta: {
      light: '#e8f8fc',
      main: '#18bcdd',
      dark: '#128da6'
    },
    whiteGray: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#bcbcbc'
    },
    yellow: {
      light: '#fef5e9',
      main: '#f99d27',
      dark: '#bb761d'
    },
    green: {
      light: '#e6f4ef',
      main: '#009262',
      dark: '#006e4a'
    },
    error: {
      light: '#f9eae9',
      main: '#c33025',
      dark: '#92241c'
    },
    red: {
      light: '#FBCCCC',
      main: '#F15555',
      dark: '#C30000'
    },
    gradient: {
      light: '#18bcdd',
      main: '#3990CA',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#585858',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: 'Exo 2', sans-serif;
          color: #585858;
          margin: 0;
        }

        #root {
          min-height: 100vh;
          height: 100%;
          width: 100%;
        }

        .base-Popup-root {
          z-index: 1200;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontWeight: 500,
        },
        contained: ({ theme }: any) => ({
          backgroundImage: `linear-gradient(${theme.palette.gradient.light}, ${theme.palette.gradient.main})`,
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: 500,
          borderRadius: '8px',
          "&.Mui-disabled": {
            background: theme.palette.whiteGray.dark,
            color: '#FFFFFF'
          }
        }),
        outlined: ({ theme }: any) => ({
          borderColor: theme.palette.magenta.dark,
          color: theme.palette.magenta.dark,
          borderRadius: '8px',
          fontWeight: 500,
        }),
        startIcon: {
          marginRight: '4px'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          outline: 'none !important'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: '#585858',
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: () => ({
          color: '#969696',
          borderColor: '#969696',
        }),
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          '&:hover': {
            color: theme.palette.magenta.dark,
            '& .MuiListItemIcon-root': {
              color: theme.palette.magenta.dark,
            },
          },
          '&.Mui-selected': {
            backgroundColor: 'inherit',
            border: '2px solid transparent',
            background: `linear-gradient(white, white) padding-box, linear-gradient(to right, ${theme.palette.gradient.light}, ${theme.palette.gradient.main}) border-box`,
            borderRadius: '16px',
            color: theme.palette.magenta.dark,
            '& .MuiListItemIcon-root': {
              color: theme.palette.magenta.dark,
            },
          },
          borderCollapse: 'collapse',
          perspective: '1px',
          borderRadius: '16px',
        })
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '24px'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            borderBottom: '2px solid #1976d2',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: '#585858',
          fontWeight: 500,
        },
        action: {
          margin: '0px',
        }
      }
    }
  }
});

export default theme;