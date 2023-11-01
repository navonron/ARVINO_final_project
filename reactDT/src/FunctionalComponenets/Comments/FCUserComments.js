import React, { useContext, useEffect } from 'react';
import FCMenu from '../Home/FCMenu';
import text from '../../Elements/EText.json';
import FCComments from './FCComments';
import { WineContext } from '../../Context/WineContext';
import { AuthContext } from '../../Context/AuthContext';
import FCAppbar from '../Home/FCAppbar';
import { withRouter } from 'react-router-dom';


 function FCUserComments() {
    const { loadData, wine } = useContext(WineContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            <FCMenu />
            <FCAppbar user={user} />
            <div>
                <div className="tWine">
                    <h1>{text.userComments}</h1>
                </div>
                <div>
                    <FCComments wine={wine} />
                </div>
            </div>
        </div>
    )
}
export default withRouter(FCUserComments);
