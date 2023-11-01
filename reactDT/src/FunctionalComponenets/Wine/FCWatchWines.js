import React, { useState, useContext, useEffect } from 'react';
import FCMenu from '../Home/FCMenu';
import text from '../../Elements/EText.json';
import FCWines from './FCWines';
import { Select, MenuItem, Button, IconButton } from '@material-ui/core';
import { WineContext } from '../../Context/WineContext';
import { AuthContext } from '../../Context/AuthContext';
import FCAddWine from '../Wine/FCAddWine';
import FCAppbar from '../Home/FCAppbar';
import { withRouter } from 'react-router-dom';


function FCWatchWines() {
    const { wine, category, sortByCategory, loadData } = useContext(WineContext);
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, [])

    const openAdd = () => {
        setOpen(true)
    }

    const closeAdd = () => {
        setOpen(false)
    }

    return (
        <div>
            <FCMenu />
            <FCAppbar user={user} />
            <FCAddWine open={open} closeAdd={closeAdd} />
            <div>
                <div className="tWine">

                    <h1>{text.watchWines}</h1>

                    {category.length ?
                        <Select label={text.wineryArea} onChange={e => sortByCategory(e.target.value)}>
                            {category.map((option, index) => (<option value={option.categoryId}>{option.categoryName}</option>))}
                            <MenuItem onClick={() => { window.location.reload() }}> <p className='text' > {text.clearSort} </p> </MenuItem>
                        </Select>
                        :
                        <div> {text.caterr} </div>}
                    <br />
                    <Button className="wineBTN" onClick={() => { openAdd(); }}>{text.addWine}</Button>
                </div>
                <div className="winediv">
                    <FCWines wine={wine} />
                </div>

            </div>
        </div>
    )
}

export default withRouter(FCWatchWines);