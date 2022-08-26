import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideModalAction } from '../store/actions/AuthActions';
import { postCommunityAnswer } from '../services/AuthService';

function AnswerCommunity({ id }) {
  const [answer, setAnswer] = useState();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function postAnswer(e) {
    e.preventDefault();
    postCommunityAnswer(id, {
      name: user.firstName + user.lastName,
      answer,
      isTeacher: user.isTeacher
    });
    dispatch(HideModalAction(true));
  }

  return (
    <form onSubmit={postAnswer}>
      <Stack spacing={2}>
        <TextField fullWidth onChange={(e) => setAnswer(e.target.value)} label="Answer" multiline rows={4} />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={auth.showLoading}>
          Add answer
        </LoadingButton>
      </Stack>
    </form>
  );
}

export default AnswerCommunity;
