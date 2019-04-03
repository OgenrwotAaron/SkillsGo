import React, { Component } from 'react';
//import Axios from 'axios';

//import {URL} from '../../../config';
import Button from '../Buttons/buttons';
import styles from './VideosList.module.css';
import VideosListTemplate from './videosListTemplate';
import { firebaseTeams, firebaseLooper, firebaseVideos } from '../../../firebase';

class VideosList extends Component {

    state={
        teams: [],
        videos: [],
        start: this.props.start,
        end:this.props.start+this.props.amount,
        amount:this.props.amount
    }

    componentWillMount(){
        this.request(this.state.start,this.state.end)
    }

    request=(start, end)=>{

        if(this.state.teams.length< 1){
            /*Axios.get(`${URL}/teams`)
            .then(response=>{
                this.setState({
                    teams: response.data
                })
            })*/
            firebaseTeams.once('value')
            .then((snapshot)=>{
                const teams = firebaseLooper(snapshot)
                this.setState({
                    teams
                })
            })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const videos = firebaseLooper(snapshot);
            this.setState({
                videos: [...this.state.videos,...videos],
                start,
                end
            })
        })

        /*Axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        .then(response=>{
            this.setState({
                videos: [...this.state.videos,...response.data],
                start,
                end
            })
        })*/
    }

    renderTitle=()=>{
        return this.props.title ? 
         <h3><strong>NBA</strong>Videos</h3>
        :null
    }

    renderVideos=()=>{
        let template=null;
        switch(this.props.type){
            case('card'):
                template=<VideosListTemplate data={this.state.videos} teams={this.state.teams}/>
            break;
            default:
                template=null;
        }
        return template;
    }

    loadMore=()=>{
        let end=this.state.end+this.state.amount;
        this.request(this.state.end+1,end)
    }

    renderButton=()=>{
        return this.props.loadmore ? 
            <Button
                type="loadmore"
                cta="Load More Videos"
                loadmore={()=>this.loadMore()}
            />
            :
            <Button type="linkTo" cta="More Videos" linkTo="/videos"/>
    }

    render() {
        return (
            <div className={styles.videosList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;