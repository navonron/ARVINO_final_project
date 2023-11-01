import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { EventContext } from '../../Context/EventContext';
import { WineContext } from '../../Context/WineContext';
import { ServiceContext } from '../../Context/ServiceContext';
import { Tab, AppBar, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { ReactSmartScroller } from 'react-smart-scroller';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import EventIcon from '@material-ui/icons/Event';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import text from '../../Elements/EText.json';
import FCMenu from './FCMenu';
import FCEvents from '../Event/FCEvents';
import FCRates from '../Rate/FCRates';
import FCAppbar from './FCAppbar';
import FCAddWine from '../Wine/FCAddWine';
import FCAddService from '../Service/FCAddService';
import FCAddEvent from '../Event/FCAddEvent';
import wineglass from '../../Assets/wine-glass.png';
import calendar from '../../Assets/calendar .png';
import traveler from '../../Assets/traveler.png';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function FCHome() {
    const { user } = useContext(AuthContext);
    const { loadDatas, service } = useContext(ServiceContext);
    const { sortEventDate, event, allEvent, loadDataE } = useContext(EventContext);
    const { rate, getRate, wine, loadData } = useContext(WineContext);
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
    const [openw, setOpenw] = useState(false);
    const [opene, setOpene] = useState(false);
    const [opens, setOpens] = useState(false);

    useEffect(() => {
        loadDataE();
        loadData();
        getRate();
        loadDatas();
        sortEventDate((JSON.parse(localStorage.getItem('user')).wineryId), '1');
    }, [])

    const closeAdd = () => {
        setOpenw(false)
        setOpene(false)
        setOpens(false)
    }

    const handleChange = async (event, newValue) => {
        sortEventDate((JSON.parse(localStorage.getItem('user')).wineryId), newValue);
        setValue(newValue);
    };

    return (
        <div className='home'>
            <FCMenu />
            <FCAppbar user={user} />
            <div className="winediv">
                <div className={classes.root}>

                    <div>
                        <Button onClick={() => { setOpenw(true) }}>
                            <img className='imgbtn' src={wineglass} />
                        </Button>
                        <Button onClick={() => { setOpene(true) }}>
                            <img className='imgbtn' src={calendar} />
                        </Button>
                        <Button onClick={() => { setOpens(true) }}>
                            <img className='imgbtn' src={traveler} />
                        </Button>
                    </div>

                    <div>

                        <div className="winediv">
                            <FCAddWine open={openw} closeAdd={closeAdd} />
                        </div>
                        <div className="winediv">
                            <FCAddEvent open={opene} closeAdd={closeAdd} />
                        </div>
                        <div className="winediv">
                            <FCAddService open={opens} closeAdd={closeAdd} />
                        </div>
                    </div>


                    <ButtonGroup
                        className="btnG2"
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical contained primary button group"
                        variant="text">
                        <Button className='font' startIcon={<LocalBarIcon />}>{text.winea} {wine.length ? wine.length : 0}</Button>
                        <Button className='font' startIcon={<EventIcon />}> {text.eventa}  {allEvent.length ? allEvent.length : 0}</Button>
                        <Button className='font' startIcon={<RoomServiceIcon />}>{text.servicea}  {service.length ? service.length : 0} </Button>
                    </ButtonGroup>

                    <TabContext value={value}>
                        <AppBar position="static" className="AppBar">
                            <TabList onChange={handleChange} aria-label="simple tabs example">
                                <Tab label={text.monthEvent} value="3" />
                                <Tab label={text.weekEvents} value="2" />
                                <Tab label={text.todayEvents} value="1" />
                            </TabList>
                        </AppBar>
                        <ReactSmartScroller trackProps={{ height: 1 }}>
                            <TabPanel className="tabpanel" value="1"><FCEvents event={event} value={value} /></TabPanel>
                            <TabPanel className="tabpanel" value="2"><FCEvents event={event} value={value} /></TabPanel>
                            <TabPanel className="tabpanel" value="3"><FCEvents event={event} value={value} /></TabPanel>
                        </ReactSmartScroller>
                    </TabContext>
                </div>
            </div>
            <h1>{text.top}</h1>
            <div className="rating">
                <FCRates rate={rate} />
            </div>
        </div>
    )
}

export default withRouter(FCHome);

