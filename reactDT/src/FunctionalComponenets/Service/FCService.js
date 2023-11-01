import React, { useContext, useState, useRef, useEffect } from 'react';
import { IconButton, TextField, Button, Snackbar } from '@material-ui/core';
import { ServiceContext } from '../../Context/ServiceContext';
import Sync from '@material-ui/icons/Sync';
import text from '../../Elements/EText.json';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import FCServicePicture from './FCServicePicture';
import CloseIcon from '@material-ui/icons/Close';

const FCService = ({ service }) => {
    const { remove, edit } = useContext(ServiceContext);

    const [name, setName] = useState(service.serviceName);
    const [content, setContent] = useState(service.content);
    const [price, setPrice] = useState(service.price);
    const [mycategory, setmycategory] = useState(service.serviceCategory);
    const [img, setImg] = useState([]);
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

    useEffect(() => {
        fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/ServiceImage?serviceId=` + service.serviceId,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    setImg(result)
                },
                (error) => {
                    console.log("err post=", error);
                });
    }, [])

    return (
        <div className="wine">
            <Flippy flipOnHover={false} flipOnClick={false} flipDirection="horizontal" ref={ref} >
                <FrontSide className="wine">
                    <h1> {name} </h1>
                    <p> {mycategory} </p>
                    <p> {content} </p>
                    <p> {price} ₪ </p>
                    <Button className="btn" onClick={() => { ref.current.toggle(); }}>{text.edit}</Button>
                    <FCServicePicture picture={img} id={service.serviceId} /> :
                </FrontSide>

                <BackSide className="wine">
                    <TextField
                        placeholder={service.serviceName}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = service.serviceName}
                        onChange={value => setName(value.target.value)} />
                    <TextField
                        placeholder={service.content}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = service.content}
                        onChange={value => setContent(value.target.value)} />
                    <TextField
                        placeholder={service.price}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = service.price}
                        onChange={value => setPrice(value.target.value)} />
                    <TextField
                        placeholder={service.serviceCategory}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = service.serviceCategory}
                        onChange={value => setmycategory(value.target.value)} />


                    <br />
                    <br />
                    <br />

                    <Button className="btn" onClick={() => {
                        ref.current.toggle();
                        edit(service.serviceId, name, content, price, mycategory); handleClick();
                    }}>{text.ok}
                    </Button>

                    <br />
                    <Button className="btn" onClick={() => { ref.current.toggle(); }}>{text.cancel}</Button>
                    <br />

                    <Button className="Dbtn" onClick={() => {
                        ref.current.toggle();
                        remove(service.serviceId);
                        handleClick();
                    }}>{text.delete}</Button>
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
export default FCService;