import { createTheme } from "@mui/system";

export  const customLabels = [
  { primary: 'GB', secondary: '+44' },
  { primary: 'US', secondary: '+1' },
];

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#0000FF',
    },
  },
});