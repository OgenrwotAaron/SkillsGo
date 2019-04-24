import React from 'react';

import VideosList from '../widgets/VideosList/videosList';
import SkillsCard from '../widgets/SkillCard/skillsCard'
import Header from '../Header/header';
import styles from './videos.module.css';
import NewsList from '../widgets/NewsList/newsList'
import TopSlider from '../widgets/NewsSlider/topSlider';

const VideosMain = (props) => {
    return (
        <div>
            <Header
                user={props.user}
                headerText={"Videos"}
                link={"/videos"}
            />
            <div className={styles.topSlickMobile}>
                <TopSlider
                    type="topSlick"
                    settings={{
                        dots:false,
                        slidesToShow: 1
                    }}
                />
            </div>
            <div className={styles.topSlick}>
                <TopSlider
                    type="topSlick"
                    settings={{
                        dots:false,
                        slidesToShow: 4,
                        autoplay:false,
                    }}
                />
            </div>
            <div className={styles.body}>
                <div className={styles.nav}>
                    <div style={{fontSize:'18px',fontWeight:300,paddingLeft:'5PX',textAlign:'center',color:'gray'}}>TRENDING UPDATES</div>
                    <NewsList
                        type="card"
                        loadmore={false}
                        start={1}
                        amount={10}
                    />
                </div>
                <div className={styles.mainSection}>
                
                    <SkillsCard/>
                    <VideosList
                        type="card"
                        loadmore={true}
                        start={0}
                        amount={10}
                        title={false}
                    />
                </div>
                <div className={styles.recentUpdates}>
                    <div style={{fontSize:'18px',fontWeight:300,paddingLeft:'5PX',textAlign:'center',color:'gray'}}>TOP MECHANICS </div>
                    <VideosList
                        type="card"
                        loadmore={true}
                        start={0}
                        amount={10}
                        title={false}
                    />
                </div>
            </div>
        </div>
        
    );
};

export default VideosMain;