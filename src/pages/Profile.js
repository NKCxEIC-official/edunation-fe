import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import '../components/Root.css';
import React, { useState } from 'react';
import ProfileBackground from '../components/SVGIcons/ProfileBackground';
import Iconify from '../components/Iconify';
import { AppWidgetSummary } from '../sections/@dashboard/app';

function Profile() {
  const [activeSection, setActiveSection] = useState('about');
  const cardContent = [
    {
      title: 'Completed Courses',
      content: '30',
    },
    {
      title: 'Ongoing Courses',
      content: '51',
    },
    {
      title: 'Duration Spent(hrs)',
      content: '7',
    },
    {
      title: 'Student Rating',
      content: '3.5',
    },
  ];
  return (
    <Grid container className="profile">
      <ProfileBackground className="profileIntroBg" />
      <Grid item lg={8} xl={8} className="profileIntro">
        <div className="profileMainContainer">
          <div className="contents">
            <img
              src="https://images.unsplash.com/photo-1608434536950-d7d084398bf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80"
              alt="banner"
              className="profileImg"
            />
            <div>
              <Typography variant="h6">
                <div>John Doe</div>
                <div>Designation</div>
              </Typography>
            </div>
          </div>
          <div>
            <Button color="primary" variant="contained" size="medium">
              Contact Now
            </Button>
          </div>
        </div>
        <div className="profileContentContainer">
          <div className="options">
            <Button variant="contained" onClick={() => setActiveSection('about')} size="medium" color="error">
              About
            </Button>
            <Button variant="contained" onClick={() => setActiveSection('courses')} size="medium" color="error">
              Courses
            </Button>
            <Button variant="contained" onClick={() => setActiveSection('reviews')} size="medium" color="error">
              Reviews
            </Button>
          </div>
          <div>
            {activeSection === 'about' && (
              <Typography variant="subtitle">
                <div>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </Typography>
            )}
            {activeSection === 'courses' && <div>Courses</div>}
            {activeSection === 'reviews' && <div>Reviews</div>}
          </div>
          <div>
            <Typography variant="h4" sx={{ mt: 3, mb: 3 }}>
              Certification :
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <AppWidgetSummary title="Weekly Sales" courseName="Android" icon={'ant-design:android-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={4}>
                <AppWidgetSummary
                  title={new Date(2022, 1, 12).toDateString()}
                  courseName="Apple"
                  color="info"
                  icon={'ant-design:apple-filled'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={4}>
                <AppWidgetSummary
                  title={new Date(2022, 0, 12).toDateString()}
                  courseName="Windows"
                  color="warning"
                  icon={'ant-design:windows-filled'}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item lg={4} xl={4} className="profileCard">
        <Card className="w-85">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: '15px',
                  backgroundColor: `error.light`,
                  height: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ width: '5px', backgroundColor: `#fff`, height: '5px', borderRadius: '20px' }} />
              </Box>
              <Typography variant="h6" sx={{ marginLeft: '10px'}}>
                Key Details
              </Typography>
            </Box>
            <div className="profileCardContent">
              <Stack spacing={3}>
              {cardContent.map((obj) => {
                return (
                  <div className="profileCardContentLine">
                    <span>{obj.title}</span>
                    <span>{obj.content}</span>
                  </div>
                );
              })}
              </Stack>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Profile;
