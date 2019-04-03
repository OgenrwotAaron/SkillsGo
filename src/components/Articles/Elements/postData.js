import React from 'react';
import styles from '../News/Posts/articles.module.css';
//import moment from 'moment';
import { formatDate } from '../../../config';

const PostData = (props) => {
    return (
        <div className={styles.articlePostData}>
            <div>
                Date:
                <span>{formatDate(props.date)}</span>
            </div>
            <div>
                Author:
                <span>{props.data.author}</span>
            </div>
        </div>
    );
};

export default PostData;