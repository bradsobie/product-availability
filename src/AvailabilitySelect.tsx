import React from 'react';
import { MenuItem, Select, Box } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import styled from 'styled-components';

export const availabilityColors = {
  high: '#25e638',
  medium: '#e6b825',
  low: '#c51a1a',
};

export const StatusIcon = styled(FiberManualRecordIcon)`
  margin-right: 8px;
  fill: ${({ $fillColor }) => $fillColor};
`;

const SelectLabel = ({ fillColor, label }) => (
  <Box display="flex" alignItems="center">
    <StatusIcon $fillColor={fillColor} />
    <span>{label}</span>
  </Box>
);

export const AvailabilitySelect = ({ selectProps }) => (
  <Select {...selectProps}>
    <MenuItem value="high">
      <SelectLabel fillColor={availabilityColors.high} label="Lots available" />
    </MenuItem>
    <MenuItem value="medium">
      <SelectLabel fillColor={availabilityColors.medium} label="Running low" />
    </MenuItem>
    <MenuItem value="low">
      <SelectLabel fillColor={availabilityColors.low} label="Out of stock" />
    </MenuItem>
  </Select>
);
