import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import { Image } from 'react-bootstrap';
import BG from '../../Assets/BG.png';
import FCMenu from '../Home/FCMenu';
import FCUsertab from './FCUsertab';
import FCWinerytab from './FCWinerytab';
import FCAppbar from '../Home/FCAppbar';
import { withRouter } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    rootProfile: {
        flexGrow: 1,
        display: 'flex',
        marginLeft: '20%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));


 function FCProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { user } = useContext(AuthContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <FCMenu />
            <FCAppbar user={user} />

            <Image src={BG} fluid className='profileimgappbar' />
            <div className={classes.rootProfile}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs} >
                    <Tab label="פרטים אישיים" {...a11yProps(0)} />
                    <Tab label="פרטי יקב" {...a11yProps(1)} />
                </Tabs>


                <TabPanel value={value} index={0}>
                    <FCUsertab user={user} />
                </TabPanel>


                <TabPanel value={value} index={1}>
                   <FCWinerytab user={user}/>
                </TabPanel>

            </div>
        </div>
    );
}
export default withRouter(FCProfile);


