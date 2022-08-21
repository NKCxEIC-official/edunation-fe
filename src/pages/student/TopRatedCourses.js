import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import CourseCard from '../../sections/@student/app/CourseCard'
// mock

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function TopRated({posts}) {
  console.log(posts)

  const {classes} = useSelector(state => state.auth.data)
  console.log("classes", classes)

  return (
    <>
      <Grid container spacing={4}>
        {Object.keys(classes || {}).map((classKey, index) => (
          <>
          <CourseCard classKey={classKey} post={classes[classKey]} index={index} />
          </>
        ))}
      </Grid>
    </>
  );
}
