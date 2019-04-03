import React, { Component } from 'react';
//import Axios from 'axios';
//import { URL } from '../../../../config'

import styles from './articles.module.css';
import Header from './header';
import { firebase, firebaseDB, firebaseTeams, firebaseLooper } from '../../../../firebase';

class NewsArticles extends Component {

    state={
        article:[],
        team:[],
        imageURL:''
    }

    componentWillMount(){

        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();
            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseLooper(snapshot);

                firebase.storage().ref('images')
                .child(article.image).getDownloadURL()
                .then(url =>{
                    this.setState({
                    imageURL:url,
                    team,
                    article
                    })
                })

                //this.setState({
                //    article,
                //    team
                //})
                
                //this.getImageURL(article.image)
            })
        })

        //Axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        //.then(response =>{
        //    let article=response.data[0];
        //    Axios.get(`${URL}/teams?id=${article.team}`)
        //    .then(response=>{
        //        this.setState({
        //            article,
        //           team: response.data
        //        })
        //    })
        //})
    }

    //getImageURL = (filename)=>{
    //    firebase.storage().ref('images')
    //    .child(filename).getDownloadURL()
    //    .then(url =>{
    //        this.setState({
    //           imageURL:url
    //        })
    //    })
    //}

    render() {
        let article=this.state.article;
        let team=this.state.team;
        return (
            <div className={styles.articleWrapper}>
                <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />
                <div className={styles.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={styles.articleImage}
                        style={{
                            background:`url(${this.state.imageURL})`
                        }}
                    ></div>
                    <div className={styles.articleText}
                        dangerouslySetInnerHTML={{__html:article.body}}
                    >
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsArticles;