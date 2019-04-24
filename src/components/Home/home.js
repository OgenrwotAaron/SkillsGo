import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider'
import NewsList from '../widgets/NewsList/newsList';
import VideosList from '../widgets/VideosList/videosList';
import FloatButton from '../widgets/Buttons/floatingButton';
import Header from '../Header/header';
import styles from './home.module.css';

const Home =(props)=>{

    return (
            <div>
                <Header
                    user={props.user}
                    headerText={"Home"}
                    link={"/"}
                />

                <div style={{height:'40px'}}></div>
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
                        <NewsSlider
                            type="featured"
                            start={5}
                            amount={9}
                            settings={{
                                dots:false
                            }}
                        />
                        <NewsList
                            type="card"
                            loadmore={false}
                            start={1}
                            amount={10}
                        />
                        <FloatButton
                            type="Post"
                        />
                    </div>
                    <div className={styles.recentUpdates}>
                    <div style={{fontSize:'18px',fontWeight:300,paddingLeft:'5PX',textAlign:'center',color:'gray'}}>TOP MECHANICS</div>
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

export default Home;