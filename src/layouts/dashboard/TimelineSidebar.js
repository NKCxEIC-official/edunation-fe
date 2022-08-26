import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
// material
import { styled } from '@mui/material/styles';
import { Drawer, Grid, Stack } from '@mui/material';
import { faker } from '@faker-js/faker';
import DatePicker from 'sassy-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getClassEvents, getTeachingClasses } from '../../services/AuthService';

import { AppOrderTimeline } from '../../sections/@dashboard/app';

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Scrollbar from '../../components/Scrollbar';
import { events } from '../../_mock/event';

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

const onChange = (date, data) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const currentDate = `${yyyy}-${mm}-${dd}`;
  if (date !== undefined) {
    console.log(String(date.getDate()).padStart(2, '0'));
    filterEventsByDate(data, today);
  }
};
// ----------------------------------------------------------------------
const filterEventsByDate = (data, date) => {
  const filteredEventList = data?.map((event) => {
    let newEvent;
    console.log(
      '🚀 ~ file: TimelineSidebar.js ~ line 49 ~ filteredEventList ~ event.startDate',
      String(event.startDate.getDate()).padStart(2, '0')
    );
    if (String(event.startDate.getDate()).padStart(2, '0') === String(date.getDate()).padStart(2, '0')) {
      newEvent = event;
    }
    return newEvent;
  });
  console.log('🚀 ~ file: TimelineSidebar.js ~ line 52 ~ filteredEventList ~ filteredEventList', filteredEventList);
};
TimelineSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function TimelineSidebar({ isOpenSidebar, onCloseSidebar }) {
  const [data, setData] = React.useState([]);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isDesktop = useResponsive('up', 'lg');

  const { t, i18n } = useTranslation();


  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const eventList = [];

    getTeachingClasses(user.uid).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc, idx) => {
        const course = doc.data();

        getClassEvents(doc.id).then((queryEventSnapshot) => {
          queryEventSnapshot.docs.forEach((dock, idy) => {
            eventList.push({
              ...dock.data(),
              startDate: new Date(dock.data().startDate.seconds * 1000),
              endDate: new Date(dock.data().endDate.seconds * 1000),
            });

            if (idy === queryEventSnapshot.docs.length - 1) {
              console.log('all events', eventList);
              setData(eventList);
            }
          });
        });
      });
    });
  }, []);

  const renderContent = (
    <Scrollbar>
      <Grid sx={{ mt: isDesktop ? 12 : 2 }} item xs={12} md={6} lg={4}>
        <Stack spacing={3}>
          <DatePicker
            onChange={(date) => {
              onChange(date, data);
            }}
            style={{ marginLeft: isDesktop ? '10px' : ' 10px' }}
          />
          <AppOrderTimeline
            title={<Trans i18nKey="studentEventTimeline">
              Event Timeline
          </Trans>}
            list={events}
            style={{ marginRight: isDesktop ? '12px' : '10px', marginLeft: '10px', marginBottom: '20px' }}
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
