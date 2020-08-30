import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  MenuItem,
  Select,
  Box,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddIcon from '@material-ui/icons/Add';
import { availabilityColors } from './utils';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  }
}));

export const ProductAdd = ({ onAddClick, showNoAvailabilityMessage }) => {
  const classes = useStyles();
  const defaultAddFormState = { availability: '', name: '' };
  const [addForm, setAddForm] = useState(defaultAddFormState);

  return (
    <Box margin={2} marginTop={0}>
      <Box display="flex" alignItems="flex-end">
        <TextField
          label="Product category"
          value={addForm.name}
          onChange={event => setAddForm({ ...addForm, name: event.target.value })}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="add-product-availability">Availability</InputLabel>
          <Select
            labelId="add-product-availability"
            value={addForm.availability}
            onChange={(event) => {
              setAddForm({
                ...addForm,
                availability: event.target.value as string
              });
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
        </FormControl>

        <IconButton disabled={!addForm.availability || !addForm.name} onClick={onAddClick}>
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