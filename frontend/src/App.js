import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { AppBar, ThemeProvider, createTheme, useMediaQuery, CssBaseline } from '@mui/material';

import Navbar from './components/Navbar';

import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { ToastContainerWrapper } from './components/Toast';
import { LS_KEYS, ROUTES } from './constants';
import { ProfileScreen } from './screens/users/Profile';
import { CreateProductScreen } from './screens/products/CreateProduct';
import { AllProductsScreen } from './screens/products/AllProducts';
import Sidebar from './components/Sidebar';

const PrivateRoute = () => {
  const apiToken = localStorage.getItem(LS_KEYS.TOKEN);

  return apiToken ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#007bff',
      },
      background: {
        default: isDarkMode ? '#121212' : '#ffffff',
        paper: isDarkMode ? '#1f1f1f' : '#f5f5f5',
      },
    },
  });

  const appStyle = {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    display: 'flex', // Added flex display
  };

  const sidebarStyle = {
    width: '15%', // Set sidebar width to 15%
    backgroundColor: theme.palette.background.paper,
    padding: '16px',
    minWidth: 300,
  };

  const contentStyle = {
    flex: 1, // Let the content occupy remaining space
    padding: '16px',
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <Router>
            <div style={appStyle}>
              <div style={sidebarStyle}>
                <Sidebar />
              </div>
              <div style={contentStyle}>
                <AppBar position='static' style={{ marginBottom: '16px' }}>
                  <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                </AppBar>
                <Routes>
                  <Route exact path='/' element={<AllProductsScreen />} />
                  <Route element={<PrivateRoute />}>
                    <Route path={ROUTES.USER_PROFILE} element={<ProfileScreen />} />
                    <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProductScreen />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </Router>
          <ToastContainerWrapper isDarkMode={isDarkMode} isMobile={isMobile} />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
