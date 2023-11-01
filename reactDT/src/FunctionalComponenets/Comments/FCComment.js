import React, { useEffect, useContext, useState } from 'react';
import { WineContext } from '../../Context/WineContext';
import { Avatar, Paper } from '@material-ui/core';
import { ReactSmartScroller } from 'react-smart-scroller';




export default function FCComment(props) {
    const { comment, getComment } = useContext(WineContext);
    const [comments, setcomments] = useState([]);

    useEffect(() => {
        getComment(JSON.parse(localStorage.getItem('user')).wineryId);
        const t = [];
        const a = [];
        for (let i = 0; i < comment.length; i++) {
            if (comment[i].wineId == props.id) {
                if (comment[i].text != '') {
                    t.push(comment[i])
                }
            }
        }
        setcomments(t);
    }, [])

    return (
        <div className='comment'>



            <Paper className='commentpaper'>
                <div className='commenttop'>
                    <img src={props.wineImgPath} className="commentImg" />
                    <p> {props.name} </p>
                </div>
                <div style={{ overflowY:'auto', height:'370px' }}>
                        {comments.map((c, index) =>
                            <div>
                                <br />
                                <Avatar alt="Remy Sharp" src={c.UserPitcure} className='commentavatar' />

                                <p className='commentP'>
                                    {c.text}
                                </p>

                            </div>
                        )}
                    </div>
            </Paper>

        </div>
            );
}