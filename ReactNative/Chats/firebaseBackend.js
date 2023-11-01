// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from 'firebase';

export default class Backend{

    uid='';
    messagesRef='';

    constructor(){
       firebase.initializeApp({
        apiKey: "AIzaSyBWjZ2XNHUScEekycuk0W3NewXvImCKypg",
        authDomain: "arvinochat.firebaseapp.com",
        projectId: "arvinochat",
        storageBucket: "arvinochat.appspot.com",
        messagingSenderId: "607298040489",
        appId: "1:607298040489:web:ac9402473914253d966fb8",
        measurementId: "G-YZTZX4QHBK"
       });

    }


}