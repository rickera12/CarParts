import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { getProductsByUserIdApi } from '../../../services/product';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  media: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
  },
  brand: {
    fontWeight: 'bold',
  },
  model: {
    marginTop: theme.spacing(1),
  },
}));

export const UserProducts = ({ createdById, _setProduct }) => {
  const classes = useStyles();
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    (async () => {
      if (!createdById) {
        return;
      }

      const response = await getProductsByUserIdApi(createdById);

      if (response.success) {
        setUserProducts(response.data);
      } else {
        setUserProducts([]);
      }
    })();
  }, [createdById]);

  const updateCard = product => {
    const { _id, createdBy, ...rest } = product;
    const sendObj = { ...rest, id: _id, createdById: createdBy };

    _setProduct(sendObj);
  };

  return (
    <Box width='85%' marginTop={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography variant='h6' marginBottom={4}>
        Other products:
      </Typography>
      <Box display='flex' justifyContent='center' alignSelf='center' width='85%' gap={4}>
        {userProducts.map((product, index) => (
          <Card key={index} className={classes.card} onClick={() => updateCard(product)}>
            <div>
              <img
                src={product.imageURLs[0]}
                alt={`Product ${product.title}`}
                style={{ userSelect: 'none', width: '100%' }}
              />
            </div>
            <Typography variant='subtitle1' className={classes.brand}>
              {product.brand}
            </Typography>
            <Typography variant='body2' className={classes.model}>
              {product.model}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
