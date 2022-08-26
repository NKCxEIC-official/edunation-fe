/* eslint-disable */
import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import NoContacts from './NoContacts';

const ShowContacts = ({ contacts = [], selectContact, activeContact }) => {
  const mapContacts = (contacts) => {
    return contacts.map((contact, idx) => {
      const CONTACT_IMAGE = contact.dp
        ? contact.dp
        : 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg';
      return (
        <div
          className={`chatApp_contactsSection_contact ${
            idx !== contacts.length - 1 ? 'chatApp_contactsSection_contact_separatorBottom' : ''
          } ${activeContact?.uid === contact?.uid ? 'chatApp_contactsSection_contact_active' : ''}`}
          onClick={() => (activeContact?.uid === contact?.uid ? selectContact(null) : selectContact(contact))}
        >
          <span>
            <Avatar sx={{ marginRight: '10px' }} src={contact?.dp} />
          </span>
          <span>
            <Typography variant="subtitle2">{`${contact.firstName} ${contact.lastName}`}</Typography>
          </span>
        </div>
      );
    });
  };
  return (
    <div className="chatApp_contactsSection_contacts">
      {mapContacts(contacts)}
    </div>
  );
};

export default ShowContacts;
