import React, { Component } from 'react';
import SliderTemplates from './sliderTemplates';

class TopSlider extends Component {

    state={
        postData:[
            {
                category:'Mechanics',
                title:'Car Parts',
                description:'Get all your mechanics from this map....',
                image:'images/articles/mechanic.jpg'
            },
            {
                category:'Car Wash',
                title:'Machine talk',
                description:'Get all your tailor services here.....',
                image:'images/articles/carWash.jpg'
            },
            {
                category:'Developers',
                title:'Car clinic',
                description:'Get prominent developers here.....',
                image:'images/articles/dev.jpg'
            },
            {
                category:'Mechanics',
                title:'Dr.Chanic',
                description:'Get all your mechanics from this map....',
                image:'images/articles/mechanic.jpg'
            },
            {
                category:'Keep revving',
                title:'Gulu, 150+ available',
                description:'Get all your art galleries from this map.....',
                image:'images/articles/TEES.jpg'
            }
        ]
    }

    render() {
        return (
            <div>
                <SliderTemplates data={this.state.postData} type={this.props.type} settings={this.props.settings}/>
            </div>
        );
    }
}

export default TopSlider;