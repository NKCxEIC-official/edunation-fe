import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Iconify from './Iconify'


function OngoingCourses({ title, subheader, icon, avatar, points }) {
    return (
        <Card sx={{ px: 2 }}>

            <Grid container>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ borderRight: "1px", py: 2, alignItems: "center", justifyContent: "center"}}>
                    <img src={icon} alt="banner" style={{ height: "70px", width: "70px", borderRadius: "20px" }} />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={9} sx={{ p: 2 }}>
                    <Typography variant='h6'>{title}</Typography>
                    <Stack spacing={1} direction="row" sx={{ opacity: "0.5" }}>
                        <Iconify icon={avatar} width={22} height={22} />
                        <Typography variant='subtitle2'>{subheader}</Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container sx={{ borderTop: "1px dashed #000", pt: 2 }}>
                {points.map(point => (
                    <Grid item sx={{ pb: 2, opacity: 0.5 }} xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Stack spacing={2} alignItems="center" direction="row" sx={{ pl: 2 }}>
                            <Iconify icon={point.icon} width={22} height={22} />
                            <Typography variant='subtitle2' sx={{ marginRight: "30px", opacity: "1" }}>{point.count}</Typography>
                        </Stack>
                    </Grid>
                ))}
                <Button sx={{ mx: "auto", opacity: 0.7 }} size="large" color="primary">
                    Go to Class
                </Button>
            </Grid>
        </Card>
    )
}

export default OngoingCourses;