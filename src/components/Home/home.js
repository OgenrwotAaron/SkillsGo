import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider'
import NewsList from '../widgets/NewsList/newsList';
import VideosList from '../widgets/VideosList/videosList';
import FloatButton from '../widgets/Buttons/floatingButton';

const Home = () => {
    return (
        <div>
            <NewsSlider
                type="featured"
                start={6}
                amount={9}
                settings={{
                    dots:false
                }}
            />
            <NewsList
                type="card"
                loadmore={false}
                start={3}
                amount={3}
            />
            <VideosList
                type="card"
                loadmore={true}
                start={9}
                amount={3}
                title={true}
            />
            <FloatButton/>
        </div>
    );
};

export default Home;