import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import Iconify from './Iconify';

function CommunityCard({ community, key, id }) {
  const { attachment, description, downvote, dp, firstName, isTeacher, lastName, upvote } = community;

  const copyCardLink = () => {
    const URL = `${window.location.href}#${id}`;
    navigator.clipboard.writeText(URL);
  };

  return (
    <Card id={id} className="communityCard" lg={12} xl={12} sx={{ mt: 3 }}>
      <CardContent className="communityCard_cardContent">
        <Box className="communityCard_profile" sx={{ backgroundColor: 'danger.lighter' }}>
          <div className="communityCard_profilePicture">
            <img width="100%" height="100%" src={dp} alt="" />
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

        <div className="communityCard_actions">
          <span className="communityCard_actions_span">
            <span className="communityCard_actions_count">{upvote}</span>
            <Button sx={{ height: '30px', borderRadius: '10px' }}>
              <Iconify icon={'akar-icons:arrow-up'} />
              &nbsp; Upvote
            </Button>
            <Button sx={{ height: '30px', borderRadius: '10px' }}>
              <Iconify icon={'akar-icons:arrow-down'} />
              &nbsp; Downvote
            </Button>
          </span>
          <span>
            <Button onClick={() => copyCardLink()} sx={{ height: '30px', borderRadius: '10px' }}>
              <Iconify icon={'akar-icons:copy'} />
              &nbsp; Copy Link
            </Button>
            <Button sx={{ height: '30px', borderRadius: '10px' }}>
              <Iconify icon={'akar-icons:share-box'} />
              &nbsp; Share
            </Button>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommunityCard;
