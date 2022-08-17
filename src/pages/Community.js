import * as React from 'react';
import { useSelector } from 'react-redux';
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

export default function Community() {
    const theme = useTheme();

    const user = useSelector(state => state.auth.user)

    return (
        <Container maxWidth="s">

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Welcome to Community!
                </Typography>
                {!user?.isTeacher && <CustomModal btnText={'Post A Query'} sx={{ mb: 4 }} component={<PostAQuery />} icon="eva:plus-fill" />}
            </Stack>

            <Grid spacing={3} justifyContent="center">
                <Grid item xs={12} md={6} lg={8}>
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                    <CommunityCard />
                </Grid>
            </Grid>
        </Container>
    );
}
