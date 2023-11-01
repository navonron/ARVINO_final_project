import React, { useContext, useState, useRef } from 'react';
import { IconButton, TextField, Button, Select, Snackbar } from '@material-ui/core';
import { WineContext } from '../../Context/WineContext';
import Sync from '@material-ui/icons/Sync';
import text from '../../Elements/EText.json';
import FileUploadPage from '../FileUpload/FileUploadPage';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import CloseIcon from '@material-ui/icons/Close';

const FCWine = ({ wine, index }) => {
    const { remove, category, edit } = useContext(WineContext);

    const [name, setName] = useState(wine.wineName);
    const [content, setContent] = useState(wine.content);
    const [price, setPrice] = useState(wine.price);
    const [id, setId] = useState(wine.categoryId);
    const [img] = useState(wine.wineImgPath);
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
                    <img src={img} className="wineImg" />
                    <h1> {name} </h1>
                    <p> {text.wines} {wine.categoryName} </p>
                    <p> {content} </p>
                    <p> {price} ₪ </p>
                    <Button className="btn" onClick={() => { ref.current.toggle(); }}>{text.edit}</Button>
                </FrontSide>

                <BackSide className="wine">
                    <div className="card">
                        <TextField
                            placeholder={wine.wineName}
                            onFocus={(e) => e.target.placeholder = ''}
                            onBlur={(e) => e.target.placeholder = wine.wineName}
                            onChange={value => setName(value.target.value)} />
                    </div>

                    <TextField
                        placeholder={wine.content}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = wine.content}
                        onChange={value => setContent(value.target.value)} />
                    <TextField
                        placeholder={wine.price}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = wine.price}
                        onChange={value => setPrice(value.target.value)} />

                    <p>{text.category} : {wine.categoryName}</p>
                    {category.length ?
                        <Select className="sortselectWine" label={text.wineryArea} onChange={e => setId(e.target.value)}>
                            {category.map((option, index) => (<option value={option.categoryId}> {option.categoryName} </option>))}
                        </Select>
                        :
                        <div> {text.caterr} </div>}
                    <p className="tinyText">{text.changeCategory}</p>

                    <br />
                    <br />


                    <FileUploadPage />
                    <p className="tinyText">{text.changeimg}</p>

                    <br />
                    <br />
                    <br />

                    <Button className="btn" onClick={() => { ref.current.toggle(); edit(wine.wineId, name, content, price, id, img); }}>{text.ok}</Button>
                    <br />
                    <Button className="btn" onClick={() => { ref.current.toggle(); }}>{text.cancel}</Button>
                    <br />
                    <Button className="Dbtn" onClick={() => { ref.current.toggle(); remove(wine.wineId, index); }}>{text.delete}</Button>
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
export default FCWine;