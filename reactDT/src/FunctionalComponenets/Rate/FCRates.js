import React from 'react';
import FCRate from '../Rate/FCRate';
import text from '../../Elements/EText.json'

const FCRates = ({ rate }) => {

    return rate.length ? (
        <div>
            {rate.map((rate, index) => {
                return (<FCRate rate={rate} index={index} />);
            })}
        </div>
    ) : (
        <p> {text.noRatetoreturn} </p>
    )
}
export default FCRates;