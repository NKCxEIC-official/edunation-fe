import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Iconify from '../../components/Iconify'
import TopRated from './TopRatedCourses'

function Classroom() {
    return (
        <Container maxWidth="s">
            <Grid container spacing={3}>
                <Grid item lg={12}>
                    <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="row" sx={{ mb: 3, mr: 2, mt: 2 }}>
                        <Typography variant="h4" sx={{ mt: 2, mb: 2, p: 2 }}>Ongoing Courses :</Typography>
                    </Stack>
                    <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="column" sx={{ mb: 3, mr: 1, mt: 2 }}>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={12}>
                            <TopRated
                                title="Interaction Engineering"
                                subheader="Aritra Banerjee"
                                avatar={'ant-design:user-outlined'}
                                icon={'flat-color-icons:edit-image'}
                                points={[
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    }
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={12}>
                            <TopRated
                                title="Interaction Engineering"
                                subheader="Aritra Banerjee"
                                avatar={'ant-design:user-outlined'}
                                icon={'flat-color-icons:edit-image'}
                                points={[
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    }
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={12}>
                            <TopRated
                                title="Interaction Engineering"
                                subheader="Aritra Banerjee"
                                avatar={'ant-design:user-outlined'}
                                icon={'flat-color-icons:edit-image'}
                                points={[
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    }
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={12}>
                            <TopRated
                                title="Interaction Engineering"
                                subheader="Aritra Banerjee"
                                avatar={'ant-design:user-outlined'}
                                icon={'flat-color-icons:edit-image'}
                                points={[
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    },
                                    {
                                        "icon": "carbon:course",
                                        "count": "50"
                                    }
                                ]}
                            />
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Classroom