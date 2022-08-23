/* eslint-disable */
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Button, Card } from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';

// sections
import {
  AppTasks,
  AppWebsiteVisits,
} from '../../sections/@student/app';
import TopRated from './TopRatedCourses';
import OngoingCourses from '../../components/OngoingCourses';
import Summary from 'src/components/Summary';
import { getDatafromDBAction } from '../../store/actions/AuthActions';
import { useEffect } from 'react';
import NTS from 'src/components/NTS';

// ----------------------------------------------------------------------

const click = () => {
  console.log('click');
};

export default function StudentDashboardApp() {
  const theme = useTheme();

  const user = useSelector((state) => state.auth.user);
  const summaryContent = [
    {
      count: user?.summary?.pendingAssignments,
      subheader: 'Pending Assignments',
      color: 'primary',
    },
    {
      count: user?.summary?.classesToday,
      subheader: 'Classes Today',
      color: 'error',
    },
    {
      count: user?.summary?.submittedAssignments,
      subheader: 'Submitted Assignments Today',
      color: 'success',
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatafromDBAction('classes', true, 'classes'));
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="s">
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Typography variant="h4">Hi, {user.firstName}</Typography>
            <Typography variant="p" sx={{ mb: 5 }}>
              Welcome back to your dashboard
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Time Spent"
              typeOfData="Minutes"
              // subheader="(+43%) than last year"
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
                  name: 'Time Spent',
                  type: 'area',
                  fill: 'gradient',
                  data: user.timeSpent,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              sx={{ mb: 3, mr: 2, mt: 2 }}
            >
              <Typography variant="h4" sx={{ mt: 2, mb: 2, pt: 2 }}>
                Ongoing Courses :
              </Typography>
              <Button
                to="/dashboard/student/classroom"
                component={RouterLink}
                size="small"
                color="inherit"
                endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
              >
                View all
              </Button>
            </Stack>

            <Stack spacing={2} alignItems="center" direction="row" sx={{ mb: 2, mr: 1, mt: 2 }}>
              {user.ongoingCourses && user.ongoingCourses.length > 0 ? (
                user.ongoingCourses.map((ongoingCourse) => (
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <OngoingCourses
                      title={ongoingCourse.courseName}
                      subheader={ongoingCourse.author}
                      avatar={'ant-design:user-outlined'}
                      icon={ongoingCourse.classDp}
                      classKey={ongoingCourse.classId}
                      points={[
                        {
                          icon: 'eos-icons:product-classes-outlined',
                          count: ongoingCourse.courseMaterialCount,
                        },
                        {
                          icon: 'carbon:course',
                          count: ongoingCourse.assignmentCount,
                        },
                        {
                          icon: 'arcticons:netease-open-class',
                          count: ongoingCourse.liveClassCount,
                        },
                        {
                          icon: 'simple-line-icons:calender',
                          count: ongoingCourse.days,
                        },
                      ]}
                    />
                  </Grid>
                ))
              ) : (
                <NTS />
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              sx={{ mb: 3, mr: 2, mt: 2 }}
            >
              <Typography variant="h4">Top Rated Classes : </Typography>
              <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                View all
              </Button>
            </Stack>
            <TopRated />
          </Grid>

          <Grid item xs={8} md={8} lg={8} xl={8} sx={{ mt: 2 }}>
            <AppTasks
              title="Today's Tasks"
              list={[
                {
                  id: '1',
                  label: 'Create FireStone Logo | 17th Nov 21 ~ AWS',
                  dueDate: '17/11/2021',
                  classUserName: 'AWS',
                },
                { id: '2', label: 'Add SCSS and JS files if required', dueDate: '7/1/2021', classUserName: 'Science' },
                { id: '3', label: 'Stakeholder Meeting', dueDate: '22/11/2000', classUserName: 'React' },
                { id: '4', label: 'Scoping & Estimations', dueDate: '17/09/2021', classUserName: 'EVS' },
                { id: '5', label: 'Sprint Showcase', dueDate: '11/08/2022', classUserName: 'VS Code' },
              ]}
            />
          </Grid>

          <Grid item xs={4} md={4} lg={4} sx={{ mt: 2 }}>
            <Summary title="Summary" summaryContent={summaryContent} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
