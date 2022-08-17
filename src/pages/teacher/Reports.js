import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Stack, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { style } from '@mui/system';
import Reports from '../../components/Reports'
import CourseGrid from '../../components/CourseGrid'


const DUMMY_COURSES_DATA = {
  "reactJs": {
    courseName: "React JS",
    studentsEnrolled: 12,
    revenueGenerated: 15,
    assignmentSubmitted: 10,
    testTaken: 4,
    assignmentReport: [
      { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
      { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
      { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
    ],
    testReport: [
      { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
      { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
      { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
    ]
  },
  "flutter": {
    courseName: "Flutter",
    studentsEnrolled: 2,
    revenueGenerated: 18,
    assignmentSubmitted: 0,
    testTaken: 1,
    assignmentReport: [
      { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
      { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
      { name: "Souraj", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
    ],
    testReport: [
      { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
      { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
      { name: "Basu", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
    ]
  },
  "expressJs": {
    courseName: "Express JS",
    studentsEnrolled: 1,
    revenueGenerated: 1,
    assignmentSubmitted: 0,
    testTaken: 0,
    assignmentReport: [
      { name: "Camelia", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
      { name: "Suhani", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
      { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
    ],
    testReport: [
      { name: "Souraj", remarks: "good student", submittedOn: "12 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_14.jpg" },
      { name: "Aritra", remarks: "best boi", submittedOn: "19 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_16.jpg" },
      { name: "Hamba", remarks: "best cow", submittedOn: "22 Aug 2022", avatarUrl: "http://localhost:3000/static/mock-images/avatars/avatar_22.jpg" },
    ]
  }
}

export default function TeacherReport({ coursesData = DUMMY_COURSES_DATA }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Courses</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCourse}
          label="Courses"
          onChange={handleChange}
        >
          {
            Object.keys(coursesData).map((course) => {
              return <MenuItem value={course} onSelect={handleChange}>{coursesData[course].courseName}</MenuItem>
            })
          }
        </Select>
        {/* <FormHelperText>Select Courses Enrolled</FormHelperText> */}
      </FormControl>
{selectedCourse &&  <><Grid container spacing={2} sx={{mt:5}}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <CourseGrid subheader="Students Enrolled" count={coursesData[selectedCourse]?.studentsEnrolled} icon={'ph:student-light' } color="blueviolet" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <CourseGrid subheader="Revenue Generated" count={coursesData[selectedCourse]?.revenueGenerated} icon={'clarity:wallet-line'} color="blueviolet" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <CourseGrid subheader="Assignment Submitted" count={coursesData[selectedCourse]?.assignmentSubmitted} icon={'ic:outline-assignment'} color="blueviolet" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <CourseGrid subheader="Test Taken" count={coursesData[selectedCourse]?.testTaken} icon={'healthicons:i-exam-multiple-choice-outline'} color="blueviolet" />
          </Grid>
        </Grid>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            Assignment Report :
          </Typography>
        </Stack>
        <Reports data={coursesData[selectedCourse]?.assignmentReport} />
        </Container>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            Test Reports :
          </Typography>
        </Stack>
        <Reports data={coursesData[selectedCourse]?.testReport}/>
        </Container>
        </>
}
           </div>
  );
}
