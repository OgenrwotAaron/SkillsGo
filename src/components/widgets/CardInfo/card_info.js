import React from 'react';
import FontAwesome from 'react-fontawesome';
import { formatDate } from '../../../config'

import styles from './cardInfo.module.css';

const CardInfo = (props) => {

    const teamName=(teams,team)=>{
        let data=teams.find((item)=>{
            return item.teamId===team
        });
        if(data){
            return data.name
        }
    }

    return (
        <div className={styles.CardInfo}>
            <span className={styles.teamName}>
                {teamName(props.teams, props.team)}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {formatDate(props.date)}
            </span>
        </div>
    );
};

export default CardInfo;