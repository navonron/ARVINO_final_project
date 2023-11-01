import React from 'react'
import { Button, Grid } from '@material-ui/core';
import whiteLOGO from '../../Assets/whiteLOGO.jpeg';
import text from '../../Elements/EText.json';
import { Link } from 'react-scroll';
import { Image } from 'react-bootstrap';


export default function FCTop() {
    return (
        <div className="startLOGIN">
            <Grid item xs={6} md={12} container>
                <div className="mainTEXT2">
                    {text.slogan}
                    <Link to="singin" activeClass="active" spy={true} smooth={true}>
                        <Button className="mainBTN">{text.conniction}</Button>
                    </Link>
                </div>
                <div className='imgdiv'>
                    <Image className='mainIMG' src={whiteLOGO} fluid /></div>
            </Grid>
        </div>
    )
}
