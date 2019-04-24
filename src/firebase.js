import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCL0JDDkcQ5yOK0eqXoQW4eN6xTq1vu8qo",
    authDomain: "nba-fullstack-8dda7.firebaseapp.com",
    databaseURL: "https://nba-fullstack-8dda7.firebaseio.com",
    projectId: "nba-fullstack-8dda7",
    storageBucket: "nba-fullstack-8dda7.appspot.com",
    messagingSenderId: "155216418198"
};

firebase.initializeApp(config);

const firebaseDB= firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot)=>{
    const data = []
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    })
    
    return data;
}

export {
    firebaseDB,
    firebaseArticles,
    firebase,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}
