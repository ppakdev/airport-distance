import React, { Component } from 'react';
import { AutoComplete, RaisedButton } from 'material-ui';

import AIRPORTS from '../data/airports';

class AirportForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starting: '',
            destination: '',
            airportList: [],
            airports: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let airports = AIRPORTS.filter((airport) => {
            return airport.code !== "\\N";
        })
        this.setState({ airportList: this.mapAirports(), airports });
    }
    
    handleChange(searchText) {
        if (searchText.length >= 2) {
            let temp = this.filterAirports(searchText);
            this.setState({ airportList: temp });
        }
    }

    handleRequest(value, index, name) {
        if (name === "starting") {
            let starting = AIRPORTS.filter((airport) => {
                return airport.code === value.value;
            })[0];
            this.setState({ starting });
        } else {
            let destination = AIRPORTS.filter((airport) => {
                return airport.code === value.value;
            })[0];
            this.setState({ destination });
        }
    }

    filterAirports(text) {
        return this.state.airports.filter((airport) => {
            return (airport.name.toLowerCase().includes(text) || airport.code.toLowerCase() === text.toLowerCase());
        }).map((airport) => {
            return {
                text: `${airport.code} - ${airport.name}`,
                value: airport.code,
            };
        });
    }

    mapAirports() {
        return this.state.airports.map((airport) => {
            return {
                text: `${airport.code} - ${airport.name}`,
                value: airport.code
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { starting, destination } = this.state;
        let airports = { starting, destination };
        this.props.onSubmit({ airports });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <AutoComplete
                    hintText="Where are you departing from?"
                    floatingLabelText="Starting Airport"
                    name="starting"
                    value={this.state.starting || ''}
                    onUpdateInput={this.handleChange}
                    onNewRequest={(value, index) => this.handleRequest(value, index, "starting")}
                    dataSource={this.state.airportList}
                    dataSourceConfig={{text: 'text', value: 'value'}}
                    filter={AutoComplete.fuzzyFilter}
                /><br />
                <AutoComplete
                    hintText="Where are you trying to get to?"
                    floatingLabelText="Destination Airport"
                    name="destination"
                    value={this.state.starting || ''}
                    onUpdateInput={this.handleChange}
                    onNewRequest={(value, index) => this.handleRequest(value, index, "destination")}
                    dataSource={this.state.airportList}
                    dataSourceConfig={{text: 'text', value: 'value'}}
                    filter={AutoComplete.fuzzyFilter}
                /><br />
                <RaisedButton type="submit" label="Submit" primary />
            </form>
        )
    }
}

export default AirportForm;
