import React, {Component} from 'react';
import {connect} from "react-redux";

class StreamController extends Component{
  constructor(props) {
    super(props);
    this.state = {
      streamOn: false
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-container">
            <div className="col" style={{backgroundColor: 'white'}}>
              <p>Stream</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
            </div>
            <div className="col" style={{backgroundColor: 'white'}}>
              <div className="range">
                <p>Time Delta</p>
                <input type="range" min={1} max={8} steps={1} defaultValue={1} id="myRange" />
                <p>Value: <span id="demo" /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}