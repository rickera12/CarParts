import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CommentSection } from './CommentSection';
import { UserProducts } from './UserProducts';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  carousel: {
    width: '100%',
    maxHeight: 400,
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: 350,
    objectFit: 'contain',
  },
  closeIcon: {
    marginRight: theme.spacing(1),
  },
  commentField: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  postButton: {
    marginLeft: theme.spacing(1),
    height: '100%',
  },
}));

export const ProductModal = ({ isOpen, product, onClose }) => {
  const classes = useStyles();
  const [_product, _setProduct] = useState(product);

  if (!isOpen || !_product) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Carousel showThumbs={false} className={classes.carousel} autoPlay>
          {_product.imageURLs.map((imageURL, index) => (
            <div key={index}>
              <img
                src={imageURL}
                alt={`Product Image ${index + 1}`}
                className={classes.modalImage}
                style={{ userSelect: 'none' }}
              />
            </div>
          ))}
        </Carousel>
        <Grid container spacing={2} style={{ width: '75%' }} marginTop={5}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} display='flex' alignItems='center' gap={1}>
                <Typography variant='h6'>Brand:</Typography>
                <Typography variant='h6'>{_product.brand}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} display='flex' alignItems='center' gap={1} justifyContent='flex-end'>
                <Typography variant='h6'>Model:</Typography>
                <Typography variant='h6'>{_product.model}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} display='flex' alignItems='center' gap={1}>
                <Typography variant='h6'>Price:</Typography>
                <Typography variant='h6'>${_product.price}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} display='flex' alignItems='center' gap={1} justifyContent='flex-end'>
                <Typography variant='h6'>Year:</Typography>
                <Typography variant='h6'>{_product.yearOfManufacture}</Typography>
              </Grid>
              <Grid
                item
                display='flex'
                alignItems='center'
                flexDirection='column'
                marginY={4}
                gap={1}
                justifyContent='flex-end'>
                <Typography variant='h6'>Description:</Typography>
                <Typography variant='h6'>{_product.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <UserProducts createdById={_product.createdById} _setProduct={_setProduct} />
        <CommentSection productId={_product.id} />
      </DialogContent>
    </Dialog>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    imageURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
