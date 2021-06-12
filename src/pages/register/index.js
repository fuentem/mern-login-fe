import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { register, clearErrorHeader } from '../../actions/userActions'
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import ErrorHeader from '../../components/ErrorHeader'

class RegisterUser extends Component {

    constructor() {
        super();
    }

    formRef = React.createRef();

    componentDidMount() {
        this.props.actions.clearErrorHeader();
    }

    componentWillReceiveProps(nextProps) {   
        const { registerSuccess } = nextProps;
        
        if(registerSuccess){
            this.formRef.current.resetFields();
        }
    }
    
    handleSubmit = (values) => {
        this.props.actions.register(values);
    };

    render() {
        const { requestErrors, registerSuccess } = this.props;
        return (
            <div className="col-lg-8 offset-lg-2">
                <h2>Register</h2>
                <ErrorHeader errors={requestErrors}/>
                
                {registerSuccess && <div className='alert alert-success'>User has been registered successfully!</div>                }

                <Form name="nest-messages" onFinish={this.handleSubmit} ref={this.formRef}>
                    <label>Name</label>
                    <Form.Item name={['name']} rules={[{ required: true }]}> 
                        <Input placeholder="Name" className="form-control"/>
                    </Form.Item>
                    <label>Email</label>
                    <Form.Item name={['email']} rules={[{ type: 'email', required: true }]}> 
                        <Input placeholder="Email" className="form-control"/>
                    </Form.Item>
                    <label>Contact No. {"(+<country_code><phone_no>)"}</label>
                    <Form.Item name={['contactNo']} rules={[{ required: true }]}> 
                        <Input placeholder="+639172312137" className="form-control"/>
                    </Form.Item>
                    <label>Password</label>
                    <Form.Item name={['password']} rules={[{ required: true }]}>  
                        <Input type="password" placeholder="Password"  className="form-control"/>
                    </Form.Item>
                    <label>Confirm Password</label>
                    <Form.Item name={['password_confirmation']} rules={[{ required: true }]}>  
                        <Input type="password" placeholder="Password"  className="form-control"/>
                    </Form.Item>
                    <Form.Item className="form-group">
                        <button className="btn btn-primary">
                            Register
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
        requestErrors: state.userReducer.requestErrors,
        registerSuccess: state.userReducer.registerSuccess,
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators({register, clearErrorHeader}, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(RegisterUser));