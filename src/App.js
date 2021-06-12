import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './App.less';
import Routes from './routes'

class App extends Component {

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
            <div className="col-md-8 offset-md-2">
                <Routes />
            </div>
        </div>
      </div>
    );
  }

}

function mapState(state) {
  return {
    ...state
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}
export default withRouter(connect(mapState, mapDispatch)(App));
