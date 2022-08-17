/* eslint-disable */
import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoMessages from './ChatComponent/NoMessages';
import ShowChat from './ChatComponent/ShowChat';
import ShowContacts from './ChatComponent/ShowContacts';
import './ChatComponent/ChatComponent.css';
import { db, realtimeDb } from 'src/utils/firebaseConfig';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

const ChatApp = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      user.role === 1 && user.isTeacher === false
        ? setCurrentRole('student')
        : user.role === 1 && user.isTeacher === true
        ? setCurrentRole('teacher')
        : setCurrentRole('ngo');
    }
  }, [user]);

  useEffect(() => {
    if (currentRole === 'student') {
      fetchTeachers();
    } else if (currentRole === 'teacher') {
      fetchStudents();
    }
  }, [currentRole]);

  useEffect(() => {
    if (selectedContact) {
      let STUDENT_UID, TEACHER_UID;
      if (currentRole === 'student') {
        STUDENT_UID = user.uid;
        TEACHER_UID = selectedContact.uid;
      } else if (currentRole === 'teacher') {
        STUDENT_UID = selectedContact.uid;
        TEACHER_UID = user.uid;
      }

      fetchChatMessages(STUDENT_UID, TEACHER_UID);
    }
  }, [selectedContact, currentRole]);

  const fetchTeachers = () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('isTeacher', '==', true));
    getDocs(q).then((querySnapshot) => {
      let teachersArr = [];
      querySnapshot.forEach((doc) => {
        teachersArr.push({ uid: doc.id, ...doc.data() });
      });
      setContacts(teachersArr);
    });
  };

  const fetchStudents = () => {
    const currentUserRef = doc(db, 'users', user.uid);
    try {
      return onSnapshot(currentUserRef, (querySnapshot) => {
        let studentsArr = [];
        if (querySnapshot.exists()) {
          const data = querySnapshot.data();
          if (data?.studentsMessageArr) {
            studentsArr = data.studentsMessageArr;
          }
        }

        if (studentsArr.length > 0) {
          const studentContacts = [];
          studentsArr.forEach((studentId, idx) => {
            const studentDocRef = doc(db, 'users', studentId);
            getDoc(studentDocRef)
              .then((res) => {
                if (res.exists()) {
                  const studentData = res.data();
                  studentContacts.push(studentData);
                  if (idx === studentsArr?.length - 1) {
                    setContacts(studentContacts);
                  }
                }
              })
              .catch((err) => {
                console.warn('Caught error: ', err);
              });
          });
        } else setContacts([]);
      });
    } catch (err) {
      console.warn('Caught error: ', err);
    }
  };

  const fetchChatMessages = (studentId, teacherId) => {
    const documentId = `chatApplication/groups/${studentId}-${teacherId}`;

    const documentRef = ref(realtimeDb, documentId);
    return onValue(documentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messagesArr = data?.messages || [];
        setMessages(messagesArr);
      } else {
        setMessages([]);
      }
    });
  };

  return (
    <Grid container className="chatApp" spacing={1}>
      {contacts?.length > 0 && (
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3} className="chatApp_contactsSection">
          <Typography variant="h6">Chats</Typography>
          <ShowContacts contacts={contacts} selectContact={setSelectedContact} activeContact={selectedContact} />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={8} lg xl className="chatApp_chatsSection">
        {selectedContact ? (
          <ShowChat messages={messages} selectedContact={selectedContact} />
        ) : (
          <NoMessages isContactsAvailable={contacts?.length > 0} />
        )}
      </Grid>
    </Grid>
  );
};

export default ChatApp;
