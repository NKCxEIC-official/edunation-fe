import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React from 'react'
import Iconify from './Iconify'


function LargeGrid({title, subheader, count, color, icon}) {
  return (
    <Card sx={{px:2}}>
       
        <Grid container>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} sx={{borderRight:"1px dashed #000", py:2, alignItems:"center", justifyContent:"center", display:"flex"}}>
            <Iconify icon={icon} width={50} height={50} />
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} sx={{py:2, pl:2}}>
            <Box sx={{display:"flex",alignItems:"center"}}>
              <Box>
                  <Typography variant='h6' sx={{marginLeft:"10px", opacity:"1"}}>{subheader}</Typography>
                  <Typography paragraph />
                  <Typography variant='subtitle' sx={{marginLeft:"10px", opacity:"1"}}>{count}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        
        {/* <Box sx={{display:"flex",alignItems:"center"}}>
            <Box
            sx={{width:"15px", backgroundColor:`${color}.light`, height:"15px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Box
                    sx={{width:"5px", backgroundColor:`#fff`, height:"5px", borderRadius:"20px"}} />
                </Box>
                  <Typography variant='subtitle2' sx={{marginLeft:"10px", opacity:"0.5"}}>{subheader}</Typography>
                </Box>
     
        <Typography variant='h3'>{count}</Typography>
        <Box
          sx={{width:"50px", backgroundColor:`${color}.light`, height:"3px"}}/> */}
    </Card>
  )
}

export default LargeGrid