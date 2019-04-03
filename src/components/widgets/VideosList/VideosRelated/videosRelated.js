import React from 'react';
import styles from '../VideosList.module.css';
import VideosListTemplate from '../videosListTemplate';

const VideosRelated = (props) => {
    return (
        <div className={styles.relatedWrapper}>
            <VideosListTemplate
                data={props.data}
                teams={props.teams}
            />
        </div>
    );
};

export default VideosRelated;