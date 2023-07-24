import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Box, MenuItem } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createProductApi } from '../../../services/product';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const CreateProductForm = () => {
  const [description, setDescription] = useState('tetetewtew');
  const [price, setPrice] = useState('25');
  const [brand, setBrand] = useState('dsadsa');
  const [model, setModel] = useState('dsa');
  const [yearOfManufacture, setYearOfManufacture] = useState(2023);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = e => {
    const files = e.target.files;
    setImages([...images, ...files]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const result = await createProductApi({
      brand,
      model,
      yearOfManufacture,
      description,
      price,
      images,
    });

    if (result.success) {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant='h6' align='center' gutterBottom>
            Create Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label='Brand' value={brand} onChange={e => setBrand(e.target.value)} required fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label='Model' value={model} onChange={e => setModel(e.target.value)} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Price' value={price} onChange={e => setPrice(e.target.value)} required fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label='Description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label='Year of Manufacture'
                  value={yearOfManufacture}
                  onChange={e => setYearOfManufacture(e.target.value)}
                  required
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: '200px',
                        },
                      },
                    },
                  }}>
                  {Array.from({ length: 2024 - 1980 + 1 }, (_, index) => (
                    <MenuItem key={index} value={String(1980 + index)}>
                      {1980 + index}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor='images'>Images</label>
                <input type='file' id='images' multiple onChange={handleImageChange} required />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary' fullWidth>
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Grid item xs={12} sx={{ width: '100%', marginTop: 5 }}>
          <Box sx={{ maxWidth: '100%', margin: 'auto' }}>
            <Carousel autoPlay>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product Image ${index + 1}`}
                    style={{ maxWidth: '100%', maxHeight: 350, objectFit: 'contain' }}
                  />
                </div>
              ))}
            </Carousel>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateProductForm;
