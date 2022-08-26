import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
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

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage("en")
  }, [])

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
            title={<Trans i18nKey="studentDashboard.studentEventTimeline">
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
