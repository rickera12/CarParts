import React from 'react';
import { makeStyles } from '@mui/styles';
import { Backdrop, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.modal,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    maxWidth: '400px',
    width: '100%',
    position: 'relative',
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
  modalCloseButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const CustomModal = ({ isOpen, onClose, title, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.modalContainer} style={{ display: isOpen ? 'flex' : 'none' }}>
      <Backdrop open={isOpen} className={classes.modalBackdrop} onClick={onClose} />
      <div className={classes.modalContent}>
        <Typography variant='h6' className={classes.modalTitle}>
          {title}
        </Typography>
        <IconButton className={classes.modalCloseButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
