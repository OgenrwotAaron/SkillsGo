import React from 'react';

import NewsSlider from '../widgets/NewsSlider/slider';
import NewsList from '../widgets/NewsList/newsList';
import SkillsCard from '../widgets/SkillCard/skillsCard'

const NewsMain = () => {
    return (
        <div>
            <NewsSlider
                type="featured"
                start={3}
                amount={6}
                settings={{
                    dots:false
                }}
            />

            <SkillsCard/>
            
            <NewsList
                type="detailed"
                loadmore={true}
                start={9}
                amount={3}
            />
        </div>
    );
};

export default NewsMain;