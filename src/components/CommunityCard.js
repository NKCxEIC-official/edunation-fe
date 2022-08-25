import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { communityDownvote, communityUpvote } from '../services/AuthService';
import AnswerCommunity from './AnswerCommunity';
import CustomModal from './CustomModal';
import { getDatafromDBAction } from '../store/actions/AuthActions';
import Iconify from './Iconify';

function CommunityCard({ community, key, id }) {
  const {
    attachment,
    description,
    downvote,
    dp,
    firstName,
    isTeacher,
    lastName,
    upvote,
    upvotedBy,
    downvotedBy,
    answers,
  } = community;
  const user = useSelector((state) => state.auth.user);

  const copyCardLink = () => {
    const URL = `${window.location.href}#${id}`;
    navigator.clipboard.writeText(URL);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatafromDBAction('community', true, 'community'));
  }, []);

  // const { community } = useSelector((state) => state.auth.data);

  return (
    <Card id={id} className="communityCard" lg={12} xl={12} sx={{ mt: 3 }}>
      <CardContent className="communityCard_cardContent">
        <Box className="communityCard_profile" sx={{ backgroundColor: 'danger.lighter' }}>
          <div className="communityCard_profilePicture">
            <img
              width="100%"
              height="100%"
              src={dp || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
              alt=""
            />
          </div>
          <div className="communityCard_profileDetails">
            <Typography variant="h6">
              {firstName} {lastName}
            </Typography>
            <Typography variant="subtitle2">{isTeacher ? 'Teacher' : 'Student'}</Typography>
          </div>
        </Box>
        <div className="communityCard_content">
          <Typography variant="p" sx={{ opacity: 0.5 }}>
            {description}
          </Typography>

          <div className="communityCard_image">
            {attachment &&
              attachment.length > 0 &&
              attachment.map((imageLink) => (
                <a href={imageLink} target="_blank" rel="noreferrer">
                  <img src={imageLink} alt="" />
                </a>
              ))}
          </div>
        </div>
        {answers && answers.length > 0 && (
          <Box sx={{ borderTop: '1px dashed #A4A8AC', pt: 2, opacity: 0.7, pl: 2 }}>
            {answers.map((answer) => (
              <h4>
                {answer.answer} ~ <span style={{ fontWeight: '300', fontSize: '12px' }}>{answer.name}</span>
              </h4>
            ))}
          </Box>
        )}
        <div className="communityCard_actions">
          <span className="communityCard_actions_span">
            <span className="communityCard_actions_count">{upvote}</span>

            <Button
              sx={{ height: '30px', borderRadius: '10px' }}
              onClick={() => communityUpvote(id, user.uid, downvotedBy)}
              disabled={upvotedBy.includes(user.uid)}
            >
              <Iconify icon={'akar-icons:arrow-up'} />
              &nbsp; Upvote
            </Button>
            <Button
              sx={{ height: '30px', borderRadius: '10px' }}
              onClick={() => communityDownvote(id, user.uid, upvotedBy)}
              disabled={downvotedBy.includes(user.uid)}
            >
              <Iconify icon={'akar-icons:arrow-down'} />
              &nbsp; Downvote
            </Button>
          </span>
          <Stack flexDirection=" row">
            <Button onClick={() => copyCardLink()} sx={{ height: '30px', borderRadius: '10px' }}>
              <Iconify icon={'akar-icons:copy'} />
              &nbsp; Copy Link
            </Button>

            <CustomModal
              component={<AnswerCommunity id={id} />}
              btnText={'Answer'}
              icon="ant-design:message-twotone"
              variant="text"
            />
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommunityCard;
