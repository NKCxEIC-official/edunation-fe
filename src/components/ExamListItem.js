import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { deepOrange, green, orange, blue } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { CheckBox } from '@mui/icons-material';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const demoExamList = [
  {
    id: '89264198',
    name: 'Physics Exam',
    description: 'A MCQ Test on Heat',
    color: green[500],
    isGiven: false,
    duration: '2Hr',
  },
  {
    id: '89264198',
    name: 'Math Exam',
    description: 'A MCQ Test on Math Exam',
    color: orange[500],
    isGiven: false,
    duration: '4Hr',
  },
  {
    id: '89264198',
    name: 'React Exam',
    description: 'A MCQ Test on React',
    color: green[500],
    isGiven: false,
    duration: '2Hr',
  },
  {
    id: '8928239y98',
    name: 'DBMS Exam',
    description: 'A MCQ Test on DBMS',
    color: blue[600],
    isGiven: true,
    duration: '3Hr',
  },
  {
    id: '89264198',
    name: 'Physics Exam',
    description: 'A MCQ Test on Heat',
    color: green[500],
    isGiven: true,
    duration: '2Hr',
  },
  {
    id: '89264198',
    name: 'Math Exam',
    description: 'A MCQ Test on Math Exam',
    color: deepOrange[500],
    isGiven: true,
    duration: '1Hr',
  },
  {
    id: '89987198',
    name: 'React Exam',
    description: 'A MCQ Test on React',
    color: green[500],
    isGiven: true,
    duration: '2Hr',
  },
  {
    id: '898764198',
    name: 'DBMS Exam',
    description: 'A MCQ Test on DBMS',
    color: blue[600],
    isGiven: true,
    duration: '4Hr',
  },
];

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const JoinExamItem = ({
  isGiven,
  navigate,
  avatar,
  exam,
  color,
  primaryTxt,
  secondaryTxt,
  utilIcon,
  openDialogBox,
  isConfirmed,
  turnOffConfirmation,
}) => {
  const navigateToExam = (primaryTxt, secondaryTxt) => {
    if (!isGiven) {
      turnOffConfirmation();
      navigate(`/exam/student/${exam.id}/dashboard`, { replace: true });
      console.log('navigationg');
    }
  };
  if (isConfirmed) {
    navigateToExam();
    return;
  }
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={!isGiven ? openDialogBox : null}>
          {/* open the contextual dialog box */}

          {utilIcon}
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: color }} variant="rounded">
          {avatar}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primaryTxt} secondary={secondaryTxt} />
    </ListItem>
  );
};

export default function ExamListItem() {
  const navigate = useNavigate();
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [confirmedGetIn, setConfirmedGetIn] = React.useState(false);
  const [buttonActive, setButtonActive] = React.useState(false);

  const [examDuration, setExamDuration] = React.useState('');
  const [examName, setExamName] = React.useState('');

  const handleClickOpen = (exam) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const turnOffConfirmation = () => {
    setConfirmedGetIn(false);
  };
  const turnOnConfirmation = () => {
    setConfirmedGetIn(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Begin Exam'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Exam Name : <b>{examName}</b>
              <br />
              Exam Duration : <b>{examDuration}</b>
              <br />
              <br />
              <b>Note: You can't stop the exam, once started.</b>
              <br />
              <br />
              <FormGroup>
                <FormControlLabel
                  onChange={(event) => {
                    if (event.target.checked === true) {
                      setButtonActive(true);
                    } else {
                      setButtonActive(false);
                    }
                  }}
                  value={buttonActive}
                  control={<Checkbox />}
                  label="I agree to the terms and conditions of exam."
                />
              </FormGroup>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {buttonActive ? <Button onClick={turnOnConfirmation}>Agree</Button> : <Button disabled>Agree</Button>}
          </DialogActions>
        </Dialog>
        <Grid item xs={12} lg={24} xl={36} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Screening Examinations:
          </Typography>
          <Demo>
            <List dense={dense}>
              {demoExamList.map((exam) => {
                return (
                  <JoinExamItem
                    exam={exam}
                    primaryTxt={exam.name}
                    secondaryTxt={exam.description}
                    isGiven={exam.isGiven}
                    navigate={navigate}
                    avatar={<AssignmentIcon />}
                    color={exam.color}
                    utilIcon={exam.isGiven ? <DoneAllRoundedIcon /> : <HistoryEduRoundedIcon />}
                    openDialogBox={() => {
                      setExamDuration(exam.duration);
                      setExamName(exam.name);
                      console.log('exam: ', exam.name)
                      handleClickOpen(exam);
                    }}
                    isConfirmed={confirmedGetIn}
                    turnOffConfirmation={turnOffConfirmation}
                  />
                );
              })}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
