import { Box } from '@mui/material';
import React from 'react';
import Jitsi from 'react-jitsi';
import { useSelector } from 'react-redux';

function VideoCall({ roomName }) {
  const user = useSelector((state) => state.auth.user);
  console.log(roomName)
  return (
    <Box sx={{ ml: 3, mt: 2 }}>
      <Jitsi
        roomName={roomName}
        displayName={user.firstName}
        config={{ prejoinPageEnabled: false }}
        interfaceConfig={{ filmStripOnly: true }}
        // domain={'meet.nkcxeic.in'}
      />
    </Box>
  );
}

export default VideoCall;
