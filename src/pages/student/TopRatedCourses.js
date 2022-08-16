import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import CourseCard from '../../sections/@student/app/CourseCard'
// mock

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function TopRated({posts}) {
  console.log(posts)
  return (
    <>
      <Grid container spacing={4}>
        {posts.map((post, index) => (
          <CourseCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </>
  );
}
