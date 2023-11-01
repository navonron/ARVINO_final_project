import React, { useState, useContext } from 'react';
import { TextField, Button, IconButton, Snackbar } from '@material-ui/core';
import { AuthContext } from '../../Context/AuthContext';
import text from '../../Elements/EText.json';
import CloseIcon from '@material-ui/icons/Close';


export default function FCUsertab({ user }) {
    const { putUser } = useContext(AuthContext);
    const [name, setName] = useState(user.name);
    const [email, setemail] = useState(user.email)
    const [password, setpassword] = useState(user.password)
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        putUser(email, password, name);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        localStorage.setItem('alert', '')
    };
    
    return (
        <div className="profilediv">
            <p className="pprofile">{text.name}</p>
            <TextField
                placeholder={user.name}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = user.name}
                onChange={value => setName(value.target.value)} />

            <p className="pprofile">{text.email}</p>
            <TextField
                placeholder={user.email}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = user.email}
                onChange={value => setemail(value.target.value)} />

            <p className="pprofile">{text.password}</p>
            <TextField
                placeholder={user.password}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = "***"}
                type='password'
                onChange={value => setpassword(value.target.value)} />

            <br />
            <Button onClick={() => { handleClick() }}>{text.put}</Button>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={localStorage.getItem('alert')}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}
