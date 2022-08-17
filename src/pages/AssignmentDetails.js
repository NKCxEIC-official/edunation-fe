import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Container, Typography, Stack, Button, CardContent, Card } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import AssignmentFile from '../components/AssignmentFile';
import Iconify from '../components/Iconify';
import CustomModal from '../components/CustomModal';
import UploadAssignment from './student/UploadAssignment';


function AssignmentDetails() {

  const user = useSelector(state => state.auth.user)

  const { assingmentId } = useParams()
  console.log(assingmentId)
  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={9}>
            <Typography variant="h3" sx={{ mb: 2 }}>Database Management System</Typography>
            <Typography variant="p" sx={{ opacity: 0.7 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Typography>
          </Grid>
          <Grid item md={3} sx={{ display: "flex", alignItem: "center", justifyContent: "center", flexDirection: "column", pl: 4 }}>
            {!user?.isTeacher && <CustomModal btnText={'Upload Assignment'} sx={{ mb: 4 }} component={<UploadAssignment />} icon="eva:plus-fill" />}

            {user?.isTeacher && <Button to="/dashboard/teacher/classroom/123456/assingment/1233/check" component={RouterLink} variant="contained" startIcon={<Iconify icon={"ant-design:check-circle-twotone"} sx={{ height: "50px" }} />} >
              Check Assignments
            </Button>}
          </Grid>
        </Grid>
        <hr style={{ marginTop: "20px", opacity: 0.7 }} />
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          Files
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <AssignmentFile subheader="Assignment 1" icon={'vscode-icons:file-type-reactjs'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <AssignmentFile subheader="Assignment 2" icon={'logos:flutter'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <AssignmentFile subheader="Assignment 3" icon={'vscode-icons:file-type-python'} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default AssignmentDetails