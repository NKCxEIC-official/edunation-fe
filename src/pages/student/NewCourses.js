import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import TopRated from './TopRatedCourses';
import Iconify from '../../components/Iconify';

function NewCourses() {
  return (
    <Container maxWidth="s">
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            sx={{ mb: 3, mr: 2, mt: 2 }}
          >
            <Typography variant="h4" sx={{ mt: 2, mb: 2, p: 2 }}>
              <Trans i18nKey="studentNewCourses">New Courses :</Trans>
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            sx={{ mb: 3, mr: 1, mt: 2 }}
          >
            <TopRated />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewCourses;
