import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button, useFormControl, Stack } from '@mui/material';
import { Form } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getDatafromDBAction } from '../store/actions/AuthActions';

export default function ExamEnrollmentModal() {
  const [age, setAge] = React.useState('');
  const [newTopic, setNewTopic] = React.useState(false);
  const [topicList, setTopicList] = useState([]);
  const dispatch = useDispatch();
  const { user, data } = useSelector((state) => {
    return {
      user: state.auth.user,
      data: state.auth.data
    }
  });
  const { classes } = data;

  useEffect(() => {
    dispatch(getDatafromDBAction('classes', true, 'classes'));
  }, [])

  useEffect(() => {
    if ( classes ) {
      const localTopicList = []
      Object.keys(classes || {}).forEach((classId) => {
        if('subject' in classes[classId]) {
          localTopicList.push(classes[classId].subject);
        }
      })
      setTopicList(localTopicList);
    }
  }, [classes])
  
  const handleChange = (event) => {
    if (event.target.value === 'add') {
      setNewTopic(true);
    }
    else{
      setNewTopic(false);
    }
    setAge(event.target.value);
  };

  return (
    <div className="Create a class">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Enroll For Exam
      </Typography>

      <Form>
        <Stack spacing={3}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Topic</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              {topicList.map((topic) => {
                return <MenuItem value={topic}>{topic}</MenuItem>;
              })}
              <MenuItem value="add">
                <em>+ Apply New</em>
              </MenuItem>
            </Select>
          </FormControl>
          {newTopic === true ? (
            <>
              <TextField
                id="filled-basic"
                label="New Topic"
                variant='outlined'
                placeholder="Enter New Topic Name"
                fullWidth
                required
              />
              <TextField
                id="filled-basic"
                label="Enter Topic Description "
                variant='outlined'
                placeholder="Why you want to add?"
                fullWidth
                required
                multiline
              />
            </>
          ) : null}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Enrollment
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
