import { createTheme } from '@mui/material/styles';
import { commonTheme } from './commonTheme';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a6a6a6',
    },
  },
  ...commonTheme,
});

export default darkTheme;
