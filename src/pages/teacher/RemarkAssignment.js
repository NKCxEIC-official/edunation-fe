import { Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Form } from 'react-bootstrap';

function RemarkAssignment() {
  return (
    <div className="Create a class">
      <Typography variant="h4">Check Assignment</Typography>

      <Form>
        <Stack spacing={3}>
          <TextField
            id="filled-basic"
            label="Remarks"
            variant="standard"
            placeholder="Provide Remarks"
            fullWidth
            required
          />
          <TextField
            id="filled-basic"
            label="Marks"
            variant="standard"
            placeholder="Provide Marks"
            type="number"
            InputProps={{
                endAdornment: <InputAdornment position="start">/100</InputAdornment>,
              }}
            fullWidth
            required
            multiline
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Post Remark
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

export default RemarkAssignment;
