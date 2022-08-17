import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Drawer, Grid, Stack } from '@mui/material';
import { faker } from '@faker-js/faker';
import DatePicker from 'sassy-datepicker';
import { AppOrderTimeline } from '../../sections/@dashboard/app';

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Scrollbar from '../../components/Scrollbar';
import {events} from '../../_mock/event';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
    marginTop: 120,
  },
}));

const onChange = (date) => {
  console.log(date.toString());
};
// ----------------------------------------------------------------------

TimelineSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function TimelineSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar>
      <Grid sx={{mt: 12}} item xs={12} md={6} lg={4}>
        <Stack spacing={3}>
          <DatePicker onChange={onChange} />
          <AppOrderTimeline title="Event Timeline" list={events} style={{marginRight:"20px"}} />
        </Stack>
      </Grid>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          anchor="right"
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          anchor="right"
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'transparent',
              borderLeftStyle: 'none',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
    // <RootStyle>{renderContent}</RootStyle>
  );
}
