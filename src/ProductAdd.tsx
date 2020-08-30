import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  Box,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AvailabilitySelect } from './AvailabilitySelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  }
}));

export const ProductAdd = ({ onAddClick, showNoAvailabilityMessage }) => {
  const classes = useStyles();
  const defaultAddFormState = { availability: '', name: '' };
  const [addForm, setAddForm] = useState(defaultAddFormState);
  const resetForm = () => setAddForm(defaultAddFormState);

  return (
    <Box margin={2} marginTop={0}>
      <Box display="flex" alignItems="flex-end" width="100%">
        <TextField
          label="Product category"
          value={addForm.name}
          onChange={event => setAddForm({ ...addForm, name: event.target.value })}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="add-product-availability">Availability</InputLabel>
          <AvailabilitySelect
            selectProps={{
              labelId: 'add-product-availability',
              value: addForm.availability,
              onChange: event => setAddForm({
                ...addForm,
                availability: event.target.value
              })
            }}
          />
        </FormControl>

        <IconButton disabled={!addForm.availability || !addForm.name} onClick={() => onAddClick(addForm, resetForm)}>
          <AddIcon />
        </IconButton>
      </Box>

      {showNoAvailabilityMessage &&
        <Box marginTop={1}>
          <p>There is no availability info for this store.</p>
        </Box>
      }
    </Box>
  );
};