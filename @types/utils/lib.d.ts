import { PaletteOptions } from "@mui/material";

declare module '@mui/material/styles/createPalette' {
  export interface PaletteOptions {
    darkBlue?: PaletteColorOptions
    oceanBlue?: PaletteColorOptions
    blueSky?: PaletteColorOptions
    magenta?: PaletteColorOptions
    whiteGray?: PaletteColorOptions
    yellow?: PaletteColorOptions
    green?: PaletteColorOptions
    red?: PaletteColorOptions
    gradient?: PaletteColorOptions
  }
}