import React, { Component } from 'react';


class FormError extends Component{
	render(){
		const { message } = this.props;
		return(
			<div className="alert alert-danger px-3 w-100">
			{message}
			</div>

		);
	}
}

export default FormError;