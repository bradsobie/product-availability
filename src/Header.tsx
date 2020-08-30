import { Box } from '@material-ui/core';
import styled from 'styled-components';

const Logo = styled.img`
  height: 35px;
  margin-right: 16px;
`;

const Title = styled.h1`
  font-weight: 300;
`;

export const Header = () => (
  <Box display="flex" alignItems="center">
    <Logo src="/toilet_paper_dark.svg" />
    <Title>Product Availability</Title>
  </Box>
);
