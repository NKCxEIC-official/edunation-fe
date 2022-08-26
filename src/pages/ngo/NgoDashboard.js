import { faker } from '@faker-js/faker';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { AppWebsiteVisits } from '../../sections/@dashboard/app';
import SmallGrid from '../../components/SmallGrid';
import LargeActionButton from '../../sections/@ngo/LargeActionButton';
import CustomModal from '../../components/CustomModal';
import AddStudent from '../../sections/@ngo/forms/AddStudent';
import AddTeacher from '../../sections/@ngo/forms/AddTeacher';
import { getDatafromDBAction, updateDatainDBAction } from '../../store/actions/AuthActions';

// ----------------------------------------------------------------------

export default function NgoDashboard() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [NgoTableStudentsCount,setNgoTableStudentsCount] = useState()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(()=>{
    changeLanguage("bn")
  },[])


  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getDatafromDBAction('subjects', true, 'subjects'));
    dispatch(getDatafromDBAction('subjects/biEf7FD1ZqL3wolhG53E', false, 'subjectData'));
    dispatch(updateDatainDBAction('subjects/biEf7FD1ZqL3wolhG53E', { name: 'Test' }));
  }, []);
  

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          <Trans i18nKey="NgoDashboard.NgoTitle">
          Hi, Welcome back 
          </Trans>
         {user.firstName} {user.lastName}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader={<Trans i18nKey="NgoDashboard.NgoStudentCount">
            Student Count
            </Trans>} count={user.studentList.length} color="info" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader={
              <Trans i18nKey="NgoDashboard.NgoTeacherCount">
                Teacher Count
              </Trans>} count={user.Teacherlist.length} color="success" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader={<Trans i18nKey="NgoDashboard.NgoVolunteerCount">
            Volunteer Count
              </Trans>} count={user.volunteerList.length} color="warning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader={<Trans i18nKey="NgoDashboard.NgoRedSpots">
            Red Spots
              </Trans>} count={user.redSpots.length} color="error" />
          </Grid>

          <Grid item xs={12} sm={6} md={4} to="/dashboard/ngo/red-spots" component={RouterLink}>
            <LargeActionButton title={<Trans i18nKey="NgoDashboard.NgoAddRedSpots">
            Add Red Spots
              </Trans>} icon="entypo:location" color="danger" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomModal
              component={<AddTeacher />}
              btnText={<Trans i18nKey="NgoDashboard.NgoCreateTeachersProfile">
              Create Teachers's profile
                </Trans>}
              icon="carbon:user-speaker"
              largeBtn
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomModal
              component={<AddStudent />}
              btnText={<Trans i18nKey="NgoDashboard.NgoCreateStudentsProfile">
             Create Student's Profile
                </Trans>}
              icon="akar-icons:people-group"
              largeBtn
              color="info"
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title={<Trans i18nKey="NgoDashboard.NgoProgressReport">
             Progress Report
                 </Trans>}
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
              ]}
              chartData={[
                {
                  name: t('NgoDashboard.NgoTeacherStudentRatio')
                      ,
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: t('NgoDashboard.NgoTableTeachersCount') ,
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: t('NgoDashboard.NgoTableStudentsCount'),
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
