import React, { Component } from 'react';
import { firebase,firebaseArticles, firebaseLooper } from '../../../firebase'
//import Axios from 'axios';
//import { URL } from '../../../config';

import SliderTemplates from './sliderTemplates';

class NewsSlider extends Component {

    state={
        news: []
    }

    componentWillMount(){

        firebaseArticles.limitToLast(1).once('value')
        .then((snapshot)=>{
            
            const news = firebaseLooper(snapshot);

            //news.forEach((item,i)=>{
            //    firebase.storage().ref('images')
            //    .child(item.image).getDownloadURL()
            //    .then( url =>{
            //        this.setState({
            //            news
            //        })
            //    })
           // })

           const asyncFunction = (item,i,cb)=>{
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then( url =>{
                    news[i].image=url
                    cb();
                })
           }

           //let request=[]
           let request = news.map((item,i)=>{
               return new Promise((resolve)=>{
                   asyncFunction(item,i,resolve)
               })
           })

           Promise.all(request).then(()=>{
               this.setState({
                   news
               })
           })
            
        })

        /*Axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        .then(response=>{
            this.setState({
                news: response.data
            })
        })*/
        console.log(this.props.settings)
    }

    render() {
        return (
            <div>
               <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            </div>
        );
    }
}

export default NewsSlider;