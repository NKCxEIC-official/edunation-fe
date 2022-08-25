import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import alanBtn from '@alan-ai/alan-sdk-web';

// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import TimelineSidebar from './TimelineSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [openTimeLine, setOpenTimeLine] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [alanBtnInstance, setAlanBtnInstance] = useState();

  useEffect(() => {
    setAlanBtnInstance(
      alanBtn({
        key: '21feb806301b6f192480786e63107b752e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          if (commandData.command === 'openClassRoom') {
            console.log(commandData);
          }
        },
      })
    );
  }, []);

  useEffect(() => {
    console.log(alanBtnInstance);

    if (alanBtnInstance) {
      alanBtnInstance.playText('Hi! I am Alan');
    }
  }, [alanBtnInstance]);
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} onOpenTimeLine={() => setOpenTimeLine(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
      {user.role === 1 && (
        <TimelineSidebar isOpenSidebar={openTimeLine} onCloseSidebar={() => setOpenTimeLine(false)} />
      )}
    </RootStyle>
  );
}
