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
            formSubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        // the csv I got has some airports with no codes
        let airports = AIRPORTS.filter((airport) => {
            return airport.code !== "\\N" && airport.country === 'United States';
        })
        this.setState({ airportList: this.mapAirports(), airports });
    }

    handleChange(searchText) {
        // only filter if 2 or more characters entered
        if (searchText.length >= 2) {
            let temp = this.filterAirports(searchText);
            this.setState({ airportList: temp });
        }
    }

    handleRequest(value, index, name) {
        // store selected values to state
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
        // filter by code or airport name
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
        // format the list we have to a more manageable object
        return this.state.airports.map((airport) => {
            return {
                text: `${airport.code} - ${airport.name}`,
                value: airport.code
            }
        })
    }

    handleSubmit(event) {
        // submitting form sends the info back up to the parent container
        event.preventDefault();
        const { starting, destination } = this.state;
        if (starting && destination) {
            let airports = { starting, destination };
            this.props.onSubmit({ airports });
            this.setState({ formSubmitted: true });
        }
    }

    resetForm() {
        this.props.onResetForm();

        // this seems wrong and would be easier with redux-form
        // but form values weren't resetting
        this._startingText.setState({searchText: ''});
        this._destinationText.setState({searchText: ''});
        this.setState({
            starting: '',
            destination: '',
            formSubmitted: false,
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <AutoComplete
                    hintText="Where are you departing from?"
                    floatingLabelText="Starting Airport"
                    name="starting"
                    ref={(node) => this._startingText = node}
                    value={this.state.starting}
                    onUpdateInput={this.handleChange}
                    onNewRequest={(value, index) => this.handleRequest(value, index, "starting")}
                    dataSource={this.state.airportList}
                    dataSourceConfig={{text: 'text', value: 'value'}}
                    filter={AutoComplete.fuzzyFilter}
                    disabled={this.state.formSubmitted}
                    style={{'width': '50%'}}
                    fullWidth
                /><br />
                <AutoComplete
                    hintText="Where are you trying to get to?"
                    floatingLabelText="Destination Airport"
                    name="destination"
                    ref={(node) => this._destinationText = node}
                    value={this.state.starting}
                    onUpdateInput={this.handleChange}
                    onNewRequest={(value, index) => this.handleRequest(value, index, "destination")}
                    dataSource={this.state.airportList}
                    dataSourceConfig={{text: 'text', value: 'value'}}
                    filter={AutoComplete.fuzzyFilter}
                    disabled={this.state.formSubmitted}
                    style={{'width': '50%'}}
                    fullWidth
                /><br />
                <RaisedButton
                    type="submit"
                    label="Submit"
                    disabled={this.state.formSubmitted || (!this.state.starting || !this.state.destination)}
                    primary
                />
                {this.state.formSubmitted && <RaisedButton
                    label="Reset Form"
                    onClick={this.resetForm}
                    secondary
                />}
            </form>
        )
    }
}

export default AirportForm;
