import React, {Component} from 'react';
import {ButtonGroup, Button, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import './StreamController.css';

class StreamController extends Component{
  constructor(props) {
    super(props);
    this.eventSource = new EventSource('http://10.0.0.60:5000/data');
    this.state = {
      streamOn: false
    }
  }

  render() {
    return (
      <div className="stream-controller">
        <div>
          <ButtonGroup size="lg" aria-label="time-panel">
            <Button variant="secondary">10s</Button>
            <Button variant="secondary">30s</Button>
            <Button variant="secondary">1m</Button>
            <Button variant="secondary">30m</Button>
            <Button variant="secondary">1h</Button>
            <Button variant="secondary">12</Button>
            <Button variant="secondary">1d</Button>
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
    );
  }
}

export default StreamController;