import React from 'react';
import FCComment from '../Comments/FCComment';
import text from '../../Elements/EText.json';



export default function FCComments({wine}) {
    return wine.length ? (
        <div>
            {wine.map((wine, index) => {
                return (<FCComment name={wine.wineName} wineImgPath={wine.wineImgPath} id={wine.wineId} index={index} />);
            })}
        </div>
    ) : (
        <p> {text.noWinesToReturn} </p>
    )
}
