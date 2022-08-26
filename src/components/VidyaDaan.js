import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React from 'react';
import Iconify from './Iconify';

function Vidyadaan({ title, subheader, count, color, icon, smallheader }) {
  return (
    <Card sx={{ px: 2, width: '100%' }}>
      <Grid container>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          sx={{
            borderRight: '1px dashed #ddd',
            py: 5,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Iconify icon={icon} width={25} height={25} color={color} />
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={9} xl={9} sx={{ py: 2, pl: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Box>
              <Typography variant="h6" sx={{ marginLeft: '10px', opacity: '1' }}>
                {subheader}
              </Typography>
              <Typography variant="subtitle2" sx={{ marginLeft: '10px', opacity: '0.7' }}>
                {smallheader}
              </Typography>
              <Typography variant="subtitle" sx={{ marginLeft: '10px', opacity: '1' }}>
                {count}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Vidyadaan;
