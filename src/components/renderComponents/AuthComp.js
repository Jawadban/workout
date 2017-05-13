import React, { Component } from 'react'; 
import SignUp from '../authComponents/SignupComponent.js'
// import LogIn from '../authComponents/LoginComponent.js'
import SignOut from '../authComponents/SignoutComponent.js'


export default class Auth extends Component {
	render() {
		return(
			<div>    
        {
          this.props.userInfo ? <SignOut/> : <SignUp />
        }
      </div>
		)
	}
}