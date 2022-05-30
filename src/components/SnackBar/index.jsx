import React from "react";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const _type = props.notice.type, _msg = props.notice.msg
        props.setNotice({ type: _type, msg: _msg, show: false })
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={props.notice.show}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.notice.type} sx={{ width: '100%' }}>
                    {props.notice.msg}
                </Alert>
            </Snackbar>
        </Stack>
    );
}