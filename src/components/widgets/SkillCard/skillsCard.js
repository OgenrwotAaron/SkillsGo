import React from 'react';
import styles from './skillsCard.module.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'

const SkillsCard = () => {

    const postData=[
        {
            category:'Mechanics',
            title:'Gulu, 10+ available',
            description:'Get all your mechanic service points from this map.....',
            image:'images/articles/mechanic.jpg'
        },
        {
            category:'Tailors',
            title:'Gulu, 200+ available',
            description:'Get all your tailor services here.....',
            image:'images/articles/10.jpg'
        },
        {
            category:'Developers',
            title:'Gulu, 50+ available',
            description:'Get prominent developers here.....',
            image:'images/articles/3.jpg'
        },
        {
            category:'Fine Artists',
            title:'Gulu, 150+ available',
            description:'Get all your art galleries from this map.....',
            image:'images/articles/2.jpg'
        }
    ]

    const showCards = ()=>{
        return postData.map((item,i)=>{
            return cards(item,i)
        })
    }

    const cards = (item,i)=>(
        <div key={i} className={styles.postModule}>
            <Link to={`${item.category}`}>
                <img src={item.image} alt={item.category}/>
                <div className={styles.postContent}>
                    <div className={styles.category}>
                        {item.category}
                    </div>
            
                    <h1 className={styles.title}>{item.title}</h1>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.postMeta}>
                        <FontAwesome name="chevron-right"/>
                        View on Map
                    </div>
                </div> 
            </Link>
            
        </div>
    )

    return (
        <div>
            {showCards()}
        </div>
    );
};

export default SkillsCard;