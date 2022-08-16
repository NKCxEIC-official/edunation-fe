import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
import Iconify from './Iconify';

function AssignmentFile({ title, subheader, count, totalCount, color, icon }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Iconify icon={icon} sx={{fontSize: "50px", mr:2}}/>
          <Typography variant="subtitle" sx={{ marginLeft: '10px', opacity: '0.5' }}>
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

export default AssignmentFile;
