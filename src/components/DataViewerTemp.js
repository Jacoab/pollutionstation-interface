import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, ButtonGroup, Jumbotron} from "react-bootstrap";
import {setSensorState, setQuality} from "../actions/dataActions";
import time from "../constants/time";
import "./DataViewer.css";

class DataViewerTemp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quality: 'Awaiting data',
      streamOn: false,
      deviceURL: "http://10.0.0.60:5000/data?interval=",
      interval: time.TEN_SECONDS
    };

    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
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
      this.props.setQuality(jsonData);

      this.setState({
        quality: jsonData.quality
      });
    }
  }

  setSampleInterval(interval) {
    this.props.setInterval(interval);
    this.setState({interval: interval});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }

  set10s() {
    this.props.setInterval(time.TEN_SECONDS);
    this.setState({interval: time.TEN_SECONDS});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }

  set30s() {
    this.props.setInterval(time.THIRTY_SECONDS);
    this.setState({interval: time.THIRTY_SECONDS});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }

  set1m() {
    this.props.setInterval(time.MINUTE);
    this.setState({interval: time.MINUTE});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }

  set30m() {
    this.props.setInterval(time.THIRTY_MINUTES);
    this.setState({interval: time.THIRTY_MINUTES});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }

  set1h() {
    this.props.setInterval(time.HOUR);
    this.setState({interval: time.HOUR});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }

  set12h() {
    this.props.setInterval(time.TWELVE_HOURS);
    this.setState({interval: time.TWELVE_HOURS});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }

  set1d() {
    this.props.setInterval(time.DAY);
    this.setState({interval: time.DAY});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
  }


  render() {
    return (
      <div className="data-viewer">
        <Jumbotron>
          <h1>Air Quality</h1>
          <p>{this.state.quality}</p>
        </Jumbotron>

        <div className="stream-controller">
          <div>
            <ButtonGroup size="lg" aria-label="time-panel">
              <Button variant="secondary" onClick={this.set10s}>10s</Button>
              <Button variant="secondary" onClick={this.set30s}>30s</Button>
              <Button variant="secondary" onClick={this.set1m}>1m</Button>
              <Button variant="secondary" onClick={this.set30m}>30m</Button>
              <Button variant="secondary" onClick={this.set1h}>1h</Button>
              <Button variant="secondary" onClick={this.set12h}>12h</Button>
              <Button variant="secondary" onClick={this.set1d}>1d</Button>
            </ButtonGroup>
          </div>
          <div className="switch-div">
            <p>Stream</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    quality: state.quality,
    streamOn: state.streamOn,
    deviceURL: state.deviceURL,
    interval: state.interval
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSensorState: sensorState => dispatch(setSensorState(sensorState)),
    setQuality: quality => dispatch(setQuality(quality)),
    setInterval: interval => dispatch(setInterval(interval))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataViewerTemp);