import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts(props) {
    console.log(props.data);
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={props.data.severity}>
                <AlertTitle>{props.data.title}</AlertTitle>
                {props.data.message} — <strong>check it out!</strong>
            </Alert>
        </Stack>
    );
}
