import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import NTS from '../../components/NTS'
import OngoingCourses from '../../components/OngoingCourses'

function OngoingClasses() {

    const user = useSelector((state) => state.auth.user);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                    sx={{ mb: 3, mr: 2, mt: 2 }}
                >
                    <Typography variant="h4" sx={{ mt: 2, mb: 2, pt: 2 }}>
                        Ongoing Classes :
                    </Typography>
                </Stack>

                <Stack spacing={2} alignItems="center" direction="row" sx={{ mb: 2, mr: 1, mt: 2 }}>
                    {user.ongoingCourses && user.ongoingCourses.length > 0 ? (
                        user.ongoingCourses.map((ongoingCourse) => (
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <OngoingCourses
                                    title={ongoingCourse.courseName}
                                    subheader={ongoingCourse.author}
                                    avatar={'ant-design:user-outlined'}
                                    icon={ongoingCourse.classDp}
                                    classKey={ongoingCourse.classId}
                                    points={[
                                        {
                                            icon: 'eos-icons:product-classes-outlined',
                                            count: ongoingCourse.courseMaterialCount,
                                        },
                                        {
                                            icon: 'carbon:course',
                                            count: ongoingCourse.assignmentCount,
                                        },
                                        {
                                            icon: 'arcticons:netease-open-class',
                                            count: ongoingCourse.liveClassCount,
                                        },
                                        {
                                            icon: 'simple-line-icons:calender',
                                            count: ongoingCourse.days,
                                        },
                                    ]}
                                />
                            </Grid>
                        ))
                    ) : (
                        <NTS />
                    )}
                </Stack>
            </Grid>
        </Grid>
    )
}

export default OngoingClasses