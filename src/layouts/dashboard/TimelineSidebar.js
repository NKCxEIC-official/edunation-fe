import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
import { getDatafromDBAction } from '../../store/actions/AuthActions';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
    marginTop: 120,
    zIndex: 1,
  },
}));
// ----------------------------------------------------------------------

TimelineSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function TimelineSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [selectedDate, updateSelectedDate] = useState(null);
  const [eventsArr, setEventsArr] = useState([]);
  const dispatch = useDispatch();
  const { user, data } = useSelector((state) => {
    return {
      user: state.auth.user,
      data: state.auth.data
    }
  });

  const { events } = data;

  const onChange = (date) => {
    const optedDate = new Date(date).toUTCString();
    updateSelectedDate(optedDate);
  };

  useEffect(() => {
    dispatch(getDatafromDBAction('events', true, 'events'));
  }, [])

  useEffect(() => {
    const eventsLocalArr = [];
    Object.keys(events || {}).forEach((eventId) => {
      eventsLocalArr.push(events[eventId]);
    });
    console.log(eventsLocalArr, events)
    setEventsArr(eventsLocalArr);
  }, [events])

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar>
      <Grid sx={{ mt: isDesktop ? 12 : 2 }} item xs={12} md={6} lg={4}>
        <Stack spacing={3}>
          <DatePicker onChange={onChange} style={{ marginLeft: isDesktop ? '10px' : ' 10px' }} />
          <AppOrderTimeline
            title="Event Timeline"
            list={eventsArr}
            style={{ marginRight: isDesktop ? '12px' : '10px', marginLeft: '10px', marginBottom: '20px' }}
            date={selectedDate}
          />
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
