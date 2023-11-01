import React, { createContext, useState, useEffect } from 'react';
import text from '../Elements/EText.json';
export const ServiceContext = createContext();

const ServiceContextProvider = (props) => {
    const [service, setService] = useState([]);
    const [category, setCategory] = useState([]);


    const loadDatas = async () => {
        try {
            await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Service/GetWineryService?id=' + JSON.parse(localStorage.getItem('user')).wineryId,
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
                        setService(result);
                        localStorage.setItem('service', JSON.stringify(result));
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }
        catch (error) {
            console.log('no service to return')
        }
    }

    useEffect(() => {
        retrieveData();
        fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Service/GetCategories',
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
                    localStorage.setItem('servicecategory', JSON.stringify(result));
                    setCategory(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }, [])

    const retrieveData = () => {
        try {
            const value = localStorage.getItem('service');

            if (value !== null) {
                const data = JSON.parse(value);
                return setService(data)
            }
        } catch (error) {
            console.log('Not login')
        }
    };

    const add = async (name, content, price, category) => {
        retrieveData();
        let img = localStorage.getItem('URL');

        let newservice =
        {
            "serviceName": name,
            "content": content,
            "price": price,
            "serviceCategory": category,
            "wineryId": JSON.parse(localStorage.getItem('user')).wineryId
        }
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Service/PostService',
            {
                method: 'POST',
                body: JSON.stringify(newservice),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json();
            })
            .then(
            (result) => {
                loadDatas();
            },
            (error) => {
                localStorage.setItem('alert', error)
            });

    }

    const remove = async (id) => {
        setService(service.filter(service => service.id !== id))

        await fetch("https://proj.ruppin.ac.il/bgroup15/prod/api/Service/DeleteService?id=" + id,
            {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                console.log('res.ok', res.ok);

                if (res.ok) {
                    loadDatas();
                    localStorage.setItem('alert', text.remove)
                }
                else
                    localStorage.setItem('alert', text.error)
            });
    }

    const edit = async (id, name, content, price, category) => {

        let update =
        {
            "serviceName": name,
            "content": content,
            "price": price,
            "wineryId": JSON.parse(localStorage.getItem('user')).wineryId,
            "serviceCategory": category

        };
        await fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/Service/PutService?id=` + id,
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
                    localStorage.setItem('alert', text.editAppend)
                    loadDatas();

                },
                (error) => {
                    localStorage.setItem('alert', error)
                });
    }

    const addPic = async (id) => {
        let newImg =
        {
            "serviceId": id,
            "ImgPath": localStorage.getItem('url')
        }
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/ServiceImage/Post',
            {
                method: 'POST',
                body: JSON.stringify(newImg),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    localStorage.setItem('alert', text.add)
                    loadDatas();
                    localStorage.setItem('url', '');
                },
                (error) => {
                    localStorage.setItem('alert', error)
                });
    }

    const removePic = async (id) => {

        await fetch("https://proj.ruppin.ac.il/bgroup15/prod/api/ServiceImage/" + id,
            {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                console.log('res.ok', res.ok);

                if (res.ok) {
                    loadDatas();
                    localStorage.setItem('alert', text.remove)
                }
                else
                    localStorage.setItem('alert', text.error)
            });
    }

    const editPic = async (img, id) => {

        if (localStorage.getItem('url') !== img && localStorage.getItem('url') !== "[object Object]" && localStorage.getItem('url') !== undefined && localStorage.getItem('url') !== null) {
            img = localStorage.getItem('url');
        }
        let newImg =
        {
            "ImgPath": img
        }

        fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/ServiceImage/` + id,
            {
                method: 'PUT',
                body: JSON.stringify(newImg),
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
                    localStorage.setItem('url', '');
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    return (
        <ServiceContext.Provider value={{ service, category, add, remove, loadDatas, edit, addPic, removePic, editPic }}>
            {props.children}
        </ServiceContext.Provider>
    );
}
export default ServiceContextProvider;