import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import CourseCard from '../../sections/@student/app/CourseCard'
// mock
import POSTS from '../../_mock/blog';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function TopRated() {
  return (
    <>
      <Grid container spacing={4}>
        {POSTS.map((post, index) => (
          <CourseCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </>
  );
}
