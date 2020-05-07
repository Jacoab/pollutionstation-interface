import React, {Component} from 'react';
import { Provider } from 'react-redux'
import store from './store/index'
import DataViewer from './components/DataViewer'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <DataViewer interval={1000}/>
      </div>
    );
  }
}


export default App;