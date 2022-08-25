/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Stack, FormControl, CircularProgress } from '@mui/material';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../utils/firebaseConfig';
import { getDatafromDBAction } from '../../store/actions/AuthActions';

const getCurrentDateTime = () => {
  const currentDateObj = new Date();
  let dateTimeString = `${currentDateObj.getFullYear()}-${formatMonth(
    currentDateObj.getMonth()
  )}-${currentDateObj.getDate()}T${currentDateObj.getHours()}:${formatMinutes(currentDateObj.getMinutes())}`;
  return dateTimeString;
};

const formatMonth = (month) => {
  if (month < 10) {
    return `0${month}`;
  } else return month;
};

const formatMinutes = (minutes) => {
  if (minutes < 10) {
    return `0${minutes}`;
  } else return minutes;
};

const INITIAL_SCHEMA = {
  title: '',
  assignmentDescription: '',
  submissionDeadline: getCurrentDateTime(),
  assignmentFiles: [],
};

export default function AddAssignment({ classId }) {
  const [formData, updateFormData] = useState(INITIAL_SCHEMA);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleFieldValue = (key, e) => {
    updateFormData({ ...formData, [key]: e.target.value });
  };

  const handleFileUpload = (key, e) => {
    updateFormData({ ...formData, [key]: e.target.files });
  };

  const handleDateField = (key, e) => {
    updateFormData({ ...formData, [key]: e.target.value });
  };

  const uploadMultipleFiles = () => {
    const assignmentFilesArr = [];
    return new Promise((resolve, reject) => {
      Object.values(formData.assignmentFiles)?.length > 0 &&
        Object.values(formData.assignmentFiles).forEach((file, idx) => {
          const fileRef = ref(storage, `assignmentFiles/${formData.title}/${file.name}`);
          uploadBytes(fileRef, file)
            .then((snapshot) => {
              getDownloadURL(fileRef)
                .then((url) => {
                  assignmentFilesArr.push(url);
                  if (assignmentFilesArr.length === formData.assignmentFiles?.length) resolve(assignmentFilesArr);
                })
                .catch((err) => reject('Something went wrong, please try again.'));
            })
            .catch((err) => reject('Something went wrong, please try again.'));
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(db, 'classes', classId);
    uploadMultipleFiles()
      .then((urlArray) => {
        updateDoc(docRef, {
          assignments: arrayUnion({
            title: formData.title,
            assignmentDescription: formData.assignmentDescription,
            submissionDeadline: new Date(formData.submissionDeadline).toUTCString(),
            files: urlArray,
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
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="addAssignment">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add new assignment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            id="title"
            key="title"
            onChange={(e) => handleFieldValue('title', e)}
            label="Title"
            placeholder="Enter the assignment title"
            value={formData?.title}
            required
          />
          <TextField
            id="assignmentDescription"
            key="assignmentDescription"
            onChange={(e) => handleFieldValue('assignmentDescription', e)}
            label="Description"
            placeholder="Enter assignment description"
            multiline
            value={formData?.assignmentDescription}
            required
          />
          <TextField
            id="submissionDeadline"
            label="Submission Deadline"
            type="datetime-local"
            key="submissionDeadline"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
                min: getCurrentDateTime()
            }}
            onChange={(e) => handleDateField('submissionDeadline', e)}
            value={formData?.submissionDeadline}
            required
          />
          <FormControl variant="outlined" required>
            <Button variant="contained" component="label" color="info">
              {formData.assignmentFiles.length > 0
                ? `${formData.assignmentFiles.length} File${formData.assignmentFiles.length > 0 ? 's' : ''} Uploaded`
                : 'Upload Files'}
              <input
                type="file"
                hidden
                multiple
                accept="image/png, image/gif, image/jpeg, application/pdf"
                onChange={(e) => {
                  handleFileUpload('assignmentFiles', e);
                }}
                required
              />
            </Button>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size="25px" /> : 'Add Assignment'}
          </Button>
        </Stack>
      </form>
    </div>
  );
}
