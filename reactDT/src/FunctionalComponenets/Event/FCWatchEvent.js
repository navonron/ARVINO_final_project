import React, { useState, useContext, useEffect } from 'react';
import FCMenu from '../Home/FCMenu';
import text from '../../Elements/EText.json';
import {  Button } from '@material-ui/core';
import { EventContext } from '../../Context/EventContext';
import { AuthContext } from '../../Context/AuthContext';
import FCAddEvent from '../Event/FCAddEvent';
import FCEvents from './FCEvents';
import FCAppbar from '../Home/FCAppbar';
import { withRouter } from 'react-router-dom';


 function FCWatchEvent() {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const { allEvent, loadDataE, getCategories } = useContext(EventContext);

    useEffect(() => {
        loadDataE();
        getCategories();
    }, [])

    const openAdd = () => {
        setOpen(true)
    }

    const closeAdd = () => {
        setOpen(false)
    }

    return (
        <div>
            <FCMenu />
            <FCAppbar user={user} />

            <FCAddEvent open={open} closeAdd={closeAdd} />
            <div>
                <div className="tWine">

                    <h1>{text.watchevent}</h1>
                    <br />
                    <Button className="wineBTN" onClick={() => { openAdd(); }}>{text.addeventH1}</Button>
                </div>
                <div className="winediv">
                    <FCEvents event={allEvent} />
                </div>

            </div>
        </div>
    )
}
export default withRouter(FCWatchEvent);
