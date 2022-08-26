import { Button, Card, CardHeader, CardContent, Divider, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';

function ExamSettingsItem({ examName, desc }) {
  return (
    <Card>
      <CardHeader
        title={examName}
        action={
          <Button
            onClick={console.log('hi')}
            variant="contained"
            color="danger"
            to="#"
            sx={{ borderRadius: 28, height: '30px', minWidth: '30px', padding: 0 }}
          >
            <Iconify icon="entypo:cross" />
          </Button>
        }
      />
      <CardContent>
        <div style={{ opacity: 0.5, fontSize: '14px', marginBottom: '20px' }}>{desc}</div>
        <Divider variant="middle" />
        <br />
        <Typography variant="subtitle2">Total Time : 30mins | Total Questions : 30 | Total Marks : 100</Typography>
        <Typography variant="subtitle1">Exam sections :</Typography>
        <Typography variant="subtitle2">
          MCQ - 1 marks X 50 Questions
          <br />
          Subjective - 2 marks X 20 questions
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExamSettingsItem;
