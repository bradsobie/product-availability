import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Box,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import moment from 'moment';
import { availabilityColors } from './utils';

export const ProductList = ({ products, onProductChange }) => {
  return (
    <List>
      {products.map(product => (
        <ListItem key={product.id} divider>
          <ListItemText primary={product.name} secondary={`Last updated: ${moment(product.last_updated.toDate()).format('MMMM Do YYYY, h:mm:ss a')}`} />
          <Select
            value={product.availability}                  
            onChange={(event) => {
              const changes = { availability: event.target.value };
              onProductChange(product.id, changes);
            }}
          >
            <MenuItem value="high">
              <Box display="flex" alignItems="center">
                <FiberManualRecordIcon style={{ marginRight: '8px', fill: availabilityColors.high }} /> Lots available
              </Box>
            </MenuItem>
            <MenuItem value="medium">
              <Box display="flex" alignItems="center">
                <FiberManualRecordIcon style={{ marginRight: '8px', fill: availabilityColors.medium }} /> Running low
              </Box>
            </MenuItem>
            <MenuItem value="low">
              <Box display="flex" alignItems="center">
                <FiberManualRecordIcon style={{ marginRight: '8px', fill: availabilityColors.low }} /> Out of stock
              </Box>
            </MenuItem>
          </Select>
        </ListItem>
      ))}
    </List>
  );
};
