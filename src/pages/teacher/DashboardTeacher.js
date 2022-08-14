import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Container, Typography, Button, Box } from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';

import CustomModal from '../../components/CustomModal';
import SmallGrid from '../../components/SmallGrid';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import CreateAClass from './CreateAClass';
import LargeGrid from '../../components/Largegrid';


import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';
import RectangleGrid from '../../components/RectangleGrid';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';
// mock
import POSTS from '../../_mock/blog';



// ----------------------------------------------------------------------

export default function DashboardTeacher() {
  const theme = useTheme();

  return (
    <Page title="Teacher">
      <Container maxWidth="xl">
        {/* <Grid Container spacing={2}> */}
        {/* <Grid item md={8}> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Hi, Welcome back
          </Typography>


          <CustomModal btnText={'Create a Class'} sx={{ mb: 4 }} component={<CreateAClass />} icon="eva:plus-fill" />
        </Stack>


        <Grid container spacing={3} to="class/1234" component={RouterLink} style={{ textDecoration: 'none' }}>

          <Grid item xs={12} sm={12} md={6}>
            <LargeGrid title="Courses in Progress" color="primary" alighn="center" subheader="Courses in Progress" icon="logos:discourse-icon" count="10" />
          </Grid>

          <Grid item xs={12} sm={12} md={6} >
            <LargeGrid title="QNA" color="green" subheader="QNA" count="Answer Questions" icon="emojione:exclamation-question-mark" />
          </Grid>

          <Grid item xs={12} sm={12} md={6} >
            <LargeGrid title="Request" subheader="Request" count="Request Material" icon="carbon:request-quote" />
          </Grid>

          <Grid item xs={12} sm={12} md={6} alignItems="center">
            <LargeGrid title="Certificate" color="primary" subheader="Certificate" count="Get Certificate" icon="icon-park:certificate" />
          </Grid>

        </Grid>

        <Stack spacing={2}>

          {/* //Courses You are Taking// */}
          <Box paddingTop={5} paddingLeft={2}>Ongoing Courses</Box>

          <Grid container height={30} paddingLeft={2} sx={{ backgroundColor: '#ABB8C3', marginLeft: "10px", opacity: "1" }}>
            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>Course Name</Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>Student count</Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>Percent Student</Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>Duration</Typography>
            </Grid>
          </Grid>

          {/* <Grid item xs={12} sm={12} md={12}>
            <RectangleGrid title="Course Name" duration="Duration" percent="Percent of Students" color="ABB8C3" alighn="center" subheader="Course Name" count="Number of Students" />
          </Grid> */}


          <Grid item xs={12} sm={12} md={12}>
            <RectangleGrid title="Python" duration="5 Months" percent="76%" color="primary" alighn="center" subheader="Python" icon="logos:discourse-icon" count="10" />
          </Grid>

          <Grid item xs={12} sm={12} md={12} >
            <RectangleGrid title="ReactJs" percent="76%" duration="7 Months" count="50" color="green" subheader="ReactJs" icon="emojione:exclamation-question-mark" />
          </Grid>

          <Grid item xs={12} sm={12} md={12} >
            <RectangleGrid title="English" percent="86%" duration="6 Months" count="50" subheader="English" icon="carbon:request-quote" />
          </Grid>

        </Stack>

        {/* Completed Courses */}


        <Box paddingTop={5} paddingLeft={3}>Completed Courses</Box>
        <Grid container spacing={3} paddingTop={2}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>





        {/* <Stack spacing={2}>

          <Box paddingTop={5} paddingLeft={3}>Completed Courses</Box>

          <Grid item xs={12} sm={12} md={12}>
            <RectangleGrid title="Bengali" color="primary" alighn="center" subheader="Python" icon="logos:discourse-icon" count="10" />
          </Grid>

          <Grid item xs={12} sm={12} md={12} >
            <RectangleGrid title="Hindi" count="50" color="green" subheader="ReactJs" icon="emojione:exclamation-question-mark" />
          </Grid>

        </Stack> */}

        {/* </Grid> */}



        <Box paddingTop={5}>Graph</Box>
        <Grid item xs={12} md={6} lg={8} paddingTop={3}>
          <AppWebsiteVisits
            title="Time Spent"
            subheader="(+43%) than last year"
            chartLabels={[
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
              '12/01/2003',
            ]}
            chartData={[
              {
                name: 'Student',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
            ]}
          />
        </Grid>
        {/* </Grid> */}
        {/* <Grid item md={4}>
            rightsidebar
          </Grid> */}
        {/* </Grid> */}
      </Container>
    </Page >
  );
}
