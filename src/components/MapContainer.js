import React, { Component } from 'react';
import {InfoWindow, Map, Marker, Polygon, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
    render() {
        if (!this.props.google) {
            return null;
        }
        const style = {
            width: '100%',
            height: '50%',
        }
        
        const { google, airports: { starting, destination }} = this.props;
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

        let flightPath = new google.maps.Polyline({
          path: mapCoords,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        console.log(flightPath);
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
  apiKey: ('AIzaSyBuAXrBWZOBb-hanSz_06bWenyW_OTpqBg'),
  version: '3.28'
})(MapContainer)