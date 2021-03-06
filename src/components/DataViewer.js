import React, {Component} from 'react';
import {Button, ButtonGroup, Jumbotron, Form} from "react-bootstrap";
import Switch from "react-switch";
import time from "../constants/time";
import "./DataViewer.css";

class DataViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quality: 'Awaiting data',
      checked: false,
      deviceURL: "http://10.0.0.60:5000/data?interval=",
      interval: time.TEN_SECONDS
    };

    //this.handleChange = this.handleChange.bind(this);
    /*
    this.set10s = this.set10s.bind(this);
    this.set30s = this.set30s.bind(this);
    this.set1m = this.set1m.bind(this);
    this.set30m = this.set30m.bind(this);
    this.set1h = this.set1h.bind(this);
    this.set12h = this.set12h.bind(this);
    this.set1d = this.set1d.bind(this);*/

    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.eventSource.onopen = e => {
      // TODO: Dispatch a streamOn event to the store here
      console.log('SSE connected');
    };
  }

  startStream() {
    this.tickerID = setInterval(
      () => this.getSensorData(),
      this.props.interval // TODO: Add to props
    );
  }

  componentDidMount() {
    this.startStream();
  }

  componentWillUnmount() {
    this.eventSource.close();
    // TODO: dispatch a streamOff action to the store here
  }

  getSensorData() {
    this.eventSource.onmessage = e => {
      console.log('Message received');
      let jsonData = JSON.parse(e.data);
      this.setState({
        quality: jsonData.quality
      });
    }
  }

  set10s() {
    this.eventSource.close();
    this.setState({interval: time.TEN_SECONDS});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.startStream();
  }

  set30s() {
    this.eventSource.close();
    this.setState({interval: time.THIRTY_SECONDS});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.startStream();
  }

  set1m() {
    this.eventSource.close();
    this.setState({interval: time.MINUTE});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.startStream();
  }

  set30m() {
    this.eventSource.close();
    this.setState({interval: time.THIRTY_MINUTES});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.startStream();
  }

  set1h() {
    this.eventSource.close();
    this.setState({interval: time.HOUR});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.startStream();
  }

  set12h() {
    this.eventSource.close();
    this.setState({interval: time.TWELVE_HOURS});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.startStream();
  }

  set1d() {
    this.eventSource.close();
    this.setState({interval: time.DAY});
    this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
    this.startStream();
  }

  /*
  handleChange(checked) {
    if (this.state.checked) {
      this.eventSource = new EventSource(this.state.deviceURL + this.state.interval);
      this.tickerID = setInterval(
        () => this.getSensorData(),
        this.props.interval // TODO: Add to props
      );
    }
    else {
      this.eventSource.close();
    }
    this.setState({checked: checked});
  }*/

  render() {
    return (
      <div className="data-viewer">
        <Jumbotron>
          <h1>Air Quality</h1>
          <p>{this.state.quality}</p>
          <p>Sampling interval: {this.state.interval}s</p>
        </Jumbotron>

        <div className="stream-controller">
          <div>
            <ButtonGroup size="lg" aria-label="time-panel">
              <Button variant="secondary" onClick={() => this.set10s()}>10s</Button>
              <Button variant="secondary" onClick={() => this.set30s()}>30s</Button>
              <Button variant="secondary" onClick={() => this.set1m()}>1m</Button>
              <Button variant="secondary" onClick={() => this.set30m()}>30m</Button>
              <Button variant="secondary" onClick={() => this.set1h()}>1h</Button>
              <Button variant="secondary" onClick={() => this.set12h()}>12h</Button>
              <Button variant="secondary" onClick={() => this.set1d()}>1d</Button>
            </ButtonGroup>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Device Address</Form.Label>
              <Form.Control placeholder="Enter address" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>

    );
  }
}

export default DataViewer;