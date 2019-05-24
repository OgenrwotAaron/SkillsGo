import React from 'react';
import Map from '../widgets/Map/map';


const CompleteRegistration =(props)=> {
        return (
            <div>
                <div style={{
                    paddingLeft:'10px',
                    fontSize:'25px',
                    color:'gray',
                    fontWeight:'300'
                }}>
                    Click to add your location from the map
                </div>
                
                <Map type={'register'} clicked={props.clicked} setMarker={props.setMarker}/>
                
            </div>
        );
}

export default CompleteRegistration;