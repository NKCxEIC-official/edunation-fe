import { Outlet } from 'react-router-dom';
// material
import Lottie from 'react-lottie';

import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import animation from '../assets/loading.json';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function LoadingAnimationLayout() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // here is where we will declare lottie animation
    // "animation" is what we imported before animationData: animation,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}
