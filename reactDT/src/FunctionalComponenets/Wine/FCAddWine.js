import React, { useContext, useState } from 'react';
import text from '../../Elements/EText.json'
import { Paper, TextField, Modal, Button, Select} from '@material-ui/core';
import { WineContext } from '../../Context/WineContext';
import FileUploadPage from '../FileUpload/FileUploadPage';
import FCMasgAdd from '../Home/FCMassgAdd';


export default function FCAddWine(props) {
    const { add, category } = useContext(WineContext);

    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [isFull, setIsFull] = useState('');
    const [open, setOpen] = useState(false);


    async function checkFullDetails() {
        if ((name !== null && name.length >= 2) && (content !== null && content.length >= 2) && (price !== null && price >= 1) &&
            localStorage.getItem('url') !== "[object Object]" && localStorage.getItem('url') !== undefined
            && localStorage.getItem('url') !== null && id != "") {
            add(name, content, price, id);
            props.closeAdd();
            openAdd();
        }
        else {
            setIsFull(text.isFull)
        }
    }

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
                    <h1> {text.addWineH1} </h1>

                    <TextField
                        placeholder={text.wineName}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.wineName}
                        onChange={value => setName(value.target.value)} />
                    <TextField
                        placeholder={text.winecontent}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.winecontent}
                        onChange={value => setContent(value.target.value)} />
                    <TextField
                        type='number'
                        placeholder={text.winePrice}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.winePrice}
                        onChange={value => setPrice(value.target.value)} />



                    {category.length ?
                        <Select className="sortselectWine" label={text.wineryArea} fullWidth
                            onChange={e => setId(e.target.value)}>
                            {category.map((option, index) => (<option value={option.categoryId}>{option.categoryName}</option>))}
                        </Select>
                        :
                        <div> {text.caterr} </div>}


                    <FileUploadPage />

                    <Button className="btnevent" variant="outlined" onClick={() => checkFullDetails()}>{text.addWine}</Button>
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
