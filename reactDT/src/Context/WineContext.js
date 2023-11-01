import React, { createContext, useState, useEffect } from 'react';
import text from '../Elements/EText.json'

export const WineContext = createContext();

const WineContextProvider = (props) => {
    const [wine, setWine] = useState([]);
    const [rate, setRate] = useState([]);
    const [category, setCategory] = useState([]);
    const [user, setUser] = useState([])
    const [comment, setcomment] = useState([])

    useEffect(() => {
        retrieveData();
    }, [])

    const retrieveData = () => {
        try {
            const value = localStorage.getItem('wine');
            const valuec = localStorage.getItem('category');

            if (value !== null && valuec !== null) {
                setWine(JSON.parse(value));
                setCategory(JSON.parse(valuec));
            }
        } catch (error) {
            return null;
        }
    };

    const loadData = async () => {
        try {
            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Wine/GetWineryWines?id=' + JSON.parse(localStorage.getItem('user')).wineryId,
                {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                })
                .then(res => {
                    return res.json()
                })
                .then(
                    (result) => {
                        setWine(result);
                        localStorage.setItem('wine', JSON.stringify(result));
                    },
                    (error) => {
                        console.log("err post=", error);
                    });


            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Wine/GetCategory',
                {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                })
                .then(res => {
                    return res.json()
                })
                .then(
                    (result) => {
                        setCategory(result);
                        localStorage.setItem('category', JSON.stringify(result));
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }
        catch (error) {
            console.log('no Wine to return')
        }
    }

    const sortByCategory = (id) => {
        fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Wine/GetSortCategory?id=' + id + '&wineryId=' + JSON.parse(localStorage.getItem('user')).wineryId,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    setWine(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    const add = async (wineName, content, price, categoryId) => {

        let wineImgPath = localStorage.getItem('url');

        setWine([...wine, { wineName, content, price, categoryId, wineImgPath }])


        let newwine =
        {
            "wineName": wineName,
            "content": content,
            "price": price,
            "wineImgPath": wineImgPath,
            "wineLabelPath": wineImgPath,
            "categoryId": categoryId,
            "wineryId": JSON.parse(localStorage.getItem('user')).wineryId
        }
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Wine/PostWine',
            {
                method: 'POST',
                body: JSON.stringify(newwine),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    loadData();
                    localStorage.setItem('url', '');
                },
                (error) => {
                    localStorage.setItem('alert', error)
                });

    }

    const remove = async (id, index) => {
        setWine(wine.splice(index, 1));

        await fetch("https://proj.ruppin.ac.il/bgroup15/prod/api/Wine/DeleteWine?id=" + id,
            {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                console.log('res.ok', res.ok);

                if (res.ok)
                {
                    loadData();
                    localStorage.setItem('alert', text.remove)
                }
                else
                    localStorage.setItem('alert', text.error)
            });
    }

    const edit = async (id, name, content, price, categoryId, img) => {

        if (localStorage.getItem('url') !== img && localStorage.getItem('url') !== "[object Object]"
            && localStorage.getItem('url') !== undefined && localStorage.getItem('url') !== null) {
            img = localStorage.getItem('url');
        }
        let update =
        {
            "wineName": name,
            "content": content,
            "price": price,
            "wineImgPath": img,
            "wineLabelPath": img,
            "categoryId": categoryId,
            "wineryId": JSON.parse(localStorage.getItem('winery')).wineryId

        };


        fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/Wine/PutWine?id=` + id,
            {
                method: 'PUT',
                body: JSON.stringify(update),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    loadData();
                    localStorage.setItem('url', '');
                    localStorage.setItem('alert', text.editAppend)

                },
                (error) => {
                    localStorage.setItem('alert', error)
                });
    }

    const getRate = async () => {
        if (JSON.parse(localStorage.getItem('user')).wineryId == '') {
            setRate('');
        }
        else {
            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Rate/GetTopWine?Id=' + JSON.parse(localStorage.getItem('user')).wineryId,
                {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                })
                .then(res => {
                    return res.json()
                })
                .then(
                    (result) => {
                        setRate(result);
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }

    }

    const getComment = async () => {
        if (JSON.parse(localStorage.getItem('user')).wineryId == '') {
            setRate('');
        }
        else {
            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Rate/GetWineryComment?Id=' + JSON.parse(localStorage.getItem('user')).wineryId,
                {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                })
                .then(res => {
                    return res.json()
                })
                .then(
                    (result) => {
                        setcomment(result);
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }

    }

    const getUser = async (id) => {
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Rate/GetUserRate?Id=' + id,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    setUser(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    return (
        <WineContext.Provider value={{ wine, comment, category, rate, user, getComment, getUser, getRate, add, remove, sortByCategory, loadData, edit }}>
            {props.children}
        </WineContext.Provider>
    );
}
export default WineContextProvider;