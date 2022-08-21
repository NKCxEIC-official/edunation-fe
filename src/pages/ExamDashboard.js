import { Card, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import ExamScreen from '../sections/@exam/ExamScreen';

function ExamDashboard() {
  return (
    <Grid container sx={{ p: 5, pt: '90px' }}>
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
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Card sx={{ p: 3 }}>
            <Stack>
              <Typography variant="subtitle1">
                Aptitude <span style={{ opacity: 0.5 }}>- Descriptive</span>
              </Typography>
              <Typography variant="body2">10 Questions</Typography>
            </Stack>
          </Card>
          <Card sx={{ p: 3 }}>
            <Stack>
              <Typography variant="subtitle1">
                Aptitude <span style={{ opacity: 0.5 }}>- Descriptive</span>
              </Typography>
              <Typography variant="body2">10 Questions</Typography>
            </Stack>
          </Card>
        </Stack>
      </Grid>
      <Grid xs={12} sx={{ mt: 2 }}>
        <ExamScreen />
      </Grid>
    </Grid>
  );
}

export default ExamDashboard;
