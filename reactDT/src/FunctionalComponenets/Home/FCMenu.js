import React, { useState } from 'react';
import text from '../../Elements/EText.json';
import arvino from '../../Assets/Logo small.png';
import { Link } from 'react-router-dom';

export default function FCMenu() {
    const [startAnimate, setStartAnimate] = React.useState(false);
    const [highlightTopPosition, setStateHighlightTopPosition] = React.useState(0);
    const [currCount, setCurrCount] = React.useState(0);

    return (
        <div>
            <div className="container">
                <div className="sidebar" style={{ height: "100vh" }}>
                    <div style={{ top: `${highlightTopPosition}px` }} className={`sidebar__highlight ${startAnimate && 'sidebar__highlight__animate'}`}></div>

                    <Link to='/FCHome'>
                        <img className='sidebarLOGO' src={arvino} />
                    </Link>
                    <Link to='/FCProfile'>
                        {text.seeProfile}
                    </Link>
                    <Link to='/FCWatchWines'>
                        {text.watchWines}
                    </Link>
                    <Link to='/FCWatchService'>
                        {text.watchServise}
                    </Link>
                    <Link to='/FCWatchEvent'>
                        {text.watchevent}
                    </Link>
                    <Link to='/FCUserComments'>
                        {text.userComments}
                    </Link>


                   
                  
                    <br />
                    <a className={currCount === 3 && 'active'}>
                        <span className={currCount === 3 && 'text-active'}>
                            {text.status}
                            <p className={JSON.parse(localStorage.getItem('user')).statusType === 'פעיל' ? 'statusActive' : 'status'}>
                                {JSON.parse(localStorage.getItem('user')).statusType}
                            </p>
                        </span>
                    </a>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Link to='/' onClick={() => localStorage.clear()}>
                        {text.logout}
                    </Link>
                </div>
            </div>
        </div>
    )
}


