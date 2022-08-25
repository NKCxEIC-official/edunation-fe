import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import CourseGrid from '../../components/CourseGrid';
import SmallGrid from '../../components/SmallGrid';

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome, Admin!
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2, mt: 2, textDecoration: 'none' }}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <SmallGrid 
                title="Courses in Progress"
                subheader="Total User"
                count={user?.totalUsers}
                color="primary"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <SmallGrid 
                title="Total Students"
                subheader="Total Students"
                count={user?.totalStudents}
                color="success"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <SmallGrid 
                title="Total Teachers"
                subheader="Total Teachers"
                count={user?.totalTeachers} 
                color="error"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <SmallGrid 
                title="Total NGO"
                subheader="Total NGO"
                count={user?.totalNGOs}
                color="warning"
            />
          </Grid>
        </Grid>
    </div>
  );
}

export default Dashboard;
