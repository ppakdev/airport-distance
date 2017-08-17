import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
    render() {
        const style = {
            width: '100%',
            height: '50%',
        }
        return (
        <Map 
            google={this.props.google}
            zoom={3}
            style={style}
            initialCenter={this.props.midpoint}
            >
    
            {/* <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />
    
            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow> */}
        </Map>
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBuAXrBWZOBb-hanSz_06bWenyW_OTpqBg')
})(MapContainer)