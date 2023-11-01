import React, { createContext, useState, useEffect } from 'react';
import text from '../Elements/EText.json';

export const EventContext = createContext();

const EventContextProvider = (props) => {
    const [event, setEvent] = useState([]);
    const [allEvent, setAllEvent] = useState([]);
    const [category, setCategory] = useState([]);

    const loadDataE = async () => {
        try {
            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Event/GetWineryEvents?id=' + JSON.parse(localStorage.getItem('user')).wineryId,
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
                        setAllEvent(result);
                        localStorage.setItem('ALLevent', JSON.stringify(result));
                        console.log(result)
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
            getCategories();
        }
        catch (error) {
            console.log('no event to return')
        }

    }

    useEffect(() => {
        retrieveData();
    }, [])

    const retrieveData = () => {
        try {
            const value = localStorage.getItem('ALLevent');
            const valuec = localStorage.getItem('eventcategory');

            if (value !== null && valuec !== null) {
                allEvent(JSON.parse(value));
                setCategory(JSON.parse(valuec));
            }
        } catch (error) {
            return null;
        }
    };

    const sortByCategory = (id) => {
        fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Event/SortByCat?id=' + id + '&wineryId=' + JSON.parse(localStorage.getItem('winery')).wineryId,
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
                    setEvent(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    const remove = async (id) => {
        await fetch("https://proj.ruppin.ac.il/bgroup15/prod/api/Event/DeleteEvent?id=" + id,
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
                    loadDataE();
                }
            });
    }

    const getCategories = async () => {
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/EventCategory/GetAllEventsCategories',
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
                    localStorage.setItem('eventcategory', JSON.stringify(result));
                    setCategory(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    const sortEventDate = async (id, type) => {
        await fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/Event/GetEventByDate?id=${id}&type=${type}`,
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
                    setEvent(result);
                    localStorage.setItem('event', JSON.stringify(result));
                });
        getCategories();
    }

    const add = async (name, content, price, categoryId, addCategoryn, participantsAmount, eventDate, startTime) => {

        if (addCategoryn !== null) {
            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/EventCategory/GetCategoryId?name=' + addCategoryn,
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
                        categoryId = result.categoryId;
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }


        let img = localStorage.getItem('url');
        let newevent =
        {
            "eventName": name,
            "content": content,
            "price": price,
            "eventImgPath": img,
            "categoryId": categoryId,
            "wineryId": JSON.parse(localStorage.getItem('user')).wineryId,
            "participantsAmount": participantsAmount,
            "eventDate": eventDate,
            "startTime": startTime
        }
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Event/PostEvent',
            {
                method: 'POST',
                body: JSON.stringify(newevent),
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
                    loadDataE();
                    localStorage.setItem('url', '');
                },
                (error) => {
                    localStorage.setItem('alert', error)
                });
    }

    const edit = async (id, name, content, price, categoryId, addCategory, participantsAmount, eventDate, startTime, img) => {

        if (addCategory !== null) {
            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/EventCategory/GetCategoryId?name=' + addCategory,
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
                        categoryId = result.categoryId;
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }

        if (localStorage.getItem('url') !== img && localStorage.getItem('url') !== "" && localStorage.getItem('url') !== undefined && localStorage.getItem('url') !== null) {
            img = localStorage.getItem('url')
        }


        let update =
        {
            "eventName": name,
            "content": content,
            "price": price,
            "eventImgPath": img,
            "categoryId": categoryId,
            "wineryId": JSON.parse(localStorage.getItem('user')).wineryId,
            "participantsAmount": participantsAmount,
            "eventDate": eventDate,
            "startTime": startTime
        };

        await fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/Event/PutEvent?id=` + id,
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
                    loadDataE();
                    localStorage.setItem('url', '');
                    localStorage.setItem('alert', text.editAppend)

                },
                (error) => {
                    localStorage.setItem('alert', error)
                });
    }

    const addCategory = async (name) => {
        let newc =
        {
            "categoryName": name
        }
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/EventCategory/PostEventCategoey',
            {
                method: 'POST',
                body: JSON.stringify(newc),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json()
            })
    }

    return (
        <EventContext.Provider value={{ event, category, allEvent, add, remove, sortByCategory, loadDataE, edit, sortEventDate, getCategories, addCategory }}>
            {props.children}
        </EventContext.Provider>
    );
}
export default EventContextProvider;