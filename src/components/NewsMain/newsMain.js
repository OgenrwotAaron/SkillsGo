import React from 'react';

//import NewsSlider from '../widgets/NewsSlider/slider';
//import NewsList from '../widgets/NewsList/newsList';
import FloatButton from '../widgets/Buttons/floatingButton';
import Map from '../widgets/Map/map';
//import PopupCard from '../widgets/PopupCard/popupCard';
import Header from '../Header/header'

const NewsMain =(props)=> {

    const buttonClick = ()=>{
        console.log('hello')
    }

    return (
        <div>
            {/*<NewsSlider/>
            
            <NewsList
                type="detailed"
                loadmore={true}
                start={9}
                amount={3}
            />*/}
            
            <Header
                user={props.user}
                headerText={"Mechanics"}
                link={"/news"}
            />
            <div style={{height:'40px'}}></div>
            <Map/>

            <FloatButton 
                type="skills"
                clicked={()=>buttonClick()}
            />
        </div>
    );
};

export default NewsMain;