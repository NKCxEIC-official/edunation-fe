import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import React from 'react'

function AddTeacher() {
  return (<Stack spacing={2}>
    <Stack direction="row" spacing={2}>
    <TextField
          id="outlined-disabled"
          label="First Name"
          fullWidth
        />
        <TextField
          id="outlined-disabled"
          label="Last Name"
          fullWidth
        />
        </Stack>
        <TextField
          id="outlined-disabled"
          label="Age"
          fullWidth
        />
        <TextField
          id="outlined-disabled"
          label="Email ID"
          fullWidth
        />
        <TextField
          id="outlined-disabled"
          label="Phone"
          fullWidth
        />
        <TextField
          id="outlined-disabled"
          label="Address"
          fullWidth
        />
        <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-disabled"
          label="City"
          fullWidth
        />
        <TextField
          id="outlined-disabled"
          label="State"
          fullWidth
        />
        </ Stack>
        <TextField
          id="outlined-disabled"
          label="Occupation"
          fullWidth
        />
        <TextField
          id="outlined-disabled"
          label="University/School"
          fullWidth
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
        Add Teacher
      </LoadingButton>
        </ Stack>
  )
  
}

export default AddTeacher