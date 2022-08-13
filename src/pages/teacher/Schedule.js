import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from "../../components/Page";
import Iconify from '../../components/Iconify';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';
// mock
// import POSTS from '../../_mock/blog';
import CustomModal from '../../components/CustomModal';
import CreateAClass from './CreateAClass';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Schedule() {
    return (
        <Page title="Dashboard: Schedule">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Schedule
                    </Typography>
                    <CustomModal btnText={'Schedule'} component={<CreateAClass />} icon="eva:plus-fill" />


                </Stack>

                {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <BlogPostsSearch posts={POSTS} />
                    <BlogPostsSort options={SORT_OPTIONS} />
                </Stack> */}

                {/* <Grid container spacing={3}>
                    {POSTS.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                </Grid> */}
            </Container>
        </Page>
    );
}
