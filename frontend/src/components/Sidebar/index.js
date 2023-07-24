import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, TextField, Button } from '@mui/material';
import { FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';
import { eventEmitter } from '../../utils/event-emitter';

const Sidebar = ({ onFilter }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleFilter = () => {
    const filters = {
      brand: brand.trim(),
      model: model.trim(),
      year: year.trim(),
    };

    const filteredQuery = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '') {
        filteredQuery[key] = filters[key];
      }
    });

    eventEmitter.emit('apply-filters', filteredQuery);
  };

  const handleClear = () => {
    setBrand('');
    setModel('');
    setYear('');
    onFilter({});
  };

  return (
    <List>
      <ListItem>
        <TextField label='Brand' value={brand} onChange={e => setBrand(e.target.value)} fullWidth size='small' />
      </ListItem>
      <ListItem>
        <TextField label='Model' value={model} onChange={e => setModel(e.target.value)} fullWidth size='small' />
      </ListItem>
      <ListItem>
        <TextField
          label='Year of Manufacture'
          value={year}
          onChange={e => setYear(e.target.value)}
          fullWidth
          size='small'
        />
      </ListItem>
      <ListItem>
        <Button variant='contained' startIcon={<FilterListIcon />} onClick={handleFilter}>
          Filter
        </Button>
        <Button variant='contained' startIcon={<ClearIcon />} onClick={handleClear} style={{ marginLeft: '8px' }}>
          Clear
        </Button>
      </ListItem>
    </List>
  );
};

export default Sidebar;
