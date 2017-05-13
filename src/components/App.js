import React from 'react'; 
import './App.css';
import * as firebase from 'firebase';
import Auth from './renderComponents/AuthComp'
import CardComp from './renderComponents/CardComp'
import {getGeoLocation,  totalDistanceTravelled} from './googleMapsComponents/getUserCoordsFunctions.js'
import {config} from './authComponents/firebaseAuthConfig.js'
import AllUserData from './renderComponents/UserProflieInfoCard.js'

// coord keeps the user location coordinates from the getUserLocation function
export var coord = [];

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      user: null,
      coords: [],
      coordPosNow: coord,
      dbCoordsNow: '', 
      intervalId: null,
      timerId: null,
      timeStamp: new Date(),
      totalDistanceTravelled: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value,
    })
  }

  // When user clicks start running handle submit is called to initiate the timeInterval
  // that starts taking user coords and calculating distance between last coordinates
  handleSubmit (event) {
    const thisInst = this;

    var timeStamp = new Date()
    this.setState({
      timeStamp: timeStamp
    })
    console.log(this.state.timeStamp)

    // Calling getGeoLocation function to get user location coordinates in the timeinterval.
    if(this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null
      });
    } else {
      this.setState({
        intervalId: setInterval(
          function () {
            getGeoLocation ()
            thisInst.setState({
              totalDistanceTravelled: totalDistanceTravelled
            })
            console.log(coord, 'These are the user coords')
          }
          , 1000)
      });
    }
    
    // Time Stamping for database 'coord' insertion purposes
    var timeStampForThisRunningInstance = this.state.timeStamp

    // This setInterval is for updating state 'coords' 
    // and to update firebase database with 'coord' which are time stamped.
    if(this.state.timerId) {
      clearInterval(this.state.timerId);
      this.setState({
        timerId: null
      });
    } else {
      this.setState({
        timerId: setInterval(
          () => {
            // Here we are linking our firebase database with the user location coordinates 'coord'
            var database = firebase.database()
            var ref = database.ref('users/' + this.state.user.uid + '/run/' + timeStampForThisRunningInstance )
            ref.set({
              coord: coord,
            });

            var userDetailsInsersion = database.ref('users/' + this.state.user.uid + '/userDetails')
            userDetailsInsersion.set({
              userName: thisInst.state.user.displayName,
              userPic: thisInst.state.user.photoURL,
            });

            // Here the 'coords' that we are feeding to our render 
            // screens are set to 'coord' from the getGeoLocation function
            thisInst.setState({
              coords: coord,
            })
          }
          , 500)
      });
    }


    clearInterval(this.state.timerId);
  }

  // this function will be called to update state coordPosNow which is used to 
  // update the rendered componenets with user location etc.
  tick() {
    this.setState({
      coordPosNow: coord,
    })
  }

  // pushing the user coords to firebase Database.
  writeUserInfoDetails (coordArra) {
    firebase.database().ref('users/' + this.state.user.uid + '/userDetails').set({
      coord: coord
    });
  }

  // getting the user coord from firebase database
  getUserInfoDetails () {
    console.log('<<<<<<<<<<<<<<<<<<<')
    const thisVal = this;

    firebase.database().ref('users/' + this.state.user.uid ).on('value', function(snapshot) {
      if (snapshot.val()) {  
        thisVal.setState({
          dbCoordsNow: snapshot.val().coord,
        });
      }
      console.log(thisVal.state.dbCoordsNow, '>>>>>>>>')
    });
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 3000)

    var val = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('*************');
        (function () {
          val.setState({
            user: user
          })
        })();
        
        // console.log(this.state.user)
      } else {
        // No user is signed in.
        console.log('===========') 
        val.setState({
          user: null
        })
      }
    });

    if (this.state.user) {
      firebase.database().ref('users/' + this.state.user.uid ).on('value', function(snapshot) {
        if (snapshot.val()) {  
          this.setState({
            dbCoordsNow: snapshot.val().coord,
          });
        }
        console.log(this.state.dbCoordsNow, '>>>>>>>>')
      })
    } 
  }

  // clearing the setInterval Id's so that we dont have duplication of tasks being performed
  componentWillMount(){
    // Google Firebase initialized to use from FireBaseAutConfig 
    // file where the Firebase coniguration lives
    firebase.initializeApp(config);

    clearInterval(this.timerId);
    clearInterval(this.dbtimerId);
    clearInterval(this.getDbtimerId);
  }

  render () {    
    return (

      <div>
        <div> 
          <Auth userInfo={this.state.user} />
          {
            (this.state.user) ? <CardComp userInfo={this.state.user} 
            totalDistanceTravelled={this.state.totalDistanceTravelled} 
            buttonClick={this.handleSubmit.bind(this)}/> : null
          }
        </div>
        {
          this.state.coords[0] && this.state.user ?
            <AllUserData coords={this.state.coords} userData={this.state.totalDistanceTravelled} 
            userInfo={this.state.user} /> : null
        }
        { 
          this.state.coords.length > 0 && this.state.user ?
          <div style={{float: 'left'}}>
            <ul>
              <h1 style={{color: 'white'}}><span style={{color: 'red'}}>Dani</span> in <span style={{color: 'pink'}}>Tokoyo</span></h1>
            </ul>
            <AllUserData coords={[{Latitude :35.604561, Longitude: 139.7901791}]} userData={this.state.totalDistanceTravelled}
            userInfo={this.state.user}/>
          </div>
          : null
        }
      </div>
    );
  }

}

export default App;