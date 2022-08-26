/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { child, getDatabase, onChildChanged, onValue, query, ref, set, update } from 'firebase/database';import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Container, Grid, Stack } from '@mui/material';
import PostAQuery from './student/PostAQuery';
import CommunityCard from '../components/CommunityCard';
import CustomModal from '../components/CustomModal';
import { getDatafromDBAction } from '../store/actions/AuthActions';
import VideoCall from '../components/VideoCall';
import { realtimeDb } from '../utils/firebaseConfig';

export default function Community() {
  const theme = useTheme();
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showCommunityPosts, setShowCommunityPosts] = useState(true);
  const [liveDoubtClearingSessions, setLiveDoubtClearingSessions] = useState([]);
  const [showVideoCallStudent, setShowVideoCallStudent] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState(null);
  // const [allUserList, setAllUserList] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const { community, userListAll } = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(getDatafromDBAction('community', true, 'community'));
    dispatch(getDatafromDBAction('users', true, 'userListAll'));
  }, []);

  useEffect(() => {
    if (!user.isTeacher && user.role === 1) fetchCommunityLiveSessions();
  }, [user]);

  // useEffect(() => {
  //   const userAllArr = [];
  //   Object.keys(userListAll || {}).forEach(userId => {
  //     userAllArr.push(userListAll[userId]);
  //   })
  //   setAllUserList(userAllArr);
  // }, [userListAll]);

  const fetchCommunityLiveSessions = () => {
    const documentRef = ref(realtimeDb);
    return onValue(child(documentRef, `liveClass`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const filteredSessions = Object.keys(data).forEach((obj) => {
          console.log(data[obj])
          return data[obj]?.isLive === true;
        });
        setLiveDoubtClearingSessions(filteredSessions);
      } else {
        setLiveDoubtClearingSessions([]);
      }
    });
  };

  const initiateVideoCall = () => {
    set(ref(realtimeDb, `liveClass/${user.uid}`), {
      roomName: user.uid,
      isLive: true,
      communitySession: true,
    });

    setShowVideoCall(true);
    setShowCommunityPosts(false);
  };

  const postUpdates = () => {
    const documentId = `liveClass/${user.uid}`;
    const updateObj = {
      isLive: false,
      roomName: user.uid,
      communitySession: true,
    };
    const updates = {};
    updates[`/${documentId}`] = updateObj;
    console.log(updates);
    update(ref(realtimeDb), updates).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Container maxWidth="s" className="hideScroll">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {!showVideoCall ? 'Welcome to Community!' : 'Community Doubt Clearing Session!'}
        </Typography>
        {!user?.isTeacher && (
          <CustomModal btnText={'Post A Query'} sx={{ mb: 4 }} component={<PostAQuery />} icon="eva:plus-fill" />
        )}
        {!showVideoCall && user?.isTeacher && (
          <Button variant="contained" onClick={initiateVideoCall}>
            Go Live!
          </Button>
        )}
        {user?.isTeacher && showVideoCall && !showCommunityPosts && (
          <Button variant="contained" onClick={() => setShowCommunityPosts(true)}>
            Show Community Posts
          </Button>
        )}
        {user?.isTeacher && showVideoCall && showCommunityPosts && (
          <Button variant="contained" onClick={() => setShowCommunityPosts(false)}>
            Hide Community Posts
          </Button>
        )}
      </Stack>

      <Grid spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {showVideoCall && (
            <Grid container direction="column" sx={{ alignItems: 'center' }}>
              <VideoCall roomName={user?.uid} />
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  postUpdates();
                  setShowVideoCall(false);
                  setShowCommunityPosts(true);
                }}
                sx={{ mt: 2, mr: 2, width: 'max-content' }}
              >
                End Session
              </Button>
            </Grid>
          )}

          {user?.role === 1 && !user?.isTeacher && Array.isArray(liveDoubtClearingSessions) && (
            <Grid spacing={3} sx={{ marginBottom: '16px' }}>
              <Typography variant="h5" sx={{ marginBottom: '16px' }}>
                Live Sessions from Experts :
              </Typography>
              {liveDoubtClearingSessions.length > 0 &&
                liveDoubtClearingSessions.map((sessionId) => {
                  const shouldParse = sessionId in userListAll;
                  console.log(shouldParse, sessionId, Object.keys(userListAll));
                  const currentUser = shouldParse ? userListAll[sessionId] : {};
                  const { dp, firstName, lastName } = currentUser;
                  console.log(userListAll[sessionId]);
                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginRight: '10px',
                        width: 'max-content',
                      }}
                      onClick={() => {
                        setShowVideoCallStudent(!showVideoCallStudent);
                        setActiveRoomId(sessionId);
                      }}
                    >
                      <span style={{ position: 'relative' }}>
                        <Avatar
                          variant="circular"
                          src={dp}
                          sx={{ height: '60px', width: '60px', marginBottom: '8px' }}
                        />
                        <div className="greenDot">&nbsp;</div>
                      </span>
                      <div>{`${firstName} ${lastName}`}</div>
                    </div>
                  );
                })}
            </Grid>
          )}

          {showVideoCallStudent && (
            <Grid container direction="column" sx={{ alignItems: 'center' }}>
              <VideoCall roomName={user?.uid} />
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setShowVideoCallStudent(false);
                  setActiveRoomId('');
                }}
                sx={{ mt: 2, mr: 2, width: 'max-content' }}
              >
                Leave Session
              </Button>
            </Grid>
          )}

          {showCommunityPosts && (
            <Typography variant="h5">Queries and Posts {user?.isTeacher ? 'to address' : ''} :</Typography>
          )}
          {showCommunityPosts &&
            Object.keys(community || {}).length > 0 &&
            Object.keys(community || {}).map((key, index) => (
              <CommunityCard key={index} community={community[key]} id={key} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}
