import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { otpVerification, clearErrorHeader } from '../../actions/userActions'

import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import ErrorHeader from '../../components/ErrorHeader'

class OTPVerification extends Component {

    constructor() {
        super();
    }

    componentDidMount(){
        const { credsSuccess } = this.props;

        if(!credsSuccess){
            this.props.history.push('/login')
        }
        this.props.actions.clearErrorHeader();
    }

    componentWillReceiveProps(nextProps) {   
        
        const { credsSuccess, otpSuccess } = nextProps;

        if(credsSuccess && otpSuccess){
            this.props.history.push('/')
        }
    }

    handleSubmit = (values) => {
        let data = {
            ...values,
            email: this.props.email
        }

        this.props.actions.otpVerification(data);
    };

    render() {
        const { requestErrors } = this.props;
        return (
            <div className="col-lg-8 offset-lg-2">
                <h2>OTP Verification</h2>
                <ErrorHeader errors={requestErrors}/>
                <Form name="nest-messages" onFinish={this.handleSubmit}>
                    <Form.Item name={['otp']} rules={[{ required: true }]}> 
                        <Input placeholder="XXXXXX" className="form-control"/>
                    </Form.Item>
                    <Form.Item className="form-group" style={{marginTop:20}}>
                        <button className="btn btn-primary">
                            Submit
                        </button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
function mapState(state) {
    return {
        userReducer: state.userReducer,
        credsSuccess: state.userReducer.credsSuccess,
        otpSuccess: state.userReducer.otpSuccess,
        email: state.userReducer.email,
        requestErrors: state.userReducer.requestErrors
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators({otpVerification, clearErrorHeader}, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(OTPVerification));