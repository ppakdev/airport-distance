import React, { Component } from 'react';
import {InfoWindow, Map, Marker, Polygon, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
    render() {
        const { google, airports: { starting, destination }} = this.props;

        // hacky way to prevent container from breaking when google's not loaded yet
        if (!google) {
            return null;
        }

        // basic map style
        const style = {
            width: '100%',
            height: '50%',
        }
        
        // set up path to be drawn the way google wants it
        let mapCoords = [
            {
                lat: starting.lat,
                lng: starting.long,
            },
            {
                lat: destination.lat,
                lng: destination.long,
            },
        ];

        // draw path 
        // this google map component set doesn't have all components available, so.. just use google map api
        new google.maps.Polyline({
            path: mapCoords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        return (
            <Map 
                google={google}
                zoom={4}
                style={style}
                initialCenter={this.props.midpoint}
                className={'map'}
            >   
                <InfoWindow visible>
                    <div>
                        <p>Distance between airports: ${this.props.distance} nautical miles.</p>
                    </div>
                </InfoWindow>
                <Marker
                    title={starting.code}
                    name={starting.name}
                    position={mapCoords[0]}
                />
                <Marker
                    title={destination.code}
                    name={destination.name}
                    position={mapCoords[1]}
                />
                <Polygon
                    paths={mapCoords}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor="#0000FF"
                    fillOpacity={0.35} 
                />
            </Map>
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBuAXrBWZOBb-hanSz_06bWenyW_OTpqBg'), // normally hide this in env variables
  version: '3.28'
})(MapContainer)