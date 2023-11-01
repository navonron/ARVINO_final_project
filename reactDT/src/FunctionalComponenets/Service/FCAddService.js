import React, { useContext, useState } from 'react';
import text from '../../Elements/EText.json'
import { Paper, TextField, Modal, Button } from '@material-ui/core';
import { ServiceContext } from '../../Context/ServiceContext';
import FCMasgAdd from '../Home/FCMassgAdd';


export default function FCAddService(props) {
    const { add } = useContext(ServiceContext);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [mycategory, setmycategory] = useState('');
    const [isFull, setIsFull] = useState('');
    const [open, setOpen] = useState(false);


    async function checkFullDetails() {
        console.log(mycategory)
        if ((name !== null && name.length >= 2) && (content !== null && content.length >= 2) && (price !== null && price >= 1) && (mycategory != "" && mycategory.length >= 2)) {
            add(name, content, price, mycategory);
            props.closeAdd();
            openAdd();
        }
        else {
            setIsFull(text.isFull)
        }
    };

    const openAdd = () => {
        setOpen(true)
    }

    const closeAdd = () => {
        setOpen(false)
    }

    return (
        <div>
            <FCMasgAdd open={open} closeAdd={closeAdd} />
            <Modal open={props.open}>
                <Paper className="addWine">
                    <h1> {text.addserviceH1} </h1>

                    <TextField
                        placeholder={text.name}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.name}
                        onChange={value => setName(value.target.value)} />
                    <TextField
                        placeholder={text.content}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.content}
                        onChange={value => setContent(value.target.value)} />
                    <TextField
                        placeholder={text.price}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.price}
                        onChange={value => setPrice(value.target.value)} />
                    <TextField
                        className="txt"
                        placeholder={text.Cat}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.Cat}
                        onChange={value => setmycategory(value.target.value)} />
                    <Button className="btnevent" variant="outlined" onClick={() => checkFullDetails()}>{text.addsrvice}</Button>
                    <br />
                    <br />
                    <Button className="btnevent2" variant="outlined" onClick={() => props.closeAdd()}>{text.cancle}</Button>
                    <br />
                    <br />
                    <p className="text"> {isFull} </p>
                </Paper>
            </Modal>
        </div>
    )
}
