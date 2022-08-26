import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import React from 'react';

function SmallGrid({ title, subheader, count, totalCount, color, icon }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '15px',
              backgroundColor: `${color}.light`,
              height: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: '5px', backgroundColor: `#fff`, height: '5px', borderRadius: '20px' }} />
          </Box>
          <Typography variant="subtitle2" sx={{ marginLeft: '10px', opacity: '0.5' }}>
            {subheader}
          </Typography>
        </Box>

        <Typography variant="h3">
          {count}
          {totalCount && `/${totalCount}`}
        </Typography>
        <Box sx={{ width: '50px', backgroundColor: `${color}.light`, height: '3px' }} />
      </CardContent>
    </Card>
  );
}

export default SmallGrid;
