import { Box, Card, CardContent, CardHeader, Typography, Grid, Stack } from '@mui/material'
import React from 'react'
import Iconify from './Iconify'


function RectangleGrid({ title, subheader, count, color, icon, percent, duration }) {
    return (
        // <Card>

        <Card sx={{ px: 3 }}>

            <Grid container height={50}>
                {/* <Grid item xs={1.5} sm={1.5} md={1.5} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
                    <Iconify icon={icon} width={20} height={20} />
                </Grid> */}
                <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
                    <Iconify icon={icon} width={20} height={20} />
                    <Typography variant='h6' sx={{ marginLeft: "10px", opacity: "1" }}>{subheader}</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
                    <Typography variant='subtitle' sx={{ marginLeft: "10px", opacity: "1" }}>{count}</Typography>

                </Grid>
                <Grid item xs={3} sm={3} md={3} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
                    <Typography variant='subtitle' sx={{ marginLeft: "10px", opacity: "1" }}>{percent}</Typography>
                </Grid>
                <Grid item xs={1.5} sm={1.5} md={1.5} sx={{ alignItems: "center", justifyContent: "left", display: "flex" }}>
                    <Stack>
                        <Typography variant='subtitle' sx={{ marginLeft: "10px", opacity: "1" }}>{duration}</Typography>
                        <Box
                            sx={{ width: "50px", backgroundColor: "primary.light", height: "3px", ml: 2 }} />
                    </Stack>
                </Grid>

                {/* <Grid item xs={8} sm={8} md={8} lg={8} xl={8} sx={{ py: 2, pl: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Typography variant='h6' sx={{ marginLeft: "10px", opacity: "1" }}>{subheader}</Typography>
                            <Typography paragraph />
                            <Typography variant='subtitle' sx={{ marginLeft: "10px", opacity: "1" }}>{count}</Typography>
                        </Box> */}
                {/* </Box> */}
            </Grid>
            {/* </Grid > */}
        </Card >
    )
}
export default RectangleGrid



