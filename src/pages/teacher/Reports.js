import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Stack, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { style } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { getDatafromDBAction } from '../../store/actions/AuthActions';
import Reports from '../../components/Reports'
import CourseGrid from '../../components/CourseGrid'


// const DUMMY_COURSES_DATA = {
//   "reactJs": {
//     courseName: "React JS",
//     studentsEnrolled: 12,
//     revenueGenerated: 15,
//     assignmentSubmitted: 10,
//     testTaken: 4,
//     assignmentReport: [
//       { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
//       { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
//       { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
//     ],
//     testReport: [
//       { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
//       { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
//       { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
//     ]
//   },
//   "flutter": {
//     courseName: "Flutter",
//     studentsEnrolled: 2,
//     revenueGenerated: 18,
//     assignmentSubmitted: 0,
//     testTaken: 1,
//     assignmentReport: [
//       { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
//       { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
//       { name: "Souraj", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
//     ],
//     testReport: [
//       { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
//       { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
//       { name: "Basu", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
//     ]
//   },
//   "expressJs": {
//     courseName: "Express JS",
//     studentsEnrolled: 1,
//     revenueGenerated: 1,
//     assignmentSubmitted: 0,
//     testTaken: 0,
//     assignmentReport: [
//       { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
//       { name: "Suhani", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
//       { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
//     ],
//     testReport: [
//       { name: "Souraj", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
//       { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
//       { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
//     ]
//   }
// }

export default function TeacherReport({ studentCount }) {
  const [selectedCourseData, updateSelectedCourseData] = useState({})
  const [selectedCourseId, updateSelectedCourseId] = useState(undefined);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatafromDBAction('classes', true, 'classes'));
  }, []);

  const user = useSelector(state => state.auth.user)
  const { classes } = useSelector(state => state.auth.data)

  console.log(selectedCourseData)

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleChange = (e) => {
    setSelectedCourse(e.target.value);
    updateSelectedCourseData(classes[selectedCourseId]);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage("bn")
  }, [])

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">
          <Trans i18nKey="teacherDashboard.teacherCourses">
            Courses
          </Trans></InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCourse}
          label="Courses"
          onChange={(e) => handleChange(e)}
        >
          {
            Object.keys(classes || {}).map((classId) => {
              return classes[classId].creator.uid === user.id ? <MenuItem value={classes[classId].subject} key={classId} name={classId} onClick={(e) => updateSelectedCourseId(classId)}>{classes[classId].name}</MenuItem> : null;
            })
          }
        </Select>
        {/* <FormHelperText>Select Courses Enrolled</FormHelperText> */}
      </FormControl>
      {selectedCourse && <><Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <CourseGrid subheader={<Trans i18nKey="teacherReports.teacherteachersEnrolled">
            Students Enrolled
          </Trans>} count={selectedCourseData?.studentCount} icon={'ph:student-light'} color="blueviolet" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <CourseGrid subheader={<Trans i18nKey="teacherReports.teacherRevenueGenerated">
            Revenue Generated
          </Trans>} count={selectedCourseData?.revenueGenerated} icon={'clarity:wallet-line'} color="blueviolet" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <CourseGrid subheader={<Trans i18nKey="teacherReports.teacherAssignmentSubmitted">
            Assignment Submitted
          </Trans>} count={selectedCourseData?.assignmentSubmitted} icon={'ic:outline-assignment'} color="blueviolet" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <CourseGrid subheader="Test Taken" count={selectedCourseData?.testTaken} icon={'healthicons:i-exam-multiple-choice-outline'} color="blueviolet" />
        </Grid>
      </Grid>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
            <Typography variant="h4" gutterBottom>
              Assignment Report :
            </Typography>
          </Stack>
          <Reports data={selectedCourseData?.assignmentReport} />
        </Container>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
            <Typography variant="h4" gutterBottom>
              Test Reports :
            </Typography>
          </Stack>
          <Reports data={selectedCourseData?.testReport} />
        </Container>
      </>
      }
    </div>
  );
}
