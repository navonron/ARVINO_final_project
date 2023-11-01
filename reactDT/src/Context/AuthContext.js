import React, { createContext, useState, useEffect } from 'react';
import text from '../Elements/EText.json';

const userIcon = 'https://proj.ruppin.ac.il/bgroup15/prod/FinalPics/user.jpg'
export const AuthContext = createContext();


const AuthContextProvider = (props) => {

    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const phoneRegex = new RegExp(/^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{10,15}$/);
    const [area, setArea] = useState([]);
    const [user, setUser] = useState({
        name: '',
        picture: userIcon,
        email: '',
        password: '',
        id: '',
        wname: '',
        wemail: '',
        address: '',
        phone: '',
        area: '',
        areaId: '',
        wineryAreaName: ''
    });

    useEffect(() => {
        retrieveData();
    }, [])

    const retrieveData = () => {
        try {
            const value = JSON.parse(localStorage.getItem('user'));

            if (value !== null) {
                setUser({
                    name: value.Name,
                    picture: value.wineryImage,
                    email: value.email,
                    id: value.wineryId,
                    wname: value.wineryName,
                    address: value.wineryAddress,
                    phone: value.phone,
                    wemail: value.wineryEmail,
                    area: value.areaName,
                    areaId: value.areaId,
                    wineryAreaName: value.wineryAreaName
                })
            }
        } catch (error) {
            console.log('Not login')
        }
    };

    const login = async (myEmail, myPassword) => {
        await fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Winery/GetWineryUser?email=' + myEmail,
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
                    if (result.email !== null && result.password === myPassword) {
                        localStorage.setItem('user', JSON.stringify(result));
                        setUser({
                            name: result.Name,
                            picture: result.wineryImage,
                            email: result.email,
                            id: result.wineryId,
                            wname: result.wineryName,
                            address: result.wineryAddress,
                            phone: result.phone,
                            wemail: result.wineryEmail,
                            area: result.areaName,
                            areaId: result.areaId,
                            wineryAreaName: result.wineryAreaName
                        })
                        localStorage.removeItem('err');
                    }
                    else {
                        localStorage.setItem('err', text.loginerr);
                    }
                },
                (error) => {
                    localStorage.setItem('err', text.severERR);
                });
    }

    const getArea = () => {
        fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/AreaCategory/GetAllAreaCategories',
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
                    setArea(result)
                },
                (error) => {
                    console.log("err post=", error);
                }, []);
    }

    const singup = (name, email, password, wname, wemail, address, phone, area) => {
        let newuser = {
            "Name": name,
            "email": email,
            "password": password,
            "typeId": '2'
        }

        fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/User/PostUser',
            {
                method: 'POST',
                body: JSON.stringify(newuser),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                postW(email, wname, wemail, address, phone, area)
                return res.json()
            })
            .then(
                (result) => {

                },
                (error) => {
                    console.log("err post=", error);
                });


    }

    const postW = (email, wname, wemail, address, phone, area) => {
        let winery = {
            "wineryName": wname,
            "wineryAddress": address,
            "wineryEmail": wemail,
            "phone": phone,
            "IconImgPath": localStorage.getItem('url'),
            "wineryManagerEmail": email,
            "areaId": area
        }

        fetch('https://proj.ruppin.ac.il/bgroup15/prod/api/Winery/PostNewWinery',
            {
                method: 'POST',
                body: JSON.stringify(winery),
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
                    localStorage.removeItem("URL");
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    const putUser = async (email, password, Name) => {

        let update =
        {
            "email": email,
            "password": password,
            "Name": Name,
        };

        await fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/User/PutUser?email=${email}`,
            {
                method: 'PUT',
                body: JSON.stringify(update),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                console.log('res=', res);
                console.log('res.status', res.status);
                console.log('res.ok', res.ok);
                return res.json()
            })
            .then(
                (result) => {
                    login(email, password);
                    localStorage.setItem('alert', text.profileSaved)
                },
                (error) => {
                    localStorage.setItem('alert', error)
                });
    }

    const putWinery = async (id, name, address, email, phone, img, areaId) => {

        if (localStorage.getItem('url') !== img && localStorage.getItem('url') !== "" && localStorage.getItem('url') !== undefined && localStorage.getItem('url') !== null) {
            img = localStorage.getItem('url')
        }
        let update =
        {
            "wineryName": name,
            "wineryAddress": address,
            "wineryEmail": email,
            "phone": phone,
            "IconImgPath": img,
            "areaId": areaId
        };

        await fetch(`https://proj.ruppin.ac.il/bgroup15/prod/api/Winery/PutWinery?id=${id}`,
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
                    localStorage.setItem('url', '');
                    login(JSON.parse(localStorage.getItem('user')).email, JSON.parse(localStorage.getItem('user')).password)
                    localStorage.setItem('alert', text.profileSaved)
                },
                (error) => {
                    localStorage.setItem('alert', error)
                });
    }

    return (
        <AuthContext.Provider value={{ user, area, emailRegex, phoneRegex, singup, getArea, login, putWinery, putUser }} >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;