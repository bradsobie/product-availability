import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
} from '@material-ui/core';
import moment from 'moment';
import { AvailabilitySelect } from './AvailabilitySelect';

export const ProductList = ({ products, onProductChange }) => {
  return (
    <List>
      {products.map(product => (
        <ListItem key={product.id} divider>
          <Box
            display="flex"
            flexDirection={['column', 'row']}
            justifyContent={['flex-start', 'space-between']}
            width="100%"
          >
            <ListItemText
              primary={product.name}
              secondary={`Last updated: ${moment(product.last_updated.toDate()).format('MMMM Do YYYY, h:mm:ss a')}`}
            />
            <AvailabilitySelect
              selectProps={{
                value: product.availability,
                onChange: (event) => {
                  const changes = { availability: event.target.value };
                  onProductChange(product.id, changes);
                }
              }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
