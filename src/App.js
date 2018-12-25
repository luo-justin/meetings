import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import {Router, navigate} from '@reach/router';
import firebase from './Firebase';

import Home from './Home';
import Welcome from './Welcome';
import Meetings from './Meetings';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Checkin from './Checkin';
import Attendees from './Attendees';



class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.setState({
          user: user,
          displayName: user.displayName,
          userID: user.uid
        });

      const meetingsRef = firebase.database().ref('meetings/' +  user.uid);
      meetingsRef.on("value", snapshot => {
        let meetings = snapshot.val();
        let meetingsList = [];
        for(let item in meetings){
          meetingsList.push({
            meetingID: item,
            meetingName: meetings[item].meetingName,
            meetingDescription: meetings[item].meetingDescription
          });
        }

        this.setState({
        meetings: meetingsList,
        howManyMeetings: meetingsList.length
      })
      });

      }
      else{
        this.setState({user: null});
      }

    });
  }

  logOutUser = e =>{
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null, 
    });
    firebase.auth().signOut().then(()=>{
      navigate('/login');
    })
  }


  addMeeting = (meetingName, meetingDescription) => {
     const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
     ref.push({meetingName: meetingName, meetingDescription: meetingDescription});
  }

  registerUser = userName =>{
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        })
        navigate('/meetings');
      });
    });
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser}/>
        {this.state.user && <Welcome userName={this.state.displayName} logOutUser={this.logOutUser}/>}
        <Router>
          <Home path="/" user={this.state.user}/>
          <Meetings path="/meetings" userID={this.state.userID} addMeeting={this.addMeeting} meetings={this.state.meetings}/>
          <Checkin path="/checkin/:userID/:meetingID" />
          <Attendees path="/attendees/:userID/:meetingID" adminUser={this.state.userID} />
          <Login path="/login"/>
          <Register path="/register" registerUser={this.registerUser}/>
        </Router>
      </div>
    );
  }
}

export default App;
