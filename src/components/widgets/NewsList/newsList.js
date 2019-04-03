import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
//import Axios from 'axios';
import styles from './newsList.module.css'

//import {URL} from '../../../config';
import Button from '../Buttons/buttons'
import CardInfo from '../CardInfo/card_info'
import { firebaseTeams, firebaseLooper, firebaseArticles } from '../../../firebase';

class NewsList extends Component {

    state={
        teams: [],
        items: [],
        start:this.props.start,
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
                const teams = firebaseLooper(snapshot);
                this.setState({
                    teams
                })
            })
        }

        /*Axios.get(`${URL}/articles?_start=${this.state.start}&_end=${this.state.end}`)
        .then(response=>{
            this.setState({
                items: [...this.state.items,...response.data],
                start:this.state.end,
                end
            })
        })*/
        firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const articles = firebaseLooper(snapshot);
            this.setState({
                items: [...this.state.items,...articles],
                start,
                end
            })
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    loadMore=()=>{
        let end=this.state.end+this.state.amount;
        this.request(this.state.end+1,end);
    }

    renderNews = (type)=>{
        let template=null;

        switch(type){
            case('card'):
                template=this.state.items.map((item,i)=>{
                    return(
                        <CSSTransition
                            classNames={{
                                enter:styles.newsList_wrapper,
                                enterActive: styles.newsList_wrapper_enter
                            }}
                            timeout={500}
                            key={i}
                        >
                           <div>
                                <div className={styles.newsList_item}>
                                    <Link to={`/articles/${item.id}`}>
                                        <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                                        <h2> {item.title} </h2>
                                    </Link>
                                </div>
                            </div> 
                        </CSSTransition>
                        
                    )
                })
            break;
            case("detailed"):
                template=this.state.items.map((item,i)=>{
                    return(
                        <CSSTransition
                            classNames={{
                                enter:styles.newsList_wrapper,
                                enterActive: styles.newsList_wrapper_enter
                            }}
                            timeout={500}
                            key={i}
                        >
                            <Link to={`/articles/${item.id}`}>
                                <div className={styles.flex_wrapper}>
                                    <div className={styles.left}
                                        style={{
                                            background:`url('/images/articles/${item.image}')`
                                        }}>
                                        <div></div>
                                    </div>
                                    <div className={styles.right}>
                                        <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                                        <h2> {item.title} </h2>
                                    </div>
                                </div>
                            </Link> 
                        </CSSTransition>
                    
                    )
                })
            break;
            default:
                template=null;
        }
        return template;
    }

    render() {

        return (
            <div>
                <TransitionGroup
                    component="div"
                    className="list"
                >
                    {this.renderNews(this.props.type)}
                </TransitionGroup>
                <Button
                    type="loadmore"
                    loadmore={()=>this.loadMore()}
                    cta="Load More News"
                />
            </div>
        );
    }
}

export default NewsList;