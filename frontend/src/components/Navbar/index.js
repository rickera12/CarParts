import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Toolbar, Typography, IconButton, Badge, Box, useTheme } from '@mui/material';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import CartModal from '../../components/Modals/CartModal';
import AuthenticationModal from '../Modals/AuthenticationModal';
import { useUser } from '../../context/UserContext';
import { LS_KEYS, ROUTES } from '../../constants';

const MODAL_TYPES = {
  AUTHENTICATION: 'authentication',
  CART: 'cart',
};

function Navbar({ isDarkMode, toggleDarkMode }) {
  const { cartItems } = useCart();
  const apiToken = localStorage.getItem(LS_KEYS.TOKEN);
  const { user } = useUser();
  const theme = useTheme();
  const [modalType, setModalType] = useState();

  const openModal = modalType => {
    setModalType(modalType);
  };

  const closeModal = () => setModalType('');

  const renderNonAuthLinks = () => (
    <>
      <IconButton color='inherit' onClick={() => openModal(MODAL_TYPES.AUTHENTICATION)}>
        <Typography
          variant='subtitle1'
          component={NavLink}
          to='/'
          style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
          Login
        </Typography>
      </IconButton>
      <IconButton color='inherit' onClick={toggleDarkMode}>
        {isDarkMode ? (
          <HiOutlineSun style={{ fontSize: '1.2rem' }} />
        ) : (
          <HiOutlineMoon style={{ fontSize: '1.2rem' }} />
        )}
      </IconButton>
    </>
  );

  const renderAuthLinks = () => (
    <>
      <Typography
        variant='subtitle1'
        component={NavLink}
        to={ROUTES.CREATE_PRODUCT}
        style={{ textDecoration: 'none', color: theme.palette.text.primary, marginRight: 10 }}>
        Create product
      </Typography>
      <Typography
        variant='subtitle1'
        component={NavLink}
        to={ROUTES.USER_PROFILE}
        style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
        Profile
      </Typography>
      <IconButton color='inherit' onClick={toggleDarkMode}>
        {isDarkMode ? (
          <HiOutlineSun style={{ fontSize: '1.2rem' }} />
        ) : (
          <HiOutlineMoon style={{ fontSize: '1.2rem' }} />
        )}
      </IconButton>
    </>
  );

  return (
    <Box>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant='h6'
            component={NavLink}
            to='/'
            style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            My App
          </Typography>
        </div>
        <>
          {apiToken || user ? renderAuthLinks() : renderNonAuthLinks()}
          <IconButton color='inherit' onClick={() => openModal(MODAL_TYPES.CART)}>
            <Badge badgeContent={cartItems.length} color='secondary'>
              <FaShoppingCart style={{ fontSize: '1.2rem' }} />
            </Badge>
          </IconButton>
        </>
      </Toolbar>
      <AuthenticationModal isOpen={modalType === MODAL_TYPES.AUTHENTICATION} onClose={closeModal} />
      <CartModal isOpen={modalType === MODAL_TYPES.CART} onClose={closeModal} />
    </Box>
  );
}

export default Navbar;
