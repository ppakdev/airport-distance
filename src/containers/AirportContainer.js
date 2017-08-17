import React, { Component } from 'react';

import AirportForm from '../components/AirportForm';
import MapContainer from '../components/MapContainer';


class AirportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: null,
            midpoint: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(input) {       
        const { starting, destination } = input.airports;
        let distance = this.calculateDistance(starting.lat, starting.long, destination.lat, destination.long);
        let midpoint = this.calculateMidpoint(starting.lat, starting.long, destination.lat, destination.long);
        this.setState({
            distance, 
            midpoint,
            airports: input.airports
        });
    }

    // calculation from GeoDataSource
    // http://www.geodatasource.com/developers/javascript
    calculateDistance(lat1, lon1, lat2, lon2, unit='N') {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { 
            dist = dist * 1.609344; 
        } else if (unit === "N") { 
            dist = dist * 0.8684 
        }
        return dist.toFixed(2);
    }

    calculateMidpoint(latitude1, longitude1, latitude2, longitude2) {
        let DEG_TO_RAD = Math.PI / 180;     // To convert degrees to radians.
        
        // Convert latitude and longitudes to radians:
        let lat1 = latitude1 * DEG_TO_RAD;
        let lat2 = latitude2 * DEG_TO_RAD;
        let lng1 = longitude1 * DEG_TO_RAD;
        let dLng = (longitude2 - longitude1) * DEG_TO_RAD;  // Diff in longtitude.
        
        // Calculate mid-point:
        let bx = Math.cos(lat2) * Math.cos(dLng);
        let by = Math.cos(lat2) * Math.sin(dLng);
        let lat = Math.atan2(
            Math.sin(lat1) + Math.sin(lat2),
            Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + by * by));
        let lng = lng1 + Math.atan2(by, Math.cos(lat1) + bx);

        return {
            lat: lat / DEG_TO_RAD,
            lng: lng / DEG_TO_RAD
        }
    };
    
    render() {
        let distanceText = `Distance between airports: ${this.state.distance} nautical miles.`;
        return (
            <div>
                <p className="App-intro">
                    To get started select starting and destination aiports and submit.
                </p>
                <AirportForm onSubmit={this.handleSubmit} />
                {this.state.distance && 
                    <div>
                        <p>
                            {distanceText}
                        </p>
                    <MapContainer midpoint={this.state.midpoint} airports={this.state.airports} distance={this.state.distance} />
                    </div>
                }
            </div>
        )
    }
}

export default AirportContainer;
