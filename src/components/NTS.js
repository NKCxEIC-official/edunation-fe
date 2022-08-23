import { Box, Typography } from '@mui/material';
import React from 'react';

function NTS() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
    >
      <img src="/static/illustrations/notfound.svg" height="200px" alt="icon" />
      <Typography variant="h6" sx={{ opacity: 0.6 }}>
        No Data Found
      </Typography>
    </Box>
  );
}

export default NTS;
