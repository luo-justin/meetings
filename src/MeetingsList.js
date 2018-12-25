import React, { Component } from 'react';
import firebase from './Firebase';
import {GoTrashcan, GoListUnordered} from 'react-icons/go';
import {FaPlus} from 'react-icons/fa';
import {navigate} from '@reach/router';

class MeetingsList extends Component{

	constructor(props){
		super(props);
		this.deleteMeeting = this.deleteMeeting.bind(this);
	}

	deleteMeeting = (e, meeetingID) => {
		e.preventDefault();
		const ref = firebase.database().ref(`meetings/${this.props.userID}/${meeetingID}`);
		ref.remove();
	}



	render(){
		const { meetings } = this.props;
		const myMeetings = meetings.map(item =>{
		return(
			<div className="list-group-item" key={item.meetingID}>
				<div class="card border-0">
			    <div class="text-left" id="headingOne">
			        <button class="btn btn-link " type="button" data-toggle="collapse" data-target={"#collapse-" +  item.meetingID} aria-expanded="true" aria-controls="collapseOne">
			          <h4>{item.meetingName}</h4>
			        </button>
			        <section className="btn-group align-self-center" role="group" aria-label="Meeting Options">
								<button className="btn btn-sm btn-outline-secondary" title="Delete Meeting" onClick={e => this.deleteMeeting(e, item.meetingID)}>
								<GoTrashcan />
								</button>
								<button className="btn btn-sm btn-outline-secondary" title="Check In" onClick={() => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)}>
								<FaPlus />
								</button>
								<button className="btn btn-sm btn-outline-secondary" title="Attendees List" onClick={() => navigate(`/attendees/${this.props.userID}/${item.meetingID}`)}>
								<GoListUnordered />
								</button>
							</section>
			    </div>
			    <div id={"collapse-" +  item.meetingID} class="collapse hide" aria-labelledby="headingOne" data-parent="#accordionExample">
			      <div class="card-body text-left">
			      	{item.meetingDescription}
			      </div>
			    </div>
			  </div>
			</div>
		);
	});
		return(
			<div>
				{myMeetings}
			</div>

		);
	}
}

export default MeetingsList;