import React, { useCallback, useRef, useState } from 'react';

import { Card, CardContent, Grid, Typography, IconButton, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { Audio } from 'react-loader-spinner';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { useAdminProducts } from '../../../hooks/useAdminProducts';
import { ProductModal } from '../../../components/Modals/ProductModal';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: theme.shadows[2],
  },
  cardContent: {
    flexGrow: 1,
  },
  addToCartIcon: {
    marginLeft: 'auto',
  },
  cardContainer: {
    width: '70%',
    margin: 'auto',
  },
}));

const MotionCard = motion(Card);

export const AllProductsScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = useAdminProducts(pageNum);

  const intObserver = useRef();
  const lastProductRef = useCallback(
    product => {
      if (isLoading) {
        return;
      }

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(products => {
        if (products[0].isIntersecting && hasNextPage) {
          setPageNum(prev => prev + 1);
        }
      });

      if (product) intObserver.current.observe(product);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className='center'>Error: {error.message}</p>;

  return (
    <Box>
      <Grid container spacing={2}>
        {results.map((product, i) => {
          if (results.length === i + 1) {
            return <Product ref={lastProductRef} key={product.id} product={product} />;
          }
          return <Product key={product.id} product={product} />;
        })}
      </Grid>
      {isLoading ? <Audio height='80' width='80' radius='9' color='green' ariaLabel='loading' wrapperStyle /> : null}
    </Box>
  );
};

const Product = React.forwardRef(({ product }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const handleAddToCart = productId => {
    // Implement your logic to add the product to the cart
    console.log(`Adding product with ID ${productId} to the cart`);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Grid item ref={ref} key={product.id} xs={12} sm={6} md={4} lg={3}>
      <MotionCard
        onClick={() => {
          setIsOpen(true);
        }}
        style={{ cursor: 'pointer' }}
        className={classes.card}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}>
        <div>
          <img
            src={product.imageURLs[0]}
            alt={`Product ${product.title}`}
            style={{ userSelect: 'none', width: '100%' }}
          />
        </div>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='subtitle1'>{product.brand}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subtitle1'>{product.model}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='subtitle1'>Price: ${product.price}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subtitle1'>Year: {product.yearOfManufacture}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </MotionCard>
      <ProductModal product={product} isOpen={isOpen} onClose={onClose} />
    </Grid>
  );
});
