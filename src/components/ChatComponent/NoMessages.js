import { Typography } from '@mui/material'
import React from 'react'
import VoidIcon from './SVGIcons/VoidIcon'

const NoMessages = ({ isContactsAvailable }) => {
  return (
    <div className="chatApp_chatsSection_noMessages">
        <VoidIcon />
        <Typography variant="h6">
            {`Nothing to show${isContactsAvailable ? ', click on a chat to fill this space!' : ' here :)'}`}
        </Typography>
    </div>
  )
}

export default NoMessages