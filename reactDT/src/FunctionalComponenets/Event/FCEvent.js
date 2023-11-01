import React, { useContext, useState, useRef } from 'react';
import { IconButton, TextField, Button, Select, Snackbar } from '@material-ui/core';
import { EventContext } from '../../Context/EventContext';
import Sync from '@material-ui/icons/Sync';
import text from '../../Elements/EText.json';
import FileUploadPage from '../FileUpload/FileUploadPage';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const FCEvent = ({ event }) => {
    const classes = useStyles();
    const { remove, category, edit, addCategory } = useContext(EventContext);
    const [addCategoryn, setaddCategoryn] = useState('');
    const [name, setName] = useState(event.eventName);
    const [content, setContent] = useState(event.content);
    const [price, setPrice] = useState(event.price);
    const [id, setId] = useState(event.categoryId);
    const [participant, setparticipant] = useState(event.participantsAmount);
    const [date, setdate] = useState(event.eventDate);
    const [time, settime] = useState(event.startTime);
    const [img] = useState(event.eventImgPath);
    const ref = useRef();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        localStorage.setItem('alert', '')
    };

    return (
        <div className="wine">
            <Flippy flipOnHover={false} flipOnClick={false} flipDirection="horizontal" ref={ref} >
                <FrontSide className="wine">
                    <img src={event.eventImgPath} className="wineImg" />
                    <h2> {event.eventName} </h2>
                    <p> {event.categoryName} </p>
                    <p> {event.content} </p>
                    <p> {moment(event.eventDate).format('DD-MM-yyyy')} </p>
                    <p> {event.startTime} </p>
                    <p> {event.price} ₪ </p>
                    <p> {text.participant} - {event.participantsAmount} </p>
                    <p> {text.tickets} - {event.ticketsPurchased} </p>
                    <Button className="btn" onClick={() => { ref.current.toggle(); }}>{text.edit}</Button>
                </FrontSide>

                <BackSide className="wine">
                    <TextField
                        className="txt"
                        placeholder={event.eventName}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = event.eventName}
                        onChange={value => setName(value.target.value)} />
                    <TextField
                        className="txt"
                        placeholder={event.content}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = event.content}
                        onChange={value => setContent(value.target.value)} />
                    <TextField
                        className="txt"
                        placeholder={`${event.price} ₪`}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = event.price}
                        onChange={value => setPrice(value.target.value)} />
                    <TextField
                        className="txt"
                        placeholder={`${event.participantsAmount} - ${text.participant}`}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = event.participantsAmount}
                        onChange={value => setparticipant(value.target.value)} />


                    <p>{text.category} : {event.categoryName}</p>
                    <p className="tinyText">{text.changeCategory}</p>
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

                    <IconButton onClick={() => addCategory(addCategoryn)}>
                        <AddIcon />
                    </IconButton>
                    <br />
                    <br />
                    <div className="txt2">
                        <TextField
                            id="datetime-local"
                            label={moment(event.eventDate).format('DD-MM-yyyy')}
                            type="date"
                            className={classes.textField}
                            onChange={value => setdate(value.target.value)}
                            InputLabelProps={{ shrink: true, }} />
                        <TextField
                            id="time"
                            type="time"
                            defaultValue={event.startTime}
                            className={classes.textField}
                            onChange={value => settime(value.target.value)}
                            InputLabelProps={{ shrink: true, }}
                            inputProps={{ step: 300, }} />
                    </div>


                    <FileUploadPage />


                    <Button className="btn" onClick={() => { ref.current.toggle(); }}>{text.cancel}</Button>
                    <Button className="btn" onClick={() => { edit(event.eventId, name, content, price, id, addCategoryn, participant, date, time, img); handleClick(); ref.current.toggle(); }}>{text.ok}</Button>
                    <br />
                    <Button className="Dbtn" onClick={() => { ref.current.toggle(); remove(event.eventId); handleClick(); }}>{text.delete}</Button>
                </BackSide>
            </Flippy>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={localStorage.getItem('alert')}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
export default FCEvent;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));