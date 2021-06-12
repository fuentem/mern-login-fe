import React, { Component } from "react";
export default class ErrorHeader extends Component {

    constructor() {
        super();
    }

    render() {
        const { errors } = this.props
        return (
            <div className='error-list'>
                {
                    errors && errors.map(err => {
                        return <div className='alert alert-danger'>{err}</div>
                    })
                } 
            </div>
        )
    }
}