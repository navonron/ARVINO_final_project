import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { InputAdornment, Button, TextField, Grid } from '@material-ui/core';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import VpnKey from '@material-ui/icons/VpnKey';
import text from '../../Elements/EText.json';
import CircularProgressWithLabel from './FCCircularStatic';
import arvino from '../../Assets/Logo small.png';
import FCTop from './FCTop';
import FCAppbar from './FCAppbar';
import wine from '../../Assets/wine2.jpg';
import FCSingin from './FCSingin';
import { Image } from 'react-bootstrap';
import FCSlideshow from './FCSlideshow'

export default function FCLogin() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isload, setisload] = useState(true);

    useEffect(() => {
        localStorage.setItem('url', '');
    }, [])

    const log = () => {
        login(email, password);
        if (localStorage.getItem('err') === null) {
            localStorage.removeItem('err');
            setisload(false)
        }
    }

    return isload ? (

        <div>
            <FCAppbar />

            <Grid item xs={2} md={12}>
                <FCTop />
            </Grid>

            <Grid item xs={12}>
                <FCSlideshow />
            </Grid>

            <Grid item xs={12} id='login'>
                <Image src={wine} fluid className='loginimg' />
                <div className='rightlogin'>
                    <img className='logologin' src={arvino} />
                    
                    <div>
                        <TextField className="field"
                            onChange={value => setEmail(value.target.value)}
                            InputProps={{
                                startAdornment:(<InputAdornment position="start"> <AlternateEmail /> </InputAdornment>),}} />
                    </div>
                    <div>
                        <TextField className="field" type='password'
                            onChange={value => setPassword(value.target.value)}
                            InputProps={{
                                startAdornment:
                                    (<InputAdornment position="start"> <VpnKey /> </InputAdornment>),
                            }} />
                    </div>
                    <div>
                        <Button className="btn2" onClick={() => { log(); }}>
                            {text.login}
                        </Button>
                    </div>
                    <p> {localStorage.getItem('err')} </p>
                </div>

            </Grid>

            <Grid item xs={12}>
                <div> <FCSingin /> </div>
            </Grid>



        </div>

    ) : (
        <div>
            <img className='LOGO' src={arvino} />
            <br />
            <br />
            <br />
            <CircularProgressWithLabel />
        </div>
    )
}


