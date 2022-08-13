import React from "react";
import { Typography, Card, CardContent, Grid, TextField, Button, useFormControl } from "@mui/material";
import { Form } from "react-bootstrap";


export default function CreatAClass() {
    return (


        <div className="Create a class">
            <Typography variant="h5" sx={{ textAlign: "center" }}>Create a Class</Typography>
            <Card sx={{ padding: "20px 5px", margin: "0px auto" }}>
                <CardContent>
                    <Form>
                        <Grid container spacing={1}>
                            <Grid item>
                                <TextField id="filled-basic" label="Class Name" variant="filled" placeholder="Enter Class Name" fullWidth required />
                                <TextField id="filled-basic" label="Class Description" variant="standard" placeholder="Enter Class Description" fullWidth required multiline />
                            </Grid>
                            <Grid paddingTop={3}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                            </Grid>

                        </Grid>
                    </Form>
                </CardContent>
            </Card>
        </div >
    )
}
