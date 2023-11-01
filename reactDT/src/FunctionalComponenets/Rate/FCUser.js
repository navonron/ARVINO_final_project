import React from 'react';
import text from '../../Elements/EText.json'
import { Avatar } from '@material-ui/core';

const FCUser = ({ user }) => {

    return user.length ? (
        <div>
            {user.map((user) => {
                return (<Avatar src={user.UserPitcure} />);
            })}
        </div>
    ) : (
        <p> {text.noRatetoreturn} </p>
    )
}
export default FCUser;
