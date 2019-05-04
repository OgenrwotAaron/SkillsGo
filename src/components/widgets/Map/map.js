import React, { Component } from 'react';
import MapGL, { GeolocateControl, NavigationControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
//import ReactMapGl, { GeolocateControl } from 'react-map-gl';

class Map extends Component {

    state = {
        style:{
            width: '100%',
            height: 500,
        },
        viewport: {
          latitude: 37.7577,
          longitude: -122.4376,
          zoom: 8
        }
    }

    //componentDidMount(){
    //    if(window.navigator.geolocation){
    //        this._goelocationEventHandler = navigator.geolocation.watchPosition(this._updatePosition,console.error,{
    //            enableHighAccuracy:true,
    //            timeout:5000,
    //            maximumAge:0
    //        })
    //    }
    //}
    //_updatePosition(position){
    //    this.setState({
    //        viewport
    //        center:[]
    //    })
    //}

    render() {
        return (
        <div>
            <MapGL
                style={this.state.style}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                accessToken="######################"
                {...this.state.viewport}
                onViewportChange={(viewport)=> this.setState({viewport})}
            >
                <GeolocateControl position="top-right"/>
                <NavigationControl showCompass showZoom position="top-right"/>
            </MapGL>
        </div>
                
        );
    }
}

export default Map;
