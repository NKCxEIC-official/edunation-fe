import { Grid } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import CourseCard from '../../sections/@student/app/CourseCard';

function AddedClasses() {

    const { classes } = useSelector((state) => state.auth.data);
    const user = useSelector((state) => state.auth.user);

    return (
        <>
           
                <Grid container spacing={4}>
                    {Object.keys(classes || {}).map(
                        (classKey, index) =>
                            !classes[classKey]?.enrolled?.includes(user.uid) && ( user?.uid === classes[classKey]?.creator.uid) && (
                                <CourseCard classKey={classKey} post={classes[classKey]} index={index} />
                            )
                    )}
                </Grid>
            
        </>
    );
}

export default AddedClasses