import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Button, CardContent, Card } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
// components../components/CourseGrid
import CustomModal from '../components/CustomModal';
import CourseGrid from '../components/CourseGrid';
import SmallGrid from '../components/SmallGrid';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import VidyaDaan from '../components/VidyaDaan';
import AddAssignment from './teacher/AddAssignment';
import { getDatafromDBAction } from '../store/actions/AuthActions';
import AddCourseMaterial from './teacher/AddCourseMaterial';
import AddVidyaDaanLink from './teacher/AddVidyaDaanLink';
// sections

// ----------------------------------------------------------------------

export default function CourseDetails() {
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
  const theme = useTheme();

  const { classes } = data;

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
        <Typography variant="h4">Welcome To,</Typography>
        <Typography variant="p">{name}</Typography>

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

        <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
          Assignments
        </Typography>

        <Grid container spacing={4}>
          <Grid
            to={`/dashboard/${user?.isTeacher ? 'teacher' : 'student'}/classroom/${id}/assingment/1233`}
            component={RouterLink}
            item
            xs={12}
            sm={6}
            md={3}
            lg={4}
          >
            <CourseGrid subheader="Arrow Function" count={user?.ongoingCourses?.assignmentCount} icon={'vscode-icons:file-type-reactjs'} />
          </Grid>
</Grid>
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
                  to={`/dashboard/${user?.isTeacher ? 'teacher' : 'student'}/classroom/${id}/course-materials/${idx}`}
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

        <Grid item lg={12} sx={{ mt: 3 }}>
          <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="row" sx={{ mb: 4, mr: 2 }}>
            <Typography variant="h4">Live Recorded Videos :</Typography>
            <Button size="medium" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
              View all
            </Button>
          </Stack>
        </Grid>

        <Grid container spacing={4}>
          {videos?.length > 0 &&
            videos.map((video, idx) => {
              return (
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <iframe
                    src={video}
                    frameBorder="0"
                    allow="accelometer; autoplay; encrypted-media"
                    allowFullScreen
                    title="ArrowFunction"
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Page>
  );
}
