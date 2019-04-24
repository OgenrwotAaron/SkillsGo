import React, {Component} from 'react';
import styles from './skillsCard.module.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'

class SkillsCard extends Component {

    state={
        dropDown:false,
        postData:[
            {
                category:'Mechanics',
                title:'Gulu, 10+ available',
                description:'Get all your mechanics from this map....',
                image:'images/articles/mechanic.jpg'
            },
            {
                category:'Car Wash',
                title:'Gulu, 200+ available',
                description:'Get all your tailor services here.....',
                image:'images/articles/carWash.jpg'
            },
            {
                category:'Developers',
                title:'Gulu, 50+ available',
                description:'Get prominent developers here.....',
                image:'images/articles/dev.jpg'
            },
            {
                category:'Fine Artists',
                title:'Gulu, 150+ available',
                description:'Get all your art galleries from this map.....',
                image:'images/articles/TEES.jpg'
            }
        ]
    }

    

    showCards = ()=>{
        return this.state.postData.map((item,i)=>{
            return this.cards(item,i)
        })
    }

    toggleDropDown = (action)=>{
        this.setState({
            dropDown:action
        })
    }

    dropDown = ()=>{
        if(this.state.dropDown){
            return(
                <div>hello</div>
            )
        }else{
            return null;
        }
    }

    cards = (item,i)=>{
        
        return (
        <div key={i} className={styles.postContainer}>
            <div className={styles.topInfo}>
                <img alt="avatar" src={item.image}/>
                <h3>{item.category}</h3>
                <h5>10.4.2019</h5>
                <FontAwesome
                    name='ellipsis-v'
                    style={{
                        float:'right'
                    }}
                    onClick={()=>this.toggleDropDown(true)}
                />
            </div>
            <div className={styles.postDetails}>
                {item.description}
            </div>
            <div className={styles.postImage}>
                <img alt="postImage" src={item.image}/>
            </div>
            <div className={styles.postMetas}>
                <FontAwesome 
                    name="thumbs-o-up"
                    style={{
                        paddingRight:'5px',
                        paddingLeft:'5px'
                    }}
                />
                31 Likes
                <FontAwesome
                    name='comment-o'
                    style={{
                        paddingRight:'5px',
                        paddingLeft:'5px'
                    }}
                    onClick={()=>this.toggleDropDown(true)}
                />
                4 Comments
                <FontAwesome
                    name='share'
                    style={{
                        paddingRight:'5px',
                        paddingLeft:'5px'
                    }}
                    onClick={()=>this.toggleDropDown(true)}
                />
                3 shares
            </div>
        </div>
        /*<div key={i} className={styles.postModule}>
            <Link to={`${item.category}`}>
                <div className={styles.imageBox}>
                  <img src={item.image} alt={item.category}/>  
                </div>
                <div className={styles.postContent}>
                    <div className={styles.category}>
                        {item.category}
                    </div>
            
                    <h1 className={styles.title}>{item.title}</h1>
                    <p className={styles.description}>{item.description}</p>
                </div> 
            </Link>
            <div className={styles.postMeta}>
                <FontAwesome 
                    name="location-arrow"
                    style={{
                        paddingRight:'20px'
                    }}
                />
                View on Map
                <FontAwesome
                    name='ellipsis-v'
                    style={{
                        float:'right'
                    }}
                    onClick={()=>this.toggleDropDown(true)}
                />
            </div>
        </div>*/
    )}
    
    render() {
        return (
            <div>
                {this.showCards()}
                {this.dropDown()}
            </div>
        );
    }
};

export default SkillsCard;