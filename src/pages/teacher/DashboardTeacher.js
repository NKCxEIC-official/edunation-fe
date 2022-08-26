/* eslint-disable */
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Container, Typography, Button, Box } from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';

import CustomModal from '../../components/CustomModal';
import SmallGrid from '../../components/SmallGrid';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import CourseGrid from '../../components/CourseGrid';
// sections
import CreateAClass from './CreateAClass';



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
import { posts } from '../../_mock/blog';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect } from 'react';



// ----------------------------------------------------------------------

export default function DashboardTeacher() {
  const theme = useTheme();

  const user = useSelector(state => state.auth.user)

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage("bn")
  }, [])

  return (
    <Page title="Teacher">
      <Container maxWidth="xl">
        {/* <Grid Container spacing={2}> */}
        {/* <Grid item md={8}> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Grid item lg={12}>
            <Typography variant="h4">
              <Trans i18nKey="teacherDashboard.teacherTitle">
                Hi,
              </Trans>
              {user.firstName}</Typography>
            <Typography variant="p" sx={{ mb: 5 }}>
              <Trans i18nKey="teacherDashboard.teacherSubtitle">
                Welcome Back -
              </Trans>
            </Typography>
          </Grid>

          <CustomModal btnText={<Trans i18nKey="teacherDashboard.teacherCreateAClass">
            Create a Class
          </Trans>} sx={{ mb: 4 }} component={<CreateAClass />} icon="eva:plus-fill" />
        </Stack>


        <Grid container spacing={3} style={{ textDecoration: 'none' }}>

          <Grid item xs={12} sm={12} md={6} lg={4} >
            <CourseGrid title="Courses in Progress" color="primary" align="center" subheader={<Trans i18nKey="teacherDashboard.teacherCourses">
              Courses
            </Trans>} icon="logos:discourse-icon" count={user.courseInProgressTeacher} />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} >
            <CourseGrid title="QNA" color="green" subheader="QNA" count={user.pendingQA} icon="emojione:exclamation-question-mark" />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} >
            <CourseGrid title="Request" subheader={<Trans i18nKey="teacherDashboard.teacherRequest">
              Request
            </Trans>} count={user.request} icon="carbon:request-quote" />
          </Grid>

        </Grid>

        <Stack spacing={2}>

          {/* //Courses You are Taking// */}
          <Typography variant='h4' paddingTop={5}>
            <Trans i18nKey="teacherDashboard.teacherYourCourses">
              Your Courses
            </Trans>
          </Typography>

          <Grid container height={30} paddingLeft={2} sx={{ backgroundColor: '#ABB8C3', marginLeft: "10px", opacity: "1" }}>
            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherCourseName">
                  Course Name
                </Trans>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherStudentCount">
                  Student Count
                </Trans>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherPercentage">
                  Completed Percentage
                </Trans>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherDuration">
                  Duration
                </Trans>
              </Typography>
            </Grid>
          </Grid>

          {/* <Grid item xs={12} sm={12} md={12}>
            <RectangleGrid title="Course Name" duration="Duration" percent="Percent of Students" color="ABB8C3" alighn="center" subheader="Course Name" count="Number of Students" />
          </Grid> */}

          {user?.myCourses && user?.myCourses.length > 0 && user.myCourses.filter(course => course.percentage !== 100).map((course) =>
          (
            <Grid item xs={12} sm={12} md={12}>
              <RectangleGrid subheader={course.courseName} duration={course.duration} percent={course.percentage} color="primary" alighn="center" icon={course.courseIcon} count={course.studentCount} />
            </Grid>
          )
          )}


        </Stack>

        <Stack spacing={2}>
          <Typography variant='h4' paddingTop={5}>
            <Trans i18nKey="teacherDashboard.teacherCompletedCourses">
              Completed Courses
            </Trans>
          </Typography>

          <Grid container height={30} paddingLeft={2} sx={{ backgroundColor: '#ABB8C3', marginLeft: "10px", opacity: "1" }}>
            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherCourseName">
                  Course Name
                </Trans>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherStudentCount">
                  Student Count
                </Trans>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherPercentage">
                  Completed Percentage
                </Trans>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
              <Typography variant='h6'>
                <Trans i18nKey="teacherDashboard.teacherDuration">
                  Duration
                </Trans>
              </Typography>
            </Grid>
          </Grid>


          {user?.myCourses && user?.myCourses.length > 0 && user.myCourses.filter(course => course.percentage === 100).map((course) =>
          (
            <Grid item xs={12} sm={12} md={12}>
              <RectangleGrid subheader={course.courseName} duration={course.duration} percent={course.percentage} color="primary" alighn="center" icon={course.courseIcon} count={course.studentCount} />
            </Grid>
          )
          )}

        </Stack>
        <Grid item xs={12} md={6} lg={8} paddingTop={3}>
          <AppWebsiteVisits
            title={<Trans i18nKey="teacherDashboard.teacherRevenue">
              Revenue
            </Trans>}
            subheader="(+43%) than last year"
            chartLabels={[
              '01/01/2020',
              '02/01/2020',
              '03/01/2020',
              '04/01/2020',
              '05/01/2020',
              '06/01/2020',
              '07/01/2020',
              '08/01/2020',
              '09/01/2020',
              '10/01/2020',
              '11/01/2020',
              '12/01/2020',
            ]}
            chartData={[
              {
                name: 'Revenue',
                type: 'column',
                fill: 'solid',
                data: [23, 23, 23, 10, 23, 23, 5, 23, 20, 23, 23, 23],
              },
            ]}
          />
        </Grid>
      </Container>
    </Page >
  );
}