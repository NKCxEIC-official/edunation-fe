import Lottie from 'react-lottie';
import animation from '../assets/load-animation.json';

// ----------------------------------------------------------------------

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
      <Lottie options={defaultOptions} />
    </div>
  );
}
