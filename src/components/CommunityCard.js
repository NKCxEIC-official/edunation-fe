import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import Iconify from './Iconify';

function CommunityCard({
  name = 'Aritra Banerjee',
  role = 'Student',
  count = 10,
  postId = 'abcd',
  images = [
    'https://images.unsplash.com/photo-1624711517157-25991163e537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHw%3D&w=1000&q=80',
    'https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png',
  ],
}) {
  const copyCardLink = () => {
    const URL = `${window.location.href}#${postId}`;
    navigator.clipboard.writeText(URL);
  };

  return (
    <Card id={postId} className="communityCard" lg={12} xl={12} sx={{ mt: 3 }}>
      <CardContent className="communityCard_cardContent">
        <Grid container>
          <Grid className="communityCard_details" lg={12} xl={12} item>
            <Box className="communityCard_profile" sx={{ backgroundColor: 'danger.lighter' }}>
              <div className="communityCard_profilePicture">
                <img
                  width="100%"
                  height="100%"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt=""
                />
              </div>
              <div className="communityCard_profileDetails">
                <Typography variant="h6">{name}</Typography>
                <Typography variant="subtitle2">{role}</Typography>
              </div>
            </Box>
            <div className="communityCard_content">
              <Typography variant="p" sx={{ opacity: 0.5 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>

              <div className="communityCard_image">
                {images &&
                  images.length > 0 &&
                  images.map((imageLink) => (
                    <a href={imageLink} target="_blank" rel="noreferrer">
                      <img src={imageLink} alt="" />
                    </a>
                  ))}
              </div>
            </div>

            <div className="communityCard_actions">
              <span className="communityCard_actions_span">
                <span className="communityCard_actions_count">{count}</span>
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CommunityCard;
