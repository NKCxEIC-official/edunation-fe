import { Typography } from '@mui/material'
import React from 'react'
import VoidIcon from './SVGIcons/VoidIcon'

const NoMessages = () => {
  return (
    <div className="chatApp_chatsSection_noMessages">
        <VoidIcon />
        <Typography variant="h6">
            Nothing to show, click on a chat to fill this space!
        </Typography>
    </div>
  )
}

export default NoMessages