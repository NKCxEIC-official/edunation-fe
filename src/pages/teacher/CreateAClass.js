import React from "react";
import { Typography, Card, CardContent, Grid, TextField, Button, useFormControl, Stack } from "@mui/material";
import { Form } from "react-bootstrap";


export default function CreatAClass() {
    return (


        <div className="Create a class">
            <Typography variant="h4" sx={{ mb: 1 }}>Create a Class</Typography>
           
                    <Form>
                        <Stack spacing={3}>
                               <TextField id="filled-basic" label="Class Name" variant="standard" placeholder="Enter Class Name" fullWidth required />
                                <TextField id="filled-basic" label="Class Description" variant="standard" placeholder="Enter Class Description" fullWidth required multiline />
                            
                                <Button type="submit" variant="contained" color="primary" fullWidth>Create Class</Button>
                                </Stack>
                            
                    </Form>
                
        </div >
    )
}
