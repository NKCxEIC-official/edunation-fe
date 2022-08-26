import { Container, Grid, Stack, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import TopRated from '../student/TopRatedCourses';

function MyCourses() {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage("bn")
  }, [])

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
              <Trans i18nKey="teacherDashboard.teacherCourses">
                My Courses :
              </Trans>
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            sx={{ mb: 3, mr: 1, mt: 2 }}
          >
            <TopRated ownedOnly />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MyCourses;
