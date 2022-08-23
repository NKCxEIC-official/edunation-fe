import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button, useFormControl, Stack, Input } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function PostAQuery() {
  const user = useSelector((state) => state.auth.user);
  const [description, setDescription] = useState('');

  function handleSubmit() {
    const payload = {
      description,
      downvote: 0,
      dp: user.dp,
      firstName: user.firstName,
      lastName: user.lastName,
      isTeacher: false,
      upvote: 0,
    };
  }

  return (
    <div className="Create a class">
      <Typography variant="h4">Post a Query</Typography>

      <Form>
        <Stack spacing={3}>
          <TextField
            id="filled-basic"
            label="Query Description"
            variant="standard"
            placeholder="Enter Class Description"
            fullWidth
            required
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="contained" component="label" color="info">
            Attach File
            <input type="file" hidden accept="image/png, image/gif, image/jpeg" />
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Post Query
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
