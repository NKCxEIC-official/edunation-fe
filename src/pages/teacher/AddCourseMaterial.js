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
  courseMaterialDescription: '',
  courseMaterialFiles: [],
};

export default function AddCourseMaterial({ classId }) {
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

  const getContentType = (type) => {
    if (type.match(/image/g)) {
      return 'image';
    } else {
      return 'pdf';
    }
  };

  const uploadMultipleFiles = () => {
    const courseMaterialFilesArr = [];
    return new Promise((resolve, reject) => {
      Object.values(formData.courseMaterialFiles)?.length > 0 &&
        Object.values(formData.courseMaterialFiles).forEach((file, idx) => {
          const fileRef = ref(storage, `courseMaterials/${formData.title}/${file.name}`);
          uploadBytes(fileRef, file)
            .then((snapshot) => {
              getDownloadURL(fileRef)
                .then((url) => {
                  courseMaterialFilesArr.push({
                    link: url,
                    type: getContentType(file?.type),
                  });
                  if (courseMaterialFilesArr.length === formData.courseMaterialFiles?.length)
                    resolve(courseMaterialFilesArr);
                })
                .catch((err) => {
                  reject('Something went wrong, please try again.');
                });
            })
            .catch((err) => {
              reject('Something went wrong, please try again.');
            });
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
          courseMaterial: arrayUnion({
            title: formData.title,
            courseMaterialDescription: formData.courseMaterialDescription,
            courseMaterialFiles: urlArray,
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
    <div className="addCourseMaterialFiles">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add new course materials
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ marginTop: '20px' }}>
          <TextField
            id="title"
            key="title"
            onChange={(e) => handleFieldValue('title', e)}
            label="Title"
            placeholder="Enter course material title"
            value={formData?.title}
          />
          <TextField
            id="courseMaterialDescription"
            key="courseMaterialDescription"
            onChange={(e) => handleFieldValue('courseMaterialDescription', e)}
            label="Description"
            placeholder="Enter course material description"
            multiline
            value={formData?.courseMaterialDescription}
          />
          <FormControl variant="outlined" required>
            <Button variant="contained" component="label" color="info">
              {formData.courseMaterialFiles.length > 0
                ? `${formData.courseMaterialFiles.length} File${
                    formData.courseMaterialFiles.length > 1 ? 's' : ''
                  } Uploaded`
                : 'Upload Files'}
              <input
                type="file"
                hidden
                multiple
                accept="image/*, application/pdf"
                onChange={(e) => {
                  handleFileUpload('courseMaterialFiles', e);
                }}
              />
            </Button>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size="25px" /> : 'Add Course Material'}
          </Button>
        </Stack>
      </form>
    </div>
  );
}
