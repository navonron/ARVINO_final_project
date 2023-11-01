import React, { useContext, useEffect, useState } from 'react';
import FCAppbar from '../Home/FCAppbar';
import FCMenu from '../Home/FCMenu';
import { AuthContext } from '../../Context/AuthContext';
import { ServiceContext } from '../../Context/ServiceContext';
import FCServices from './FCServices';
import { withRouter } from 'react-router-dom';
import FCAddService from './FCAddService';
import { Button } from '@material-ui/core';
import text from '../../Elements/EText.json'

function FCWatchService() {
    const { user } = useContext(AuthContext);
    const { service, loadDatas } = useContext(ServiceContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadDatas();
        console.log(service);
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
            <FCAddService open={open} closeAdd={closeAdd} />
            <br />
            <br />
            <br />

            <Button className="wineBTN" onClick={() => { openAdd(); }}>{text.addserviceH1}</Button>

            <div className="winediv">
                <FCServices service={service} />
            </div>
        </div>
    )
}
export default withRouter(FCWatchService);
