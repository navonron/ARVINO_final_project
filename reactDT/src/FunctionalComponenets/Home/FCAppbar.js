import React from 'react';
import { Avatar, Paper} from '@material-ui/core';
import mytext from '../../Elements/EText.json';
import { Link } from 'react-router-dom';

export default function FCAppbar({ user }) {
    return (
        <div className="appbar">
            <Paper>
                <p className="appbartxt">{mytext.winery} {user.wname}</p>
                <Link to='/FCProfile' className='linkappbar'>
                    <Avatar className="avatar" src={user.picture} />
                </Link>
            </Paper>
        </div>
    );
}


