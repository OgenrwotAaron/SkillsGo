import React from 'react';
import VideosList from '../widgets/VideosList/videosList'

const VideosMain = () => {
    return (
        <div>
            <VideosList
                type="card"
                loadmore={true}
                start={0}
                amount={10}
                title={false}
            />
        </div>
    );
};

export default VideosMain;