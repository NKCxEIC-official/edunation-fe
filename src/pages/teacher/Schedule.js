import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Scheduler from '../../components/Scheduler';
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
        <Container disableGutters="false" maxWidth='lg' >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Schedule
            </Typography>
            {/* <CustomModal btnText={'Schedule'} component={<CreateAClass />} icon="eva:plus-fill" /> */}
          </Stack>
          <Scheduler />
        </Container>
      </Page>
    );
}
