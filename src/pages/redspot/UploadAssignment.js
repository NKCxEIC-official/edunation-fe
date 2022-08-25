import React from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button, useFormControl, Stack, Input } from '@mui/material';
import { Form } from 'react-bootstrap';

export default function UploadAssignment() {
  return (
    <div className="Create a class">
      <Typography variant="h4">Upload an Assignment</Typography>

      <Form>
        <Stack spacing={3}>
          <TextField
            id="filled-basic"
            label="Query Name"
            variant="standard"
            placeholder="Enter Class Name"
            fullWidth
            required
          />
          <TextField
            id="filled-basic"
            label="Query Description"
            variant="standard"
            placeholder="Enter Class Description"
            fullWidth
            required
            multiline
          />
          <Button variant="contained" component="label" color="info">
            Attach File
            <input type="file" hidden accept="image/png, image/gif, image/jpeg" />
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Upload
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
