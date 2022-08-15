import { Card, CardContent, CardMedia } from '@mui/material'
import React from 'react'

function CommunityCard() {
  return (
    <div>
      <Card className='community-card' lg={12} xl={12} sx={{ mt: 3 }}>
        <CardMedia className='community-card-media'>
        <img src='https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80' alt='' />
        </CardMedia>
        {/* <CardContent className='community-card-content'> */}

      </Card>
    </div>
  )
}

export default CommunityCard