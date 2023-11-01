import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { Select, InputAdornment, Button, TextField } from '@material-ui/core';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Home from '@material-ui/icons/Home';
import TextFormat from '@material-ui/icons/TextFormat';
import Phone from '@material-ui/icons/Phone';
import VpnKey from '@material-ui/icons/VpnKey';
import FileUploadPage from '../FileUpload/FileUploadPage';
import text from '../../Elements/EText.json';
import FCRegistrMessage from './FCRegistrMessage';
import wine2 from '../../Assets/wine.jpg';
import { Image } from 'react-bootstrap';

export default function FCSingin() {

    const {getArea, area, phoneRegex, singup, emailRegex } = useContext(AuthContext);

    const [isEmail, setIsEmail] = useState('');
    const [isFull, setIsFull] = useState('');
    const [name, setName] = useState('');
    const [wname, setwName] = useState('');
    const [wemail, setwEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [areaId, setAreaId] = useState('');
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        getArea();
    }, [])

    const openAdd = () => {
        setOpen(true)
    }

    const closeAdd = () => {
        setOpen(false)
    }

    const onEmailChange = (email, type) => {
        if (!emailRegex.test(email)) {
            setIsEmail(text.isEmail)
        }
        else if (type === '1') {
            setIsEmail('');
            setEmail(email)
        }
        else {
            setIsEmail('');
            setwEmail(email)
        }
    }

    const checkFullDetails = async () => {
        if (email !== null && wemail !== null &&
            (name !== null && name.length >= 2) &&
            (wname !== null && wname.length >= 2) &&
            (password !== null && password.length >= 8) &&
            (address !== null && address.length >= 5) &&
            phoneRegex.test(phone) !== null &&
            areaId !== null &&
            localStorage.getItem('url') !== "[object Object]" &&
            localStorage.getItem('url') !== undefined &&
            localStorage.getItem('url') !== null) {

            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/User/isEmailExists?email=' + email,
                {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                })
                .then(res => {
                    return res.json()
                })
                .then(
                    (result) => {
                        if (result === 1) {
                            fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Winery/isEmailExists?email=' + email,
                                {
                                    method: 'GET',
                                    headers: new Headers({
                                        'Content-Type': 'application/json; charset=UTF-8',
                                        'Accept': 'application/json; charset=UTF-8',
                                    })
                                })
                                .then(res => {
                                    return res.json()
                                })
                                .then(
                                    (result) => {
                                        if (result === 1) {
                                            singup(name, email, password, wname, wemail, address, phone, areaId);
                                            openAdd();
                                        }
                                        else {
                                            setIsEmail(text.emailExists);
                                        }
                                    },
                                    (error) => {
                                        console.log("err=", error);
                                    });
                        }
                        else {
                            setIsEmail(text.emailExists);
                        }
                    },
                    (error) => {
                        console.log("err=", error);
                    });
        }
        else {
            setIsFull(text.isFull)
        }
    }

    return (
        <div >
            <FCRegistrMessage open={open} closeAdd={closeAdd} />
            <Image id="singin" src={wine2} fluid className='singinimg' />


            <div className="singindiv">
                <h1 className="h1">{text.singin}</h1>
                <p className="h2">{text.userD}</p>
                <div>
                    <TextField
                        placeholder={text.enterFullName}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.enterFullName}
                        onChange={value => setName(value.target.value)}
                        InputProps={{
                            startAdornment:
                                (<InputAdornment position="start"> <TextFormat /> </InputAdornment>),
                        }} />
                </div>
                <div>
                    <TextField
                        placeholder={text.enterEmail}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.enterEmail}
                        onChange={value => onEmailChange(value.target.value, '1')}
                        InputProps={{
                            startAdornment:
                                (<InputAdornment position="start"> <AlternateEmail /> </InputAdornment>),
                        }} />
                </div>
                <div>
                    <p className="text"> {isEmail} </p>
                    <TextField type='password'
                        placeholder={text.enterPassword}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.enterPassword}
                        onChange={value => setPassword(value.target.value)}
                        InputProps={{
                            startAdornment:
                                (<InputAdornment position="start"> <VpnKey /> </InputAdornment>),
                        }} />

                    <p> {text.passwordValid} </p>

                </div>

                <p className="h2">{text.wineryD}</p>
                <div>
                    <TextField
                        placeholder={text.enterWineryName}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.enterWineryName}
                        onChange={value => setwName(value.target.value)}
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <TextFormat /> </InputAdornment>), }} />
                </div>
                <div>
                    <TextField
                        placeholder={text.enterEmailW}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.enterEmailW}
                        onChange={value => onEmailChange(value.target.value, '2')}
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <AlternateEmail /> </InputAdornment>), }} />
                    <p className="text"> {isEmail} </p>
                </div>
                <div>
                    <TextField
                        placeholder={text.address}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.address}
                        onChange={value => setAddress(value.target.value)}
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Home /> </InputAdornment>), }} />
                </div>
                <div>
                    <TextField type='number'
                        placeholder={text.phone}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.phone}
                        onChange={value => setPhone(value.target.value)}
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Phone /> </InputAdornment>), }} />
                    <p className="text"> {text.wineryArea} </p>
                </div>
                <div>
                    {area.length ?
                        <Select label={text.wineryArea} onChange={e => setAreaId(e.target.value)}>
                            {area.map((option, index) => (<option value={option.areaId}>{option.areaName}</option>))}
                        </Select>
                        :
                        <div> {text.caterr} </div>}
                </div>

                <FileUploadPage />
                <br />
                <Button onClick={() => { checkFullDetails() }}>{text.ok}</Button>
                <p className="pSingin"> {isFull} </p>


            </div>
        </div>
    )
}
