import React from 'react';

import Slick from 'react-slick';

import styles from './slider.module.css'
import { Link } from 'react-router-dom';

const SliderTemplates = (props) => {

    let template=null;

    const settings={
        dots:true,
        infinite:true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed:3000,
        pauseOnfocus:true,
        ...props.settings
    }

    switch(props.type){
        case('featured'):
            template=props.data.map((item,i)=>{
                return(
                    <div key={i}>
                        <div className={styles.featured_item}>
                            <div className={styles.featured_image}
                                style={{
                                    background:`url(${item.image})`
                            }}></div>
                            <Link to={`/articles/${item.id}`}>
                                <div className={styles.featured_caption}>
                                    {item.title}
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })
            break;
        default:
            template=null;
    }

    return (
        <Slick {...settings}>
            {template}
        </Slick>
    );
};

export default SliderTemplates;