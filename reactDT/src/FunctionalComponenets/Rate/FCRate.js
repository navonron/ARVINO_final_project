import React, { useContext, useRef } from 'react';
import { Box, Paper } from '@material-ui/core';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';


const FCRate = ({ rate }) => {

return (
    <div className="ratediv">
        <Paper>
                <img src={rate.winePitcure} className="rateImg" />
                <p> {rate.wineName} </p>
                <Box component="fieldset" borderColor="transparent" className='rate'>
                    <StyledRating
                        name="customized-color"
                        max={5}
                        defaultValue={rate.rate}
                        precision={1}
                        disabled
                        icon={<LocalBarIcon className="rate" fontSize="inherit" />}
                    />
                </Box>

        </Paper>
    </div>
);
}
export default FCRate;


const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d77',
    },
    iconHover: {
        color: '#ff3d57',
    },
})(Rating);



