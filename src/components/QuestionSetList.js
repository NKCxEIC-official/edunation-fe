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

const demoQuestionSets = [
  {
    id: '89264198',
    name: 'Physics Set 1',
    description: 'A MCQ Test on Heat',
    color: green[500],
    duration: '2Hr',
    questions: [
      {
        question:
          'Which of the following is / are correct statements about the Millimeter waves, sometimes seen in news?',
        options: [
          {
            option: 'These are among the highest radio frequency band',
            isCorrect: true,
          },
          {
            option: 'They have higher wavelength than Microwaves',
            isCorrect: false,
          },
          {
            option: 'They are most notably used in security appliances',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'A cardboard is placed on a glass of water, and a ten paise coin is placed on the cardboard. If the cardboard is flicked suddenly in the direction parallel to its surface, then the cardboard flies away, but the coin falls in the glass. The behaviour of the coin can be explained by which among the following properties?',
        options: [
          {
            option: 'Momentum',
            isCorrect: true,
          },
          {
            option: 'Acceleration',
            isCorrect: false,
          },
          {
            option: 'Inertia',
            isCorrect: false,
          },
          {
            option: 'Friction',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'Which among the following is / are correct statements comparing the Alternative Current (AC) with Direct Current (DC)?1. AC is free from voltage fluctuations in comparison to DC2. AC can be transmitted over long distances with minimum power loss3. In contrast with AC, DC can not be used for high voltage devices4. In contrast with AC, DC cannot be run through a transformer5. In contrast with AC, DC can not be used in metal-plating applications',
        options: [
          {
            option: '1, 2, 3 & 4 are correct',
            isCorrect: true,
          },
          {
            option: '2, 3, 4 & 5 are correct',
            isCorrect: false,
          },
          {
            option: '2 & 3 are correct',
            isCorrect: false,
          },
          {
            option: '2, 3 & 4 are correct',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'Which of the following is / are correct statements about the Millimeter waves, sometimes seen in news?',
        options: [
          {
            option: 'These are among the highest radio frequency band',
            isCorrect: true,
          },
          {
            option: 'They have higher wavelength than Microwaves',
            isCorrect: false,
          },
          {
            option: 'They are most notably used in security appliances',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'Which of the following is / are correct statements about the Millimeter waves, sometimes seen in news?',
        options: [
          {
            option: 'These are among the highest radio frequency band',
            isCorrect: true,
          },
          {
            option: 'They have higher wavelength than Microwaves',
            isCorrect: false,
          },
          {
            option: 'They are most notably used in security appliances',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: '89264198',
    name: 'React Set 2',
    description: 'A MCQ Test on Heat',
    color: green[500],
    duration: '2Hr',
    questions: [
      {
        question:
          'Which of the following is / are correct statements about the Millimeter waves, sometimes seen in news?',
        options: [
          {
            option: 'These are among the highest radio frequency band',
            isCorrect: true,
          },
          {
            option: 'They have higher wavelength than Microwaves',
            isCorrect: false,
          },
          {
            option: 'They are most notably used in security appliances',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'A cardboard is placed on a glass of water, and a ten paise coin is placed on the cardboard. If the cardboard is flicked suddenly in the direction parallel to its surface, then the cardboard flies away, but the coin falls in the glass. The behaviour of the coin can be explained by which among the following properties?',
        options: [
          {
            option: 'Momentum',
            isCorrect: true,
          },
          {
            option: 'Acceleration',
            isCorrect: false,
          },
          {
            option: 'Inertia',
            isCorrect: false,
          },
          {
            option: 'Friction',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'Which among the following is / are correct statements comparing the Alternative Current (AC) with Direct Current (DC)?1. AC is free from voltage fluctuations in comparison to DC2. AC can be transmitted over long distances with minimum power loss3. In contrast with AC, DC can not be used for high voltage devices4. In contrast with AC, DC cannot be run through a transformer5. In contrast with AC, DC can not be used in metal-plating applications',
        options: [
          {
            option: '1, 2, 3 & 4 are correct',
            isCorrect: true,
          },
          {
            option: '2, 3, 4 & 5 are correct',
            isCorrect: false,
          },
          {
            option: '2 & 3 are correct',
            isCorrect: false,
          },
          {
            option: '2, 3 & 4 are correct',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'Which of the following is / are correct statements about the Millimeter waves, sometimes seen in news?',
        options: [
          {
            option: 'These are among the highest radio frequency band',
            isCorrect: true,
          },
          {
            option: 'They have higher wavelength than Microwaves',
            isCorrect: false,
          },
          {
            option: 'They are most notably used in security appliances',
            isCorrect: false,
          },
        ],
      },
      {
        question:
          'Which of the following is / are correct statements about the Millimeter waves, sometimes seen in news?',
        options: [
          {
            option: 'These are among the highest radio frequency band',
            isCorrect: true,
          },
          {
            option: 'They have higher wavelength than Microwaves',
            isCorrect: false,
          },
          {
            option: 'They are most notably used in security appliances',
            isCorrect: false,
          },
        ],
      },
    ],
  },
];

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const QuestionSetItem = ({color, name, description}) => {
  // const navigateToExam = (primaryTxt, secondaryTxt) => {
  //   if (!isGiven) {
  //     turnOffConfirmation();
  //     navigate(`/exam/student/${exam.id}/dashboard`, { replace: true });
  //     console.log('navigationg');
  //   }
  // };
  // if (isConfirmed) {
  //   navigateToExam();
  //   return;
  // }
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => {}}>
          {/* open the contextual dialog box */}
          {/* {utilIcon} */}
          <DoneAllRoundedIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: color }} variant="rounded">
          <AssignmentIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={description} />
    </ListItem>
  );
};

export default function QuestionSetList() {
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
        <Grid item xs={12} lg={24} xl={36} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Previously Created Sets
          </Typography>
          <Demo>
            <List dense={dense}>
              {demoQuestionSets.map((exam, key) => {
                return <QuestionSetItem color={'red'} name={exam.name} description={exam.description}  />;
              })}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
