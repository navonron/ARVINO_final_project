import React from 'react';
import FCService from '../Service/FCService';
import text from '../../Elements/EText.json';

const FCServices = ({service}) => {

    return service.length ? (
        <div>
            {service.map((service, index) => {
                return (<FCService service={service} index={index} />);
            })}
        </div>
    ) : (
        <p> {text.noWinesToReturn} </p>
    )
}
export default FCServices;