import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import ExamListItem from '../components/ExamListItem';
import CustomModal from '../components/CustomModal';
import Scheduler from '../components/Scheduler';
import ExamScreen from '../sections/@exam/ExamScreen';
import ExamEnrollmentModal from './ExamEnrollmentModal';

function ExamInfo() {
  const dispatch = useDispatch();

  return (
    <Grid container sx={{ p: 5}}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ ml: 1, mb: 3 }}>Upcoming Screening Exam</Typography>
        <Container disableGutters="false" maxWidth='lg' >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, ml: 1, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              Exam Schedule
            </Typography>
            <CustomModal btnText={'Schedule'} component={<ExamEnrollmentModal />} icon="eva:plus-fill" />
          </Stack>
          <ExamListItem />
        </Container>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ExamInfo;
