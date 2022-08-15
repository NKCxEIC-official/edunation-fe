import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import LargeGrid from '../components/LargeGrid'

function CourseMaterialDetails() {

    const {topic} = useParams()
    return (
        <div>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
                    Course Materials : {topic}
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <LargeGrid subheader="Arrow Function" icon={'bi:filetype-pdf'} color="#2E2B81" height={30} width={30} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <LargeGrid subheader="UseEffect" icon={'bi:filetype-pdf'} color="#2E2B81" height={30} width={30} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <LargeGrid subheader="Arrow Function" icon={'bi:filetype-pdf'} color="#2E2B81" height={30} width={30} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <LargeGrid subheader="UseEffect" icon={'bi:filetype-pdf'} color="#2E2B81" height={30} width={30} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default CourseMaterialDetails