/* eslint-disable */
import { useSelector } from 'react-redux';
import { Avatar, Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import '../components/Root.css';
import React, { useEffect, useState } from 'react';
import OngoingCourses from '../components/OngoingCourses';
import ProfileBackground from '../components/SVGIcons/ProfileBackground';
import Iconify from '../components/Iconify';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { Trans, useTranslation } from 'react-i18next';


function Profile() {

  const user = useSelector(state => state.auth.user)
  const { dp, firstName, lastName, email, about, reviews, ongoingCourses, rating } = user
  const { t, i18n } = useTranslation();


  const [activeSection, setActiveSection] = useState('about');
  const cardContent = [
    {
      title: t('studentProfile.studentCompletedCourses'),
      content: '30',
    },
    {
      title: t('studentProfile.studentOngoingCourses'),
      content: ongoingCourses?.length,
    },
    {
      title: t('studentProfile.studentDurationSpent'),
      content: '7',
    },
    {
      title: t('studentProfile.studentRating'),
      content: rating,
    },
  ];


  return (
    <Grid container className="profile">
      <ProfileBackground className="profileIntroBg" />
      <Grid item lg={8} xl={8} className="profileIntro">
        <div className="profileMainContainer">
          <div className="contents">
            <Avatar variant="square" className='profileImg' src={dp} />
            <div>
              <Typography variant="h6">
                <div>{firstName} {lastName}</div>
              </Typography>
              <Typography variant="body1">
                <div>{email}</div>
              </Typography>
            </div>
          </div>
          <div>
            <Button to={email}
              onClick={(e) => {
                window.location.href = "mailto:no-reply@example.com";
                e.preventDefault();
              }}
              className="profileBtn" variant="contained" size="medium">
              <Trans i18nKey="studentProfile.studentContactNow">
                Contact Now
              </Trans>

            </Button>
          </div>
        </div>
        <div className="profileContentContainer">
          <div className="options">
            <Button variant="contained" onClick={() => setActiveSection('about')} size="medium" color="error">
              <Trans i18nKey="studentProfile.studentAbout">
                About
              </Trans>
            </Button>
            <Button variant="contained" onClick={() => setActiveSection('courses')} size="medium" color="error">
              <Trans i18nKey="studentProfile.studentCourses">
                Courses
              </Trans>
            </Button>
            <Button variant="contained" onClick={() => setActiveSection('reviews')} size="medium" color="error">
              <Trans i18nKey="studentProfile.studentReviews">
                Reviews
              </Trans>
            </Button>
          </div>
          <div>
            {activeSection === 'about' && (
              <Typography variant="subtitle">
                <div>
                  {about}
                </div>
              </Typography>
            )}
            {activeSection === 'courses' &&
              <div>
                <Typography variant="h4">Courses Offered :</Typography>
                {ongoingCourses?.courseName}
              </div>}

            {activeSection === 'reviews' && <div>{reviews}</div>}
          </div>
          <div>
            <Typography variant="h4" sx={{ mt: 3, mb: 3 }}>
              <Trans i18nKey="studentProfile.studentCertification">
                Certification :
              </Trans>
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
              <Typography variant="h6" sx={{ marginLeft: '10px' }}>
              <Trans i18nKey="studentProfile.studentKeyDetails">
                Key Details :
              </Trans>
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
