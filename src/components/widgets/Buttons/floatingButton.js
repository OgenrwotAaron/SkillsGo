import React from 'react';
import styles from './floatButton.module.css';
import { Link } from 'react-router-dom';

const FloatButton = () => {
    return (
        <div>
            <Link to="/dashboard">
                    <div className={styles.toTop}>
                        <span className={styles.toTopHover}>
                        </span>
                        To Top
                    </div>
            </Link>
            
        </div>
    );
};

export default FloatButton;