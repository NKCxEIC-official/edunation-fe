import React from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button, useFormControl, Stack } from '@mui/material';
import { Form } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

export default function QuestionSetModal() {
  const [age, setAge] = React.useState('');
  const [newTopic, setNewTopic] = React.useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    console.log('tab value', newValue)
  };

  const getTopicList = () => {
    dispatch(getTopicList());
  };
  const handleChange = (event) => {
    if (event.target.value === 'add') {
      console.log('+ clicked');
      setNewTopic(true);
    } else {
      setNewTopic(false);
    }
    setAge(event.target.value);
  };

  return (
    <div className="Create a class">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Select Question Set Topic
      </Typography>

      <Form>
        <Stack spacing={3}>
          <Tabs value={value} onChange={handleTabChange} aria-label="disabled tabs example">
            <Tab label="Available Topics" />
            <Tab label="Requested Topics" />
          </Tabs>

          {value === 0 ? <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Topic</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>Physics</MenuItem>
              <MenuItem value="add">
                <em>+ Apply New</em>
              </MenuItem>
            </Select>
          </FormControl>
          : 
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Topic</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={20}>React.js</MenuItem>
              <MenuItem value={30}>Math</MenuItem>
              <MenuItem value="add">
                <em>+ Apply New</em>
              </MenuItem>
            </Select>
          </FormControl>}
          {newTopic === true ? (
            <>
              <TextField
                id="filled-basic"
                label="New Topic"
                variant="outlined"
                placeholder="Enter New Topic Name"
                fullWidth
                required
              />
              <TextField
                id="filled-basic"
                label="Enter Topic Description "
                variant="outlined"
                placeholder="Why you want to add?"
                fullWidth
                required
                multiline
              />
            </>
          ) : null}

          <Button onClick={() => {
            console.log('contribute')
            navigate("/dashboard/teacher/set-question/add-question-set");
          }} type="submit" variant="contained" color="primary" fullWidth>
            Contribute
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
