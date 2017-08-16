import React, { Component } from 'react';

import AirportForm from '../components/AirportForm';

class AirportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(input) {       
        const { starting, destination } = input.airports;
        let distance = this.calculateDistance(starting.lat, starting.long, destination.lat, destination.long);
        this.setState({distance});
        console.log(distance);
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

                    </div>
                }
            </div>
        )
    }
}

export default AirportContainer;
