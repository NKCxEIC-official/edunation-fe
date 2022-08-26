/* eslint-disable */
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { onValue, ref, update } from 'firebase/database';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrdinalSuffix, shortenedMonthList } from 'src/utils/dataHelpers';
import { db, realtimeDb } from 'src/utils/firebaseConfig';
import Iconify from '../Iconify';
import CryptoJS from "crypto-js";

const ShowChat = ({ selectedContact, messages = [] }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [chatContainerRef, setChatContainerRef] = useState(null);
  const [secret, setSecret] = useState(null);
  
  const getSecret = () => {
    let STUDENT_UID, TEACHER_UID;
    if (user.role === 1 && !user.isTeacher) {
      STUDENT_UID = user.uid;
      TEACHER_UID = selectedContact.uid;
    } else {
      STUDENT_UID = selectedContact.uid;
      TEACHER_UID = user.uid;
    }
    const secretKey = STUDENT_UID+'-'+TEACHER_UID;
    setSecret(secretKey);
  }

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
      content: encryptMessage(currentMessage),
      sentOn: new Date().toUTCString(),
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
          const teacherDocumentRef = doc(db, 'users', TEACHER_UID);
          updateDoc(teacherDocumentRef, {
            studentsMessageArr: arrayUnion(STUDENT_UID),
          });
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

  useEffect(() => {
    if(selectedContact && user)
      getSecret();
  }, [selectedContact, user])

  const formatChatTime = (dateTime) => {
    const dateTimeObj = new Date(dateTime);

    const yesterdayDateTimeObj = new Date();
    yesterdayDateTimeObj.setDate(yesterdayDateTimeObj.getDate() - 1);

    const todayDateTimeObj = new Date();

    let formattedChatTime = '';

    if (dateTimeObj.toDateString() === todayDateTimeObj.toDateString()) {
      formattedChatTime += 'Today';
    } else if (dateTimeObj.toDateString() === yesterdayDateTimeObj.toDateString()) {
      formattedChatTime += 'Yesterday';
    } else {
      formattedChatTime +=
        getOrdinalSuffix(dateTimeObj.getDate()) +
        ' ' +
        shortenedMonthList[dateTimeObj.getMonth()] +
        `${dateTimeObj.getFullYear() === todayDateTimeObj.getFullYear() ? '' : `, ${dateTimeObj.getFullYear()}`}`;
    }

    formattedChatTime += ', ' + dateTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return formattedChatTime;
  };

  const getDecryptedMessage = (message) => {
    const decryptedMessage =  CryptoJS.AES.decrypt(message, secret);
    return decryptedMessage.toString(CryptoJS.enc.Utf8);
  }

  const encryptMessage = (message) => {
    const encryptedMessage = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), secret);
    return encryptedMessage.toString();
  }
  return (
    <div className="chatApp_chatsSection_chat">
      <div className="chatApp_chatsSection_chat_contactDetails">
        <span>
          <Avatar sx={{ marginRight: '10px' }} src={selectedContact?.dp} />
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
                <div className="content">{getDecryptedMessage(message.content)}</div>
                <div className="timeMeta">{formatChatTime(message?.sentOn)}</div>
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
