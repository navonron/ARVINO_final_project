import React from 'react';
import { Modal, Button } from '@material-ui/core';
import text from '../../Elements/EText.json';
import blackLOGO from '../../Assets/blackLOGO.jpeg';

export default function FCMasgAdd(props) {
    return (
        <div>
            <Modal open={props.open} className="messgMODAL">
                <div className="endRegDiv">
                    <img src={blackLOGO} className="tynimg" />
                    <p> {text.productAdded} </p>
                    <Button className="endRegBTN" variant="outlined" onClick={() => props.closeAdd()}>{text.ok}</Button>
                    <br />
                    <br />
                </div>
            </Modal>
        </div>
    )
}
