/* eslint-disable */
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import account from '../../_mock/account';
import { logoutAction } from '../../store/actions/AuthActions';

// ----------------------------------------------------------------------

const getRole = (user) => {
  if(user) {
    return user.role === 1 && user.isTeacher === false
    ? 'student'
    : user.role === 1 && user.isTeacher === true
    ? 'teacher'
    : 'ngo';
  }
}

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logout = () => {
    console.log('logouts');
    dispatch(logoutAction(navigate));
  };

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      linkTo: `/dashboard/${getRole(user)}/app`,
    },
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      linkTo: `/dashboard/${getRole(user)}/profile`,
    },
    {
      label: 'Settings',
      icon: 'eva:settings-2-fill',
      linkTo: `/dashboard/${getRole(user)}/settings`,
    },
  ];

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user?.dp} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }} onClick={logout}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
