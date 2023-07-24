import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import { CartContext } from '../../../context/CartContext';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
  },
  closeIcon: {
    cursor: 'pointer',
  },
  dialogContent: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  imageCell: {
    width: '80px',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  removeButton: {
    color: theme.palette.error.main,
  },
}));

const CartModal = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleRemoveItem = itemId => {
    removeFromCart(itemId);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant='h6'>Cart</Typography>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        {cartItems.length === 0 ? (
          <Typography variant='body1'>Your cart is empty.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.imageCell}>
                      <img src={item.imageUrl} alt={item.name} className={classes.image} />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.removeButton}
                        onClick={() => handleRemoveItem(item.id)}
                        size='small'>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
