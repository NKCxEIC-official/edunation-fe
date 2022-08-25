/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import CourseCard from '../../sections/@student/app/CourseCard';
import { getDatafromDBAction } from 'src/store/actions/AuthActions';
import { useEffect } from 'react';
// mock

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TopRated({ ownedOnly = false }) {
  const { classes } = useSelector((state) => state.auth.data);
  const user = useSelector((state) => state.auth.user);
  const dispatch =  useDispatch();

  useEffect(() => {
    dispatch(getDatafromDBAction('classes', true, 'classes'))
  }, [])

  return (
    <>
      <Grid container spacing={4}>
        {Object.keys(classes || {}).map((classKey, index) => (
          <>
            {!ownedOnly
              ? !classes[classKey]?.enrolled?.includes(user.uid) && (
                  <CourseCard classKey={classKey} post={classes[classKey]} index={index} />
                )
              : classes[classKey]?.creator.uid === user?.uid && (
                  <CourseCard classKey={classKey} post={classes[classKey]} index={index} />
                )}
          </>
        ))}
      </Grid>
    </>
  );
}
