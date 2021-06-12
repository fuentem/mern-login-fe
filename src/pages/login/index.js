import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser, clearErrorHeader } from '../../actions/userActions'
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import ErrorHeader from '../../components/ErrorHeader'
class Login extends Component {

    constructor() {
        super();
    }

    componentDidMount(){
        this.props.actions.clearErrorHeader();
    }

    componentWillReceiveProps(nextProps)
    {   
        const { credsSuccess } = nextProps;
        
        if(credsSuccess){
            this.props.history.push('/otpverify')
        }
    }

    handleSubmit = (values) => {
        this.props.actions.loginUser(values);
    };

    render() {
        const { requestErrors } = this.props;
        return (
            <div className="col-lg-8 offset-lg-2">
                <h2>Login</h2>
                <ErrorHeader errors={requestErrors}/>
                <Form name="nest-messages" onFinish={this.handleSubmit}>
                    <label>Email</label>
                    <Form.Item name={['email']} rules={[{ type: 'email', required: true }]}> 
                        <Input placeholder="Email" className="form-control"/>
                    </Form.Item>
                    
                    <label>Password</label>
                    <Form.Item name={['password']} rules={[{ required: true }]}>  
                        <Input type="password" placeholder="Password"  className="form-control"/>
                    </Form.Item>

                    <Form.Item className="form-group">
                        <button className="btn btn-primary">
                            Login
                        </button>
                        <Link to="/register" className="btn btn-link">Register</Link>
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
        requestErrors: state.userReducer.requestErrors
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators({loginUser, clearErrorHeader}, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(Login));