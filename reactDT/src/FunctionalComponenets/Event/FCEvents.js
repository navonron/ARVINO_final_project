import React, { useEffect, useState } from 'react';
import FCEvent from '../Event/FCEvent';
import text from '../../Elements/EText.json'

const FCEvents = ({ event, value }) => {
    const [alert, setalert] = useState('')

    useEffect(() => {
        if (event.length) {
            switch (value) {
                case '1':
                    setalert(text.noeventstoday)
                    break;
                case '2':
                    setalert(text.noeventsweek)
                    break;
                case '3':
                    setalert(text.noeventsmonth)
                    break;
            }
        }
    }, [])

    return event.length ? (
        <div>
            {event.map((event, index) => {
                return (<FCEvent event={event} index={index} />);
            })}
        </div>
    ) : (
        <p className="txtEVENT"> {alert} </p>
    )
}
export default FCEvents;