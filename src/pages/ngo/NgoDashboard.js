import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
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
import { db } from '../../utils/firebaseConfig';


// ----------------------------------------------------------------------

export default function NgoDashboard() {
  const theme = useTheme();
  const [Ngodata,setNgodata]=useState({})
  useEffect (()=> {
    const docRef=doc(db, "users/irWv9KyOTepybjcP8UU8")
    getDoc(docRef).then((docdata)=> {setNgodata(docdata.data())})
  }, [])
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader="Student Count" count={Ngodata?.studentsCount} color="info" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader="Teacher Count" count={Ngodata?.teachersCount} color="success" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader="Volunteer Count" count={Ngodata?.VolunteersCount} color="warning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SmallGrid subheader="Red Spots" count={Ngodata?.redSpotsCount} color="error" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomModal btnText="Add Red Spots" icon="entypo:location" largeBtn color="danger" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomModal component={<AddTeacher />} btnText={"Create Teachers's profile"} icon="carbon:user-speaker" largeBtn />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomModal component={<AddStudent />} btnText="Create Student's Profile" icon="akar-icons:people-group" largeBtn color="info" />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Progress Report"
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
                  name: 'Teacher Student ratio',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Students Count',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Teachers Count',
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
