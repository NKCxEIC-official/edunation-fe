import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './utils/firebaseConfig';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { updateDatainDBAction } from './store/actions/AuthActions';

// ----------------------------------------------------------------------

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;
    console.log(user);
    if (user && 'uid' in user) {
      const d = new Date();
      const month = d.getMonth();

      interval = setInterval(() => {
        const timeSpent = ('timeSpent' in user && user.timeSpent?.length === 12) ? [...user.timeSpent] : [0,0,0,0,0,0,0,0,0,0,0,0];

        timeSpent[month] += 10;

        const userRef = doc(db, 'users', user.uid);

        updateDoc(userRef, {
          timeSpent
        });
      }, 10 * 60 * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [user]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
