/** eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../utils/firebaseConfig';

const DAYS_MAPPER = [
  { name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Thursday' },
  { name: 'Friday' },
  { name: 'Saturday' },
  { name: 'Sunday' },
];

const INITIAL_SCHEMA = {
  name: '',
  classDescription: '',
  classFee: '',
  days: [],
  subject: '',
  bannerUrl: null,
};

export default function CreatAClass() {
  const [formData, updateFormData] = useState(INITIAL_SCHEMA);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleFieldValue = (key, e) => {
    updateFormData({ ...formData, [key]: e.target.value });
  };

  const handleFileUpload = (key, e) => {
    console.log(e);
    updateFormData({ ...formData, [key]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const collectionRef = collection(db, 'classes');
    const getBannerUrlRef = ref(storage, `images/${formData.bannerUrl.name}`);
    uploadBytes(getBannerUrlRef, formData.bannerUrl)
      .then((snapshot) => {
        getDownloadURL(getBannerUrlRef)
          .then((url) => {
            addDoc(collectionRef, {
              name: formData.name,
              classDescription: formData.classDescription,
              classFee: formData.classFee,
              subject: formData.subject,
              bannerUrl: url,
              days: formData.days.join(','),
              creator: {
                name: `${user.firstName} ${user.lastName}`,
                uid: user.uid,
                photoUrl: user.dp
              },
              courseMaterial: [],
              createdAt: new Date().toUTCString(),
              studentList: [],
              CourseMaterialCount: 0,
              videos: [],
              studentCount: 0,
            })
              .then((res) => {
                setLoading(false);
                updateFormData(INITIAL_SCHEMA);
              })
              .catch((err) => {
                setLoading(false);
              });
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  console.log(formData);
  return (
    <div className="Create a class">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Create a Class
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            id="name"
            key="name"
            onChange={(e) => handleFieldValue('name', e)}
            label="Class Name"
            placeholder="Enter class name"
          />
          <TextField
            id="classDescription"
            key="classDescription"
            onChange={(e) => handleFieldValue('classDescription', e)}
            label="Class Description"
            placeholder="Enter class description"
          />
          <TextField
            id="subject"
            key="subject"
            onChange={(e) => handleFieldValue('subject', e)}
            label="Subject"
            placeholder="Enter subject to teach"
          />
          <TextField
            id="classFee"
            key="classFee"
            onChange={(e) => handleFieldValue('classFee', e)}
            label="Class Fee"
            placeholder="Enter class fee (in INR)"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
          <FormControl variant="outlined" required>
            <InputLabel id="days">Days</InputLabel>
            <Select
              multiple
              value={formData.days}
              onChange={(e) => handleFieldValue('days', e)}
              renderValue={(selected) => selected.join(', ')}
              labelId="days"
              label="Days"
            >
              {DAYS_MAPPER.map((day) => {
                return (
                  <MenuItem key={day.name} value={day.name}>
                    <Checkbox checked={formData.days.indexOf(day.name) > -1} />
                    <ListItemText primary={day.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl variant="outlined" required>
            <Button variant="contained" component="label" color="info">
              {formData.bannerUrl ? 'File Uploaded' : 'Upload Banner'}
              <input
                type="file"
                hidden
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  handleFileUpload('bannerUrl', e);
                }}
              />
            </Button>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size='25px' /> : 'Create Class'}
          </Button>
        </Stack>
      </form>
    </div>
  );
}
