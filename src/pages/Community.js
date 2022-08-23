import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container, Grid, Stack } from '@mui/material';
import PostAQuery from './student/PostAQuery';
import CommunityCard from '../components/CommunityCard';
import CustomModal from '../components/CustomModal';
import { getDatafromDBAction } from '../store/actions/AuthActions';

export default function Community() {
  const theme = useTheme();

  const user = useSelector((state) => state.auth.user);
  const { community } = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDatafromDBAction('community', true, 'community'));
  }, []);

  return (
    <Container maxWidth="s">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome to Community!
        </Typography>
        {!user?.isTeacher && (
          <CustomModal btnText={'Post A Query'} sx={{ mb: 4 }} component={<PostAQuery />} icon="eva:plus-fill" />
        )}
      </Stack>

      <Grid spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={8}>
          {Object.keys(community || {}).length > 0 &&
            Object.keys(community || {}).map((key, index) => (
              <CommunityCard key={index} community={community[key]} id={key} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}
