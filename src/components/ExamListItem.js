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
    name: 'Physics Exam',
    description: 'A MCQ Test on Heat',
    color: green[500],
    isGiven: false,
  },
  {
    name: 'Math Exam',
    description: 'A MCQ Test on Math Exam',
    color: orange[500],
    isGiven: false,
  },
  {
    name: 'React Exam',
    description: 'A MCQ Test on React',
    color: green[500],
    isGiven: false,
  },
  {
    name: 'DBMS Exam',
    description: 'A MCQ Test on DBMS',
    color: blue[600],
    isGiven: true,
  },
  {
    name: 'Physics Exam',
    description: 'A MCQ Test on Heat',
    color: green[500],
    isGiven: true,
  },
  {
    name: 'Math Exam',
    description: 'A MCQ Test on Math Exam',
    color: deepOrange[500],
    isGiven: true,
  },
  {
    name: 'React Exam',
    description: 'A MCQ Test on React',
    color: green[500],
    isGiven: true,
  },
  {
    name: 'DBMS Exam',
    description: 'A MCQ Test on DBMS',
    color: blue[600],
    isGiven: true,
  },
];

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const JoinExamItem = ({ id, isGiven, navigate, avatar, color, primaryTxt, secondaryTxt, utilIcon, openDialogBox, isConfirmed, turnOffConfirmation }) => {
  const navigateToExam = (primaryTxt, secondaryTxt) => {
    if (!isGiven) {
      turnOffConfirmation()
      navigate(`/exam/student/${id}/dashboard`, { replace: true });
      console.log("navigationg")
    }
  };
  if (isConfirmed) {
    navigateToExam()
    return
  }
  const openConfirmationDialog = openDialogBox;
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={ !isGiven ? openConfirmationDialog : null}>
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const turnOffConfirmation = () => {
    setConfirmedGetIn(false)
  }
  const turnOnConfirmation = () => {
    setConfirmedGetIn(true)
  }

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
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to Google, even when
              no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={turnOnConfirmation}>Agree</Button>
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
                    id='37e28r'
                    primaryTxt={exam.name}
                    secondaryTxt={exam.description}
                    isGiven={exam.isGiven}
                    navigate={navigate}
                    avatar={<AssignmentIcon />}
                    color={exam.color}
                    utilIcon={exam.isGiven ? <DoneAllRoundedIcon /> : <HistoryEduRoundedIcon />}
                    openDialogBox={handleClickOpen}
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
