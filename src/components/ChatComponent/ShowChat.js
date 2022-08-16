/* eslint-disable */
import { Button, Grid, Typography } from '@mui/material';
import { onValue, ref, update } from 'firebase/database';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, realtimeDb } from 'src/utils/firebaseConfig';
import Iconify from '../Iconify';

const ShowChat = ({ selectedContact, messages = [] }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [chatContainerRef, setChatContainerRef] = useState(null);

  const sendMessage = () => {
    let STUDENT_UID, TEACHER_UID;
    if (user.role === 1 && !user.isTeacher) {
      STUDENT_UID = user.uid;
      TEACHER_UID = selectedContact.uid;
    } else {
      STUDENT_UID = selectedContact.uid;
      TEACHER_UID = user.uid;
    }

    const newMessageObj = {
      sentBy: user.uid,
      content: currentMessage,
      sentOn: new Date().toUTCString()
    };

    const documentId = `chatApplication/groups/${STUDENT_UID}-${TEACHER_UID}`;
    const documentRef = ref(realtimeDb, documentId);

    setCurrentMessage('');

    onValue(
      documentRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const messages = data?.messages;
          const updates = {};
          updates[`/${documentId}/messages/${messages.length}`] = newMessageObj;
          postUpdates(updates);
        } else {
          const updates = {};
          updates[`/${documentId}/messages/0`] = newMessageObj;
          postUpdates(updates);
          const teacherDocumentRef = doc(db, "users", TEACHER_UID);
          updateDoc(teacherDocumentRef, {
            studentsMessageArr: arrayUnion(STUDENT_UID)
          })
          
        }
      },
      { onlyOnce: true }
    );
  };

  const scrollToBottom = (element) => {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  };

  const postUpdates = (updates) => {
    update(ref(realtimeDb), updates)
      .then(() => {
        chatContainerRef && scrollToBottom(chatContainerRef);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
      setChatContainerRef(chatContainer);
    }
  }, []);

  return (
    <div className="chatApp_chatsSection_chat">
      <div className="chatApp_chatsSection_chat_contactDetails">
        <span>
          <img
            src={
              selectedContact?.dp
                ? selectedContact.dp
                : 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg'
            }
          />
        </span>
        <span>
          <Typography variant={'subtitle2'}>{`${selectedContact.firstName} ${selectedContact.lastName}`}</Typography>
        </span>
      </div>
      <div className="chatApp_chatsSection_chat_messagesSection" id="chatContainer">
        {messages?.length > 0 &&
          messages.map((message) => {
            return (
              <div
                className={`chatApp_chatsSection_chat_messagesSection_message${
                  message.sentBy === user.uid ? 'Owner' : 'Other'
                }`}
              >
                {message.content}
              </div>
            );
          })}
      </div>
      <form className="chatApp_chatsSection_chat_sendMessage">
        <input
          placeholder="Start typing something..."
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          className="chatApp_chatsSection_chat_sendMessage_inputArea"
        />
        <Button
          className="chatApp_chatsSection_chat_sendMessage_btn"
          onClick={() => sendMessage()}
          disabled={!currentMessage}
          type="submit"
        >
          <Iconify icon={'bxs:paper-plane'} />
        </Button>
      </form>
    </div>
  );
};

export default ShowChat;
