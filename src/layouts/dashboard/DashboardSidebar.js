/* eslint-disable */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Tooltip } from '@mui/material';
// mock
import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import { RedSpotNavConfig, NGONavConfig, StudentNavConfig, TeacherNavConfig } from './NavConfig';
import { useSelector } from 'react-redux';
import VerifiedBadge from '../../components/SVGIcons/VerifiedBadge';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({


  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

// eslint-disable-next-line consistent-return
const getNavByRole = () => {
  let role = 0;
  let isTeacher = false;
  let isAdmin = false;
  role = localStorage.getItem('role');
  isTeacher = localStorage.getItem('isTeacher');
  if (role === '2') {
    return RedSpotNavConfig;
  }
  if (role === '1' && isTeacher === 'true') {
    return TeacherNavConfig;
  }
  if (role === '1' && isTeacher === 'false') {
    return StudentNavConfig;
  }
  if (role === '0') {
    return NGONavConfig;
  }
};

// eslint-disable-next-line consistent-return
const utilButton = (navigate) => {
  const role = localStorage.getItem('role');
  const isTeacher = localStorage.getItem('isTeacher');
  if (role === '0') {
    return (
      <Button
        target="_blank"
        variant="contained"
        color="danger"
        onClick={
          // navigate to be a :
          () => {
            navigate('/dashboard/ngo/redSpot', { replace: true });
          }
        }
      >
        Add Red Spots
      </Button>
    );
  }
  if(role === '2') {
    return (
      <Button
        target="_blank"
        variant="contained"
        color="danger"
        onClick={
          // navigate to be a :
          () => {
            navigate('/dashboard/ngo/redSpot', { replace: true });
          }
        }
      >
        Add Red Spots
      </Button>
    );
  }
  if (role === '1' && isTeacher === 'true') {
    return (
      <Button
        target="_blank"
        variant="contained"
        color="primary"
        onClick={
          // navigate to be a :
          () => {
            localStorage.setItem('viewAs', 'false');
            navigate('/dashboard/student/app', { replace: true });
          }
        }
      >
        Student Dashboard
      </Button>
    );
  }
  if (role === '1' && isTeacher === 'false') {
    return (
      <Button
        target="_blank"
        variant="contained"
        color="warning"
        onClick={
          // navigate to be a :
          () => {
            navigate('/exam/student/examInfo', { replace: true });
          }
        }
      >
        Be A Teacher
      </Button>
    );
  }
};
export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const getRole = () => {
    if(user) {
      return user.role === 1 && user.isTeacher === false
      ? 'Student'
      : user.role === 1 && user.isTeacher === true
      ? 'Teacher'
      : 'NGO';
    }
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={user.dp} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
                {`${user.firstName} ${user.lastName}`} {user?.isTeacher && (
                    <Tooltip title="This badge signifies certified, and evaluated experts" disableFocusListener>
                      <VerifiedBadge className="verifiedBadge" />
                    </Tooltip>
                  )}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {getRole()}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={getNavByRole()} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/static/illustrations/building.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Let's Help others !
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              It's always better to learn together
            </Typography>
          </Box>
          {utilButton(navigate)}
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
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
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
