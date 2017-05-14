import React from 'react';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';



class SignOut extends React.Component {
  constructor (props) {
    super (props)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut (event) {
    firebase.auth().signOut().then(function() {
  		// Sign-out successful.
  		console.log('Sign out successful')
		}, function(error) {
		  // An error happened.
		  console.log('ERROR happened while signing out')
		});
  }

  render () {
    return (
      <div>
        <div style={{float: 'right', marginRight: '56px', marginTop: '25px'}}>  
          <MuiThemeProvider>
            <RaisedButton label="Sign Out" primary={true} onClick={this.handleSignOut}/>
          </MuiThemeProvider>
        </div>

        <div style={{float: 'right', marginRight: '-100px', marginTop: '210px'}}>  
          <iframe width="335" height="250" src="https://www.youtube.com/embed/gF0rrpMH-Jo?autoplay=1"
          ></iframe>
        </div>
      </div>
    )
  }

}

export default SignOut;
				// <h1 style={{ marginRight: '35px'}}>Sign Out?</h1>