import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'


function Summary({ summaryContent, title }) {
    return (
        <Card>
            <CardHeader title={title} />
            {summaryContent?.map((obj) => {
                return (<CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            sx={{ width: "25px", backgroundColor: `${obj.color}.light`, height: "25px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "5px" }}>
                            <Box
                                sx={{ width: "10px", backgroundColor: `#fff`, height: "10px", borderRadius: "20px" }} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant='h5' sx={{ marginLeft: "10px", marginBottom: "5px" }}>{obj.count}</Typography>
                            <Typography variant='subtitle2' sx={{ marginLeft: "10px" }}>{obj.subheader}</Typography>
                        </Box>
                    </Box>

                </CardContent>)
            })}
        </Card>
    )
}
export default Summary;