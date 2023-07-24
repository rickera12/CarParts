import { createTheme } from '@mui/material/styles';
import { commonTheme } from './commonTheme';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#ffffff', // Change this to your desired color
      secondary: '#808080',
    },
  },
  ...commonTheme,
});

export default lightTheme;
