import React, { useContext, useState, useEffect } from 'react';
import text from '../../Elements/EText.json'
import { Paper, TextField, Modal, Button, Select, IconButton } from '@material-ui/core';
import FileUploadPage from '../FileUpload/FileUploadPage';
import { EventContext } from '../../Context/EventContext';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import FCMasgAdd from '../Home/FCMassgAdd';

export default function FCAddEvent(props) {
    const { getCategories, category, add, addCategory } = useContext(EventContext);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [participant, setparticipant] = useState('');
    const [date, setdate] = useState('');
    const [time, settime] = useState('');
    const [isFull, setIsFull] = useState('');
    const [addCategoryn, setaddCategoryn] = useState('');
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        getCategories();
    }, [])

    async function checkFullDetails() {
        var today = new Date(),
            datee = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();

        if ((name !== null && name.length >= 2) &&
            (content !== null && content.length >= 2) &&
            (price !== null && price >= 1) &&
            (participant !== null && participant >= 1) &&
            (date !== null && date >= datee) &&
            (time !== null) &&
            (id !== null | addCategoryn !== null) &&
            localStorage.getItem('url') !== "[object Object]" && localStorage.getItem('url') !== undefined &&
            localStorage.getItem('url') !== null && id != "") {

            add(name, content, price, id, addCategoryn, participant, date, time);
            props.closeAdd();
            openAdd()
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
            <FCMasgAdd open={open} closeAdd={closeAdd}/>
            <Modal open={props.open}>
                <Paper className="addWine">
                    <h1> {text.addeventH1} </h1>

                    <TextField
                        placeholder={text.eventName}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.eventName}
                        onChange={value => setName(value.target.value)} />
                    <TextField
                        placeholder={text.sevicecontent}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.sevicecontent}
                        onChange={value => setContent(value.target.value)} />
                    <TextField
                        placeholder={`${text.seviceprice} ₪`}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.seviceprice}
                        onChange={value => setPrice(value.target.value)} />
                    <TextField
                        placeholder={text.partA}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.partA}
                        onChange={value => setparticipant(value.target.value)} />
                    <p className="txtP">{text.chooseC}</p>
                    {category.length ?
                        <Select className="sortselectWine" onChange={e => setId(e.target.value)}>
                            {category.map((option, index) =>
                                (<option value={option.categoryId}> {option.categoryName} </option>))}
                        </Select>
                        :
                        <div> {text.caterr} </div>}
                    <TextField
                        className="txt"
                        placeholder={text.orCat}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = text.orCat}
                        onChange={value => setaddCategoryn(value.target.value)} />

                    <IconButton aria-label="delete" color="primary" onClick={() => addCategory(addCategoryn)}>
                        <AddIcon />
                    </IconButton>

                    <br />
                    <br />
                    <TextField
                        id="datetime-local"
                        type="date"
                        className={classes.textField}
                        onChange={value => setdate(value.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        id="time"
                        type="time"
                        className={classes.textField}
                        onChange={value => settime(value.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />

                    <FileUploadPage />

                    <Button className="btnevent" variant="outlined" onClick={() => checkFullDetails()}>{text.addevent}</Button>
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

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));