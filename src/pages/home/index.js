import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { clearErrorHeader } from '../../actions/userActions'

import './index.less';
class Home extends Component {

    constructor() {
        super();
    }

    componentDidMount(){
        const { credsSuccess, otpSuccess } = this.props;

        if(!credsSuccess || !otpSuccess){
            this.props.history.push('/login')
        }

        this.props.actions.clearErrorHeader();
    }

    goToLogin = () => {
        window.location.reload();
    };

    render() {
        const { name, token } = this.props;

        return (
            <div className="col-lg-8 offset-lg-2">
                <h1>Hi {name}!</h1>
                <p>You have successfully logged-in!</p>
                <p>Your generated <b>token</b> is:</p>
                <textarea id="token" rows="5" cols="60">
                {token}
                </textarea>
                <button onClick={this.goToLogin} style={{marginTop:20}} className="btn-margin btn btn-primary">Logout</button>
            </div>
        )
    }
}
function mapState(state) {
    return {
        userReducer: state.userReducer,
        name: state.userReducer.name,
        token: state.userReducer.token,
        credsSuccess: state.userReducer.credsSuccess,
        otpSuccess: state.userReducer.otpSuccess,
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators({clearErrorHeader}, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(Home));