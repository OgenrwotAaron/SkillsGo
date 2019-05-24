import React, { Component } from 'react';
import MapGL, { GeolocateControl, NavigationControl, Marker} from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FontAwesome from 'react-fontawesome';
import { firebaseUsers, firebaseLooper } from '../../../firebase';
//import geocoder from 'leaflet-control-geocoder/src/index'
//import ReactMapGl, { GeolocateControl } from 'react-map-gl';

class Map extends Component {

    state = {
        lng:'',
        lat:'',
        style:{
            width: '100%',
            height: 650
        },
        viewport: {
          latitude: 1.3,
          longitude: 32,
          zoom: 6
        },
        mechanics:[]
    }

    /*componentDidMount(){
       const geoc= new geocoder.Nominatim()
       geoc.geocode("Cemetery Rd, Gulu",function(error,results){
           console.log(error,results)
       })
    }*/
    
    componentWillMount() {
        firebaseUsers.once('value')
        .then((snapshot)=>{
            const mechanic = firebaseLooper(snapshot)
            this.setState({
                mechanics:mechanic
            })
            console.log(this.state.mechanics)
        })
        .catch(e=>{
            console.log(e)
        })
        
    }
    

    addMarkers=()=>{
        const style = {
            color: 'red',
            cursor: 'pointer',
            fontSize: '25px',
          };
        return this.state.mechanics.map((item,i) =>{
            return (
                <div key={i}>
                    <div>
                        <Marker
                            longitude={item.lng}
                            latitude={item.lat}
                        >
                            <div style={style}>
                                <FontAwesome
                                    name="map-marker"
                                />
                            </div>
                        </Marker>
                    </div>
                </div>
                
            )
        })
    }

    clicked=(e)=>{
        console.log(e.lngLat.lng,e.lngLat.lat)
        this.setState({
            lng:e.lngLat.lng,
            lat:e.lngLat.lat
        })
    }

    setMarker=()=>(
        <Marker
            longitude={this.state.lng}
            latitude={this.state.setMarker.lat}
        >
            <div style={{
            color: 'red',
            cursor: 'pointer',
            fontSize: '25px',
          }}>
                <FontAwesome
                    name="map-marker"
                />
            </div>
        </Marker>
    )

    renderMap=()=>{
        let template=null;
        
        switch(this.props.type){
            case('mechanics'):
                template=(
                    <div>
                        <MapGL
                        style={this.state.style}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        accessToken="####################"
                        {...this.state.viewport}
                        onViewportChange={(viewport)=> this.setState({viewport})}
                        >
                            {this.addMarkers()}
                            <GeolocateControl position="top-right"/>
                            <NavigationControl showCompass showZoom position="top-right"/>
                        </MapGL>
                    </div>
                )
            break;

            case('register'):
                    template=(
                        <MapGL
                        onClick={this.props.clicked}
                        style={{
                            width:500,
                            height:500
                        }}
                        cursor="pointer"
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        accessToken="##################################"
                        {...this.state.viewport}
                        onViewportChange={(viewport)=> this.setState({viewport})}
                        >
                            {this.props.setMarker}
                            <GeolocateControl position="top-right"/>
                            <NavigationControl showCompass showZoom position="top-right"/>
                        </MapGL>
                    )
            break;

            default:
                template=null
        }
        return template
    }
    

    render() {
        return (
        <div>
<<<<<<< HEAD
            {this.renderMap()}
=======
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
>>>>>>> 270d7ae3d99349c79294d26a05103586147aab68
        </div>
                
        );
    }
}

export default Map;
