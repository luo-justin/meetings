import React, { Component } from 'react';
import MeetingsList from './MeetingsList';

class Meetings extends Component{
	constructor(props){
		super(props);
		this.state = {
			meetingName: '',
			meetingDescription: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		const itemName = e.target.name;
		const itemValue = e.target.value;
		const state = this.state;
		state[itemName] = itemValue;
		this.setState(state);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.addMeeting(this.state.meetingName, this.state.meetingDescription);
		this.setState({meetingName: '', meetingDescription: ''})
	}

	render(){
		return(
			<div className="container mt-4">

			  <div className="row justify-content-center">
			    <div className="col-md-8 text-center">
			      <h1 className="font-weight-light">Add a Meeting</h1>
			      <div className="card bg-light">
			        <div className="card-body text-center">
			          <form
			            className="form-group"
			            onSubmit = {this.handleSubmit}
			          >
			            <div className="input-group input-group-lg">
			              <input
			                type="text"
			                className="form-control"
			                name="meetingName"
			                placeholder="Meeting name"
			                aria-describedby="buttonAdd"
			                value= {this.state.meetingName}
			                onChange = {this.handleChange}
			                required
			              />
			            </div>
			             <div class="form-group mt-4">
									    <textarea class="form-control" id="exampleFormControlTextarea1"  
									    	placeholder="Describe your meeting here..." rows="3" 
									    	name="meetingDescription"
									    	onChange = {this.handleChange}
									    	value= {this.state.meetingDescription} required
									    	></textarea>
									  </div>

									<button
			                  type="submit"
			                  className="btn btn-lg btn-primary float-right"
			                  id="buttonAdd"
			                >
			                  Add Meeting
			             </button>
			          </form>
			        </div>
			      </div>
			    </div>

			<div className="col-11 col-md-6 text-center">
				<div className="card mt-4 rounded-0">
				{this.props.meetings && this.props.meetings.length ? (
					<div className="card-body py-2">
						<h4 className="card-title font-weight-light m-0">
						Your Meetings
						</h4>
					</div>
					):null}

				{this.props.meetings && (
					<div class="accordion" id="accordionExample">
						<MeetingsList meetings={this.props.meetings} userID={this.props.userID}/>
					</div>
					)}

				</div>
			</div>
			  </div>
			</div>

		);
	}
}

export default Meetings;