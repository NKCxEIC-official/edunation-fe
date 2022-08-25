import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { getDatabase, ref, set } from 'firebase/database';

import { useDispatch, useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Button, CardContent, Card, Box } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
// components../components/CourseGrid
import CustomModal from '../components/CustomModal';
import CourseGrid from '../components/CourseGrid';
import SmallGrid from '../components/SmallGrid';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import VidyaDaan from '../components/VidyaDaan';
import VideoCall from '../components/VideoCall';
import AddAssignment from './teacher/AddAssignment';
import { getDatafromDBAction } from '../store/actions/AuthActions';
import AddCourseMaterial from './teacher/AddCourseMaterial';
import AddVidyaDaanLink from './teacher/AddVidyaDaanLink';
// sections

// ----------------------------------------------------------------------

export default function CourseDetails() {
  const theme = useTheme();
  const [showVideoCall, setShowVideoCall] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, data } = useSelector((state) => {
    return {
      user: state.auth.user,
      data: state.auth.data,
    };
  });
  const [courseDetails, setCourseDetails] = useState({});
  const { name, studentList, courseMaterial, videos, assignments, creator, vidyaDaanResources } = courseDetails;
  const { ongoingCourses, totalEnrolled } = user;

  const { classes } = data;

  const initiateVideoCall = () => {
    console.log('hi');
    const db = getDatabase();
    set(ref(db, `liveClass/${id}`), {
      roomName: id,
      isLive: true,
    });

    setShowVideoCall(true);
  };

  useEffect(() => {
    if (Object.keys(classes || {}).includes(id)) {
      setCourseDetails(classes[id]);
    }
  }, [classes, id]);

  useEffect(() => {
    dispatch(getDatafromDBAction('classes', true, 'classes'));
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Stack direction="rows" justifyContent="space-between">
          <Box>
            <Typography variant="h4">Welcome To,</Typography>
            <Typography variant="p">{name}</Typography>
          </Box>

          {!showVideoCall && (
            <Button variant="contained" onClick={initiateVideoCall}>
              Start Class
            </Button>
          )}
        </Stack>
        {!showVideoCall && (
          <>
            <Grid container spacing={4} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <SmallGrid title="React JS" subheader="Student Count" count={studentList?.length} color="primary" />
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={4}>
                <SmallGrid title="React JS" subheader="Course Material" count={courseMaterial?.length} color="error" />
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={4}>
                <SmallGrid title="React JS" subheader="Video Count" count={videos?.length} color="success" />
              </Grid>
            </Grid>

            {/* <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid
              title="React JS"
              subheader="Class Progress"
              count={ongoingCourses?.length}
              totalCount={totalEnrolled}
              color="warning"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="QNA" count={66} totalCount={70} color="primary" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={4}>
            <SmallGrid title="React JS" subheader="Fees" count={26} totalCount={30} color="error" />
          </Grid>
        </Grid> */}

            <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
              Assignments
            </Typography>

            <Grid container spacing={4}>
              <Grid
                to={`/dashboard/${user?.isTeacher ? 'teacher' : 'student'}/classroom/123456/assingment/1233`}
                component={RouterLink}
                item
                xs={12}
                sm={6}
                md={3}
                lg={4}
              >
                <CourseGrid
                  subheader="Arrow Function"
                  count={user?.ongoingCourses?.assignmentCount}
                  icon={'vscode-icons:file-type-reactjs'}
                />
              </Grid>
            </Grid>

            <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
              Course Material
            </Typography>

            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={4}
                to={`/dashboard/${user?.isTeacher ? 'teacher' : 'student'}/classroom/:id/god/details`}
                component={RouterLink}
              >
                <CourseGrid subheader="UseState" count={courseMaterial.length} icon={'logos:tensorflow'} />
              </Grid>
            </Grid>

            <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
              Vidya Daan
            </Typography>
            <Grid
              container
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', mb: 3 }}
            >
              <Typography variant="h4">Assignments :</Typography>
              {creator?.uid === user?.uid && (
                <CustomModal
                  btnText={'Add new assignment'}
                  sx={{ mb: 4 }}
                  component={<AddAssignment classId={id} />}
                  icon="eva:plus-fill"
                />
              )}
            </Grid>

            <Grid container spacing={4} sx={{ display: 'flex' }}>
              {assignments?.length > 0 &&
                assignments.map((assignment, idx) => {
                  return (
                    <Grid
                      to={`/dashboard/${user?.isTeacher ? 'teacher' : 'student'}/classroom/${id}/assignment/${idx}`}
                      component={RouterLink}
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      lg={4}
                      xl={4}
                    >
                      <CourseGrid subheader={assignment?.title} icon={'ic:baseline-assignment'} color={'#2E2B81'} />
                    </Grid>
                  );
                })}
            </Grid>

            <Grid
              container
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', mb: 3 }}
            >
              <Typography variant="h4">Course Materials :</Typography>
              {creator?.uid === user?.uid && (
                <CustomModal
                  btnText={'Add Course Material'}
                  sx={{ mb: 4 }}
                  component={<AddCourseMaterial classId={id} />}
                  icon="eva:plus-fill"
                />
              )}
            </Grid>

            <Grid container spacing={4}>
              {courseMaterial?.length > 0 &&
                courseMaterial.map((item, idx) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      lg={4}
                      xl={4}
                      to={`/dashboard/${
                        user?.isTeacher ? 'teacher' : 'student'
                      }/classroom/${id}/course-materials/${idx}`}
                      component={RouterLink}
                    >
                      <CourseGrid
                        subheader={item?.title}
                        count={courseMaterial?.length}
                        icon={'arcticons:onlyoffice-documents'}
                      />
                    </Grid>
                  );
                })}
            </Grid>

            <Grid
              container
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', mb: 3 }}
            >
              <Typography variant="h4">Vidya Daan/Diksha Resources :</Typography>
              {creator?.uid === user?.uid && (
                <CustomModal
                  btnText={'Add VidyaDaan/Diksha Resource'}
                  sx={{ mb: 4 }}
                  component={<AddVidyaDaanLink classId={id} />}
                  icon="eva:plus-fill"
                />
              )}
            </Grid>

            <Grid container spacing={4}>
              {vidyaDaanResources?.length > 0 &&
                vidyaDaanResources.map((item, idx) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      lg={4}
                      xl={4}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => window.open(item?.link, '_blank')}
                    >
                      <VidyaDaan
                        smallheader={item.subtitle}
                        subheader={item.title}
                        icon={'akar-icons:link-chain'}
                        color="#2E2B81"
                      />
                    </Grid>
                  );
                })}
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <Button
                  sx={{ width: '100%' }}
                  onClick={() => {
                    window.open(
                      'https://diksha.gov.in/ncert/play/collection/do_31339576668973465612958?contentType=TextBook',
                      '_blank'
                    );
                  }}
                  target="_blank"
                >
                  <VidyaDaan subheader="NCERT" smallheader="Academic(Class 1)" icon={'akar-icons:link-chain'} />
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={4}>
                <Button
                  sx={{ width: '100%' }}
                  onClick={() => {
                    window.open(
                      'https://diksha.gov.in/ncert/play/collection/do_31307360981920972812163?contentType=TextBook',
                      '_blank'
                    );
                  }}
                  target="_blank"
                >
                  <VidyaDaan subheader="NCERT-English" smallheader="Marigold(Class 1)" icon={'akar-icons:link-chain'} />
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={4}>
                <Button
                  sx={{ width: '100%' }}
                  onClick={() => {
                    window.open(
                      'https://diksha.gov.in/ncert/play/collection/do_31307361357388185614238?contentType=TextBook',
                      '_blank'
                    );
                  }}
                  target="_blank"
                >
                  <VidyaDaan subheader="NCERT- Hindi" smallheader="Rimjhim (Class 1)" icon={'akar-icons:link-chain'} />
                </Button>
              </Grid>
            </Grid>

            <Grid item lg={12} sx={{ mt: 3 }}>
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                direction="row"
                sx={{ mb: 4, mr: 2 }}
              >
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
          </>
        )}
      </Container>

      {showVideoCall && <VideoCall roomName={id} />}

      {showVideoCall && (
        <Button
          variant="contained"
          color="error"
          onClick={() => setShowVideoCall(false)}
          sx={{ mt: 2, mr: 2 }}
          fullWidth
        >
          End Class
        </Button>
      )}
    </Page>
  );
}
