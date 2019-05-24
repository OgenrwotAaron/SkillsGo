import React, { Component } from 'react';
import SliderTemplates from './sliderTemplates';
import { firebase,firebaseArticles, firebaseLooper } from '../../../firebase';

class TopSlider extends Component {

    state={
        news:[]
    }

    componentWillMount(){

        firebaseArticles.limitToLast(5).once('value')
        .then((snapshot)=>{
            
            const news = firebaseLooper(snapshot);

           const asyncFunction = (item,i,cb)=>{
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then( url =>{
                    news[i].image=url
                    cb();
                })
           }
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

export default TopSlider;