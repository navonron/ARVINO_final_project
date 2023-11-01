import React from 'react';
import FCWine from '../Wine/FCWine';
import text from '../../Elements/EText.json';

const FCWines = ({wine}) => {

    return wine.length ? (
        <div>
            {wine.map((wine, index) => {
                return (<FCWine wine={wine} index={index} />);
            })}
        </div>
    ) : (
        <p> {text.noWinesToReturn} </p>
    )
}
export default FCWines;