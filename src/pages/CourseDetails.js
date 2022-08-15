import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Button, CardContent, Card } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// components
import LargeGrid from '../components/LargeGrid';
import SmallGrid from '../components/SmallGrid';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections

// ----------------------------------------------------------------------

export default function CourseDetails() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4">Welcome To,</Typography>
        <Typography variant="p">Class Name</Typography>

        <Grid container spacing={4} sx={{ mb: 2, mt: 2 }}>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="Student Count" count={19} color="primary" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="Course Material" count={26} color="error" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="Video Count" count={17} color="success" />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="Class Progress" count={18} totalCount={26} color="warning" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="QNA" count={66} totalCount={70} color="primary" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="Fees" count={26} totalCount={30} color="error" />
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
          Assignments
        </Typography>

        <Grid container spacing={4}>
          <Grid to="/dashboard/student/classroom/123456/assingment/1233" component={RouterLink} item xs={12} sm={6} md={3} lg={4}>
            <LargeGrid subheader="Arrow Function" count={26} icon={'vscode-icons:file-type-reactjs'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <LargeGrid subheader="UseEffect" count={51} icon={'logos:flutter'} />
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
          Course Material
        </Typography>

        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3} lg={4} to="/dashboard/student/classroom/:id/god/details" component={RouterLink}>
              <LargeGrid subheader="UseState" count={22} icon={'logos:tensorflow'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={4} to="/dashboard/student/classroom/:id/dog/details" component={RouterLink}>
              <LargeGrid subheader="Hooks" count={11} icon={'logos:webhooks'} />
            </Grid>
        </Grid>

        <Grid item lg={12} sx={{ mt: 3 }}>
          <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="row" sx={{ mb: 4, mr: 2 }}>
            <Typography variant="h4">Live Recorded Videos :</Typography>
            <Button size="medium" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
              View all
            </Button>
          </Stack>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            {
              <iframe
                src={'https://www.youtube.com/embed/h7MYJghRWt0'}
                frameBorder="0"
                allow="accelometer; autoplay; encrypted-media"
                allowFullScreen
                title="ArrowFunction"
              />
            }
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            {
              <iframe
                src={'https://www.youtube.com/embed/fKopy74weus'}
                frameBorder="0"
                allow="accelometer; autoplay; encrypted-media"
                allowFullScreen
                title="UseState"
              />
            }
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            {
              <iframe
                src={'https://www.youtube.com/embed/aPfkYu_qiF4'}
                frameBorder="0"
                allow="accelometer; autoplay; encrypted-media"
                allowFullScreen
                title="UseEffect"
              />
            }
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
