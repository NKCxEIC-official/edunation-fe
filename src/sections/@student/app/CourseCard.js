import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useRazorpay from 'react-razorpay';

// material
import { alpha, styled } from '@mui/material/styles';
import { useCallback } from 'react';

import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Button } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import {
  updateClassSubscriptionInClassroomAction,
  updateClassSubscriptionInProfileAction,
} from '../../../store/actions/AuthActions';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function CourseCard({ post, index, classKey }) {
  const {
    bannerUrl,
    classDescription,
    name,
    rating,
    creator,
    createdAt,
    studentList,
    courseMaterial,
    classCode,
    classFee,
  } = post;
  const latestPostLarge = false;
  const latestPost = false;

  const POST_INFO = [
    { number: studentList?.length, icon: 'ph:users-three-bold' },
    { number: courseMaterial?.length, icon: 'carbon:document-attachment' },
    { number: rating, icon: 'ant-design:star-twotone' },
  ];

  const user = useSelector((state) => state.auth.user);

  const Razorpay = useRazorpay();
  const dispatch = useDispatch();

  const handlePayment = useCallback(async () => {
    const options = {
      key: 'rzp_test_FbmqBgJEjWuT7Z',
      amount: classFee * 100,
      currency: 'INR',
      name,
      description: 'Payment for 1 month',
      image: '/static/logo.svg',
      handler: (res) => {
        dispatch(updateClassSubscriptionInClassroomAction(classKey, user.uid));
        dispatch(
          updateClassSubscriptionInProfileAction(user.uid, {
            classDp: bannerUrl,
            classId: classKey,
            courseName: name,
            author: creator.name,
          })
        );
      },
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#2d2b81',
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <AvatarStyle
            alt={creator?.name}
            src={creator?.photoUrl}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <CoverImgStyle alt={name} src={bannerUrl} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <TitleStyle
            to={`/dashboard/${user?.isTeacher ? 'teacher' : 'student'}/classroom/${classKey}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            {name}
          </TitleStyle>

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500',
                  }),
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>

          <Button sx={{ mt: 2 }} onClick={handlePayment}>
            Subscribe Now
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
