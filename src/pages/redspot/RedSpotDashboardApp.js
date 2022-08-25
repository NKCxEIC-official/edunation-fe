/* eslint-disable */
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Button, Card } from '@mui/material';
// components

import Page from 'src/components/Page';
import { getDatafromDBAction } from '../../store/actions/AuthActions';
import { useEffect } from 'react';


// ----------------------------------------------------------------------
export default function RedSpotDashboardApp() {
  const dispatch = useDispatch();
  useEffect(() => {

  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="s">
        <Grid item lg={12}>
          <Typography variant="h4">Hi, This Is A Live Class</Typography>
        </Grid>
      </Container>
    </Page>
  );
}
