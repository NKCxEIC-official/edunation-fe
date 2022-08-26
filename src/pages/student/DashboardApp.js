/* eslint-disable */
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
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
            <Typography variant="h4">
              <Trans i18nKey="studentDashboard.studentTitle">
                Hi
              </Trans>, {user.firstName}</Typography>
            <Typography variant="p" sx={{ mb: 5 }}>
              <Trans i18nKey="studentDashboard.studentSubtitle">
                Welcome back to your dashboard
              </Trans>
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title={<Trans i18nKey="studentDashboard.studentTimeSpent">
              Time Spent
            </Trans>}
              typeOfData="Minutes"
              // subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
                '12/01/2022',
              ]}
              chartData={[
                {
                  name: t('studentDashboard.studentTimeSpent'),
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
                <Trans i18nKey="studentDashboard.studentOngoingClasses">
                  Ongoing Classes :
                </Trans>
              </Typography>
              <Button
                to="/dashboard/student/classroom"
                component={RouterLink}
                size="small"
                color="inherit"
                endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
              >
                <Trans i18nKey="studentDashboard.studentViewAll">
                  View all
                </Trans>
              </Button>
            </Stack>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container spacing={3}>
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
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              sx={{ mb: 3, mr: 2, mt: 2 }}
            >
              <Typography variant="h4"><Trans i18nKey="studentDashboard.studentTopRatedClasses">Recently Added Classes </Trans></Typography>
              <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                <Trans i18nKey="studentDashboard.studentViewAll">
                  View all
                </Trans>
              </Button>
            </Stack>
            <TopRated />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
