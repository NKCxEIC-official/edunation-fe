/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Stack, FormControl, CircularProgress } from '@mui/material';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../utils/firebaseConfig';
import { getDatafromDBAction } from '../../store/actions/AuthActions';

const INITIAL_SCHEMA = {
  title: '',
  link: '',
  subtitle: '',
};

export default function AddVidyaDaanLink({ classId }) {
  const [formData, updateFormData] = useState(INITIAL_SCHEMA);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleFieldValue = (key, e) => {
    updateFormData({ ...formData, [key]: e.target.value });
  };

  const verifyVidyaDaanLink = (link) => {
    return (link.match(/vidyadaan\.net/g) || link.match(/diksha\.gov\.in/g)) ? true : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(db, 'classes', classId);
    updateDoc(docRef, {
      vidyaDaanResources: arrayUnion({
        title: formData.title,
        subtitle: formData.subtitle,
        link: formData.link,
      }),
    })
      .then(() => {
        setLoading(false);
        updateFormData(INITIAL_SCHEMA);
        dispatch(getDatafromDBAction('classes', true, 'classes'));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="addVidyaDaanLink">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add new resource link
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ marginTop: '20px' }}>
          <TextField
            id="title"
            key="title"
            onChange={(e) => handleFieldValue('title', e)}
            label="Title"
            placeholder="Enter Title"
            value={formData?.title}
            required
          />
          <TextField
            id="subtitle"
            key="subtitle"
            onChange={(e) => handleFieldValue('subtitle', e)}
            label="Subtitle"
            placeholder="Enter Subtitle"
            value={formData?.subtitle}
          />
          <TextField
            id="link"
            key="link"
            onChange={(e) => handleFieldValue('link', e)}
            label="Link"
            placeholder="Enter link"
            value={formData?.link}
            required
            error={!verifyVidyaDaanLink(formData?.link)}
            helperText={!verifyVidyaDaanLink(formData?.link) ? 'Invalid VidyaDaan/Diksha Resource Link' : false}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size="25px" /> : 'Add VidyaDaan/Diksha Resource'}
          </Button>
        </Stack>
      </form>
    </div>
  );
}
