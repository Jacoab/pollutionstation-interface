import React, {Component} from 'react';
import {connect} from "react-redux";
import {Jumbotron} from "react-bootstrap";
import {setSensorState} from "../actions/dataActions";

class DataViewer extends Component {

  constructor(props) {
    super(props);
    this.eventSource = new EventSource('http://10.0.0.60:5000/data');
    this.state = {
      sensorData: {
        gas: 0,
        temperature: 0,
        humidity: 0,
        pressure: 0
      }
    };
    this.eventSource.onopen = e => {
      // TODO: Dispatch a streamOn event to the store here
      console.log('SSE connected');
    }
  }

  componentDidMount() {
    console.log('Component mounted');
    this.tickerID = setInterval(
      () => this.getSensorData(),
      this.props.interval // TODO: Add to props
    );
  }

  componentWillUnmount() {
    this.eventSource.close();
    // TODO: dispatch a streamOff action to the store here
  }

  getSensorData() {
    this.eventSource.onmessage = e => {
      console.log('Message received');
      let jsonData = JSON.parse(e.data);
      this.props.setSensorState(jsonData);
      this.setState({sensorData: jsonData});
    }
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 classname="display-3">Air Quality</h1>
          <p>Gas {this.state.sensorData.gas}</p>
          <p>Temp {this.state.sensorData.temperature}</p>
          <p>Humidity {this.state.sensorData.humidity}</p>
          <p>Pressure {this.state.sensorData.pressure}</p>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {sensorData: state.sensorData};
}

function mapDispatchToProps(dispatch) {
  return {
    setSensorState: sensorState => dispatch(setSensorState(sensorState))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataViewer);