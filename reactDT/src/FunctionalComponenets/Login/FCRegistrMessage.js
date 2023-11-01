import React from 'react';
import { Modal, Button } from '@material-ui/core';
import text from '../../Elements/EText.json';
import blackLOGO from '../../Assets/blackLOGO.jpeg';

export default function FCRegistrMessage(props) {
    return (
        <div>
            <Modal open={props.open} className="messgMODAL">
                <div className="endRegDiv">
                    <img src={blackLOGO} className="tynimg" />
                    <p> {text.endRegistration1} </p>
                    <p> {text.endRegistration2} </p>
                    <p> {text.endRegistration3} </p>
                    <Button className="endRegBTN" variant="outlined" onClick={() => props.closeAdd()}>{text.backToLogInBTN}</Button>
                    <br />
                    <br />
                </div>
            </Modal>
        </div>
    )
}
