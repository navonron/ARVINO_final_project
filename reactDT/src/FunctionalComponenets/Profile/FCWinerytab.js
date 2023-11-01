import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, IconButton, Snackbar, Avatar, Select } from '@material-ui/core';
import { AuthContext } from '../../Context/AuthContext';
import text from '../../Elements/EText.json';
import CloseIcon from '@material-ui/icons/Close';
import Sync from '@material-ui/icons/Sync';
import FileUploadPage from '../FileUpload/FileUploadPage'

export default function FCWinerytab({ user }) {
    const { getArea, area, putWinery } = useContext(AuthContext);
    const [namew, setNamew] = useState(user.wname);
    const [emailw, setEmailw] = useState(user.wemail);
    const [address, setAddress] = useState(user.address);
    const [phone, setPhone] = useState(user.phone);
    const [areaId, setAreaId] = useState(user.areaId);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getArea();
    }, [1])

    const handleClick = () => {
        putWinery(user.id, namew, address, emailw, phone, user.picture, areaId);
        if (localStorage.getItem('alert') === "") {
            localStorage.setItem('alert', text.error)
        }
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
        <div className="profilediv2">
            <Avatar className="profileavatar" src={user.picture} />
            <FileUploadPage />

            <p className="pprofile">{text.winery}</p>
            <TextField
                placeholder={user.wname}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = user.wname}
                onChange={value => setNamew(value.target.value)} />
            <p className="pprofile">{text.wemail}</p>
            <TextField
                placeholder={user.wemail}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = user.wemail}
                onChange={value => setEmailw(value.target.value)} />
            <p className="pprofile">{text.wphone}</p>
            <TextField
                placeholder={user.phone}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = user.phone}
                type='number'
                onChange={value => setPhone(value.target.value)} />
            <p className="pprofile">{text.waddress}</p>
            <TextField
                placeholder={user.address}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = user.address}
                onChange={value => setAddress(value.target.value)} />
            <p className="pprofile"> {text.warea}</p>
            {area.length ?
                <Select label={text.wineryArea} onChange={e => setAreaId(e.target.value)}>
                    {area.map((option, index) => (<option value={option.areaId}>{option.areaName}</option>))}
                </Select>
                :
                <div> {text.caterr} </div>}

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
