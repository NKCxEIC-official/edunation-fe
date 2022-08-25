import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import TopRated from './TopRatedCourses';

function Classroom() {
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
              Ongoing Courses :
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

export default Classroom;
