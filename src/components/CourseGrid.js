import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React from 'react'
import Iconify from './Iconify'


function CourseGrid({title, subheader, count, color, icon}) {
  return (
    <Card sx={{px:2, height:"100%"}}>
       
        <Grid container>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} sx={{borderRight:"1px dashed #ddd", py:5, alignItems:"center", justifyContent:"center", display:"flex"}}>
            <Iconify icon={icon} width={50} height={50} color={color}/>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} sx={{py:2, pl:2}}>
            <Box sx={{display:"flex",alignItems:"center", height:"100%"}}>
              <Box>
                  <Typography variant='h6' sx={{marginLeft:"10px", opacity:"1"}}>{subheader}</Typography>
                  <Typography paragraph />
                  <Typography variant='subtitle' sx={{marginLeft:"10px", opacity:"1"}}>{count}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
    </Card>
  )
}

export default CourseGrid