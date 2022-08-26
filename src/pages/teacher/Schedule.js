import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Scheduler from '../../components/Scheduler';
import Page from "../../components/Page";
import Iconify from '../../components/Iconify';
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
          </Stack>
          <Scheduler />
        </Container>
      </Page>
    );
}
