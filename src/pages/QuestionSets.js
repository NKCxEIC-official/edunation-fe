import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import ExamListItem from '../components/ExamListItem';
import CustomModal from '../components/CustomModal';
import Scheduler from '../components/Scheduler';
import ExamScreen from '../sections/@exam/ExamScreen';
import ExamEnrollmentModal from './ExamEnrollmentModal';
import QuestionSetList from '../components/QuestionSetList';
import QuestionSetModal from './QuestionSetModal';

function QuestionSet() {
  const dispatch = useDispatch();

  return (
    <Grid container sx={{ p: 5}}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h4">Question Bank</Typography>
        <Container disableGutters="false" maxWidth='lg' >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h5" gutterBottom>
                Preset Question Sets
            </Typography>
            <CustomModal btnText={'Add New Set'} component={<QuestionSetModal />} icon="eva:plus-fill" />
          </Stack>
          <QuestionSetList/>
        </Container>
        </Card>
      </Grid>
    </Grid>
  );
}

export default QuestionSet;
