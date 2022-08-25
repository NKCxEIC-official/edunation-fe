/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Typography, Stack, Button, CardContent, Card } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getDatafromDBAction } from '../store/actions/AuthActions';
import Iconify from '../components/Iconify';
import CustomModal from '../components/CustomModal';
import UploadAssignment from './student/UploadAssignment';
import { getOrdinalSuffix, shortenedMonthList } from '../utils/dataHelpers';

function AssignmentDetails() {
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const { user, data } = useSelector((state) => {
    return {
      user: state.auth.user,
      data: state.auth.data,
    };
  });
  const { id, assignmentId } = useParams();
  const { classes } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDatafromDBAction('classes', true, 'classes'));
  }, []);

  useEffect(() => {
    if (
      Object.keys(classes).includes(id) &&
      classes[id]?.assignments?.length > 0 &&
      classes[id].assignments.length >= parseInt(assignmentId) + 1
    ) {
      setAssignmentDetails(classes[id].assignments[assignmentId]);
    }
  }, [id, assignmentId, classes]);

  const formatTime = (dateObj) => {
    let dateTimeString =
      getOrdinalSuffix(dateObj.getDate()) +
      ' ' +
      shortenedMonthList[dateObj.getMonth()] +
      `, ${dateObj.getFullYear()}` +
      ' at ' +
      dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return dateTimeString;
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item md={9}>
            <Typography variant="h3" sx={{ mb: 1 }}>
              {assignmentDetails?.title}
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Deadline: {formatTime(new Date(assignmentDetails?.submissionDeadline))}
            </Typography>
            <Typography variant="p" sx={{ opacity: 0.7 }}>
              {assignmentDetails?.assignmentDescription}
            </Typography>
          </Grid>
          <Grid
            item
            md={3}
            sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', flexDirection: 'column', pl: 4 }}
          >
            {!user?.isTeacher && (
              <CustomModal
                btnText={'Upload Assignment'}
                sx={{ mb: 4 }}
                component={<UploadAssignment />}
                icon="eva:plus-fill"
              />
            )}

            {user?.isTeacher && (
              <Button
                to={`/dashboard/teacher/classroom/${id}/assignment/${assignmentId}/check`}
                component={RouterLink}
                variant="contained"
                startIcon={<Iconify icon={'ant-design:check-circle-twotone'} sx={{ height: '50px' }} />}
              >
                Check Assignments
              </Button>
            )}
          </Grid>
        </Grid>
        <hr style={{ marginTop: '20px', opacity: 0.7 }} />
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          Files
        </Typography>

        <Grid container spacing={4}>
          {assignmentDetails?.files?.length > 0 &&
            assignmentDetails.files.map((file, idx) => {
              return (
                <Grid item sx={{ width: 'max-content' }}>
                  <Card>
                    <Button href={file} target={'_blank'}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <Iconify icon={'akar-icons:file'} sx={{ fontSize: '35px', marginRight: '10px' }} />
                        <div>{'File ' + (idx + 1)}</div>
                      </CardContent>
                    </Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}

export default AssignmentDetails;
