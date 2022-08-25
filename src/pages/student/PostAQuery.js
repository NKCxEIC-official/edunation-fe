/* eslint-disable */

import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button, useFormControl, Stack, Input } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addDocumentInDb } from '../../services/AuthService';
import { storage } from '../../utils/firebaseConfig';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { HideModalAction } from '../../store/actions/AuthActions';

export default function PostAQuery() {
  const user = useSelector((state) => state.auth.user);
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      description,
      downvote: 0,
      dp: user.dp,
      firstName: user.firstName,
      lastName: user.lastName,
      isTeacher: false,
      upvote: 0,
      attachment: [],
      createdAt: new Date().toUTCString(),
      upvotedBy: [],
      downvotedBy: [],
    };

    if (attachments && attachments.length > 0) {
      attachments.forEach((attachment, index) => {
        const attachmentsRef = ref(storage, `communityPost/${attachment.name}`);
        uploadBytes(attachmentsRef, attachment).then((snapshot) => {
          getDownloadURL(attachmentsRef).then((url) => {
            payload.attachment.push(url);
            if (index === attachments.length - 1) {
              addDocumentInDb(payload, 'community');
              dispatch(HideModalAction(true));
            }
          });
        });
      });
    }

    // setTimeout(()=>dispatch(getDatafromDBAction('community', true, 'community'))),
  }

  function handleFileSelect(e) {
    if (event.target.files.length > 0) {
      const preSelectedFiles = [...attachments];
      preSelectedFiles.push(e.target.files[0]);
      setAttachments(preSelectedFiles);
    }
  }

  return (
    <div className="Create a class">
      <Typography variant="h4">Post a Query</Typography>

      <Form onSubmit={handleSubmit}>
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
            <input type="file" hidden accept="image/png, image/gif, image/jpeg" onChange={handleFileSelect} />
          </Button>
          {attachments.length > 0 && attachments.map((attachment) => <h6>{attachment.name}</h6>)}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Post Query
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
