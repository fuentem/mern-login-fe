import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/login'
import RegisterUser from './pages/register'
import Home from './pages/home'
import OTPVerification from './pages/otp'

class Routes extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <Route exact path={`/login`} component={Login} {...this.props} />
                <Route exact path={`/otpverify`} component={OTPVerification} {...this.props} />
                <Route exact path={`/register`} component={RegisterUser} {...this.props} />
                <Route exact path={`/`} component={Home} {...this.props} />
            </Switch>
        )
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
export default withRouter(connect(mapState, mapDispatch)(Routes));