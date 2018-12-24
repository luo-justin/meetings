import React, { Component } from 'react';


class Meetings extends Component{
	render(){
		const { user } = this.props;
		return(
			<div className="text-center mt-4">
				<h1 className="text-primary">Meeetings</h1>
			</div>

		);
	}
}

export default Meetings;