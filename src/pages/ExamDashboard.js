import { Card, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ExamScreen from '../sections/@exam/ExamScreen';

function ExamDashboard(props) {
  const { user, data } = useSelector((state) => {
    return {
      user: state.auth.user,
      data: state.auth.data
    }
  })
  const { exams } = data;

  const EXAM_OBJECT = {
    duration: 40 * 60 * 1000
  }

  return (
    <Grid container sx={{ p: 5}}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h4">Interview For Rcciit</Typography>
          <Stack direction="row" sx={{ mt: 2 }}>
            <Stack alignItems="center" sx={{ borderRight: ' 1px solid #ddd', pr: 2 }}>
              <Typography variant="subtitle2_50">Exam Duration:</Typography>
              <Typography variant="subtitle2">40 Mins</Typography>
            </Stack>
            <Stack alignItems="center" sx={{ pl: 2 }}>
              <Typography variant="subtitle2_50">No. of Questions</Typography>
              <Typography variant="subtitle2">50</Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="h5">Assessments</Typography>
      </Grid>
      <Grid xs={12} sx={{ mt: 2 }}>
        <ExamScreen />
      </Grid>
    </Grid>
  );
}

export default ExamDashboard;
