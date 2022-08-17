import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import TeacherDashboardNavbar from './DashboardNavbar';
import TeacherDashboardSidebar from './DashboardSidebar';
import TeacherDashboardRightSidebar from './DashboardRightSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  // width: '5%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  // width: '50%',
  alignContent: 'center',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function TeacherDashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <TeacherDashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <TeacherDashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      {/* <DashboardRightSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}
      <MainStyle>

        <Outlet />
      </MainStyle>
      {/* <TeacherDashboardRightSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}

    </RootStyle>
  );
}
