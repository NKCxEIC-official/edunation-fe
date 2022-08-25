/* eslint-disable */
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Iconify from '../components/Iconify';
import { getDatafromDBAction } from '../store/actions/AuthActions';

function CourseMaterialDetails() {
  const { id, fileId } = useParams();
  const [courseMaterialDetails, setCourseMaterialDetails] = useState({});
  const { title, courseMaterialDescription, courseMaterialFiles } = courseMaterialDetails;
  const { user, data } = useSelector((state) => {
    return {
      user: state.auth.user,
      data: state.auth.data,
    };
  });
  const { classes } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDatafromDBAction('classes', true, 'classes'));
  }, []);

  useEffect(() => {
    if (
      Object.keys(classes).includes(id) &&
      classes[id]?.courseMaterial?.length > 0 &&
      classes[id].courseMaterial.length >= parseInt(fileId) + 1
    ) {
      setCourseMaterialDetails(classes[id].courseMaterial[fileId]);
    }
  }, [id, fileId, classes]);

  return (
    <div>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
          Course materials for {title}:
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, mt: 5 }}>
          Description
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.7, fontWeight: '400', mb: 5, fontSize: '16px !important' }}>
          {courseMaterialDescription}
        </Typography>

        <Grid container spacing={4}>
          {courseMaterialFiles?.length > 0 &&
            courseMaterialFiles.map((file, idx) => {
              return (
                <Grid item sx={{ width: 'max-content' }}>
                  <Card>
                    <Button href={file?.link} target={'_blank'}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <Iconify icon={file?.type === 'image' ? 'ant-design:file-image-outlined' : 'ant-design:file-pdf-outlined'} sx={{ fontSize: '35px', marginRight: '10px' }} />
                        <div>{'File ' + (idx + 1)}</div>
                      </CardContent>
                    </Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}

export default CourseMaterialDetails;
