/* eslint-disable */
import React from 'react';
import * as firebase from 'firebase';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FB from'fb';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let obj = []

const style = {
  marginLeft: 20,
};

class News extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newsObj: null

    }
  }

  componentDidMount() {
    let thisInst = this

    this.

    // GET request for remote image
    axios({
      method:'get',
      url:'https://newsapi.org/v1/articles?source=techcrunch&apiKey=b7f111332ea241dd9d93a86228743d53',
      responseType:'stream'
    })
      .then(function(response) {
        console.log(response.data.articles)
        thisInst.setState({
          newsObj: response.data.articles
        })
    console.log(this.state.newsObj)
    });

  }


  render() {
    var newsTitle = this.state.newsObj? this.state.newsObj[0].title: null
    var newsDes = this.state.newsObj? this.state.newsObj[0].description: null

    return(
      <div style={{float:'right', color: 'white'}}>
        <h4>{newsTitle}</h4>
        <p>{newsDes}</p>
      </div>
    )
  }
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.facebookLoginHandle = this.facebookLoginHandle.bind(this)
  }

  // saveUsername (usrNam) {
  //   console.log('Im firing this /\//\/\\/\/\/\/\//\/\/');
  //    firebase.database().ref('users/' + 'userId' + '/userName').set({
  //       username: usrNam
  //     });
  // }

  // componentDidMount() {
  //   //this is to check if someone else is not logged into facebook using same details
  //   FB.getLoginStatus(function(response) {
  //     console.log(response)
  //     statusChangeCallback(response);
  //   });
  // }

  facebookLoginHandle(event) {

    console.log('Button click <<<<<<<<<')
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
      alert('bananas')
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('FacebOOOOOOOOOOk user: ', result)
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.error(error)
      // ...
    });

    // firebase.database().ref('users/' + this.state.user.uid + '/userDetails').set({
    //   userName: coord
    // });

    event.preventDefault()

  }

  handleChange(event) {
    //this.setState({value: event.target.value});
    const target = event.target;
    //const value = target.type === 'text' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    const val = this

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      }).then(function(user) {
        return user.updateProfile({displayName: val.state.userName});
      }).catch(function(error) {
        console.log(error);
      });


    //this.saveUsername(val.state.userName)


    //   firebase.database().ref('users/' + 'userId').set({
    //     username: this.state.userName,
    //     email: this.state.email,
    //     //profile_picture : imageUrl
    //   });
    // }
    // writeUserData.bind(this);

    event.preventDefault();
  }


  render() {
    // var provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });




    return (
      <div>

      <img src="logo.png" style={{height:120, marginTop: 35, marginLeft:165, 
        marginBottom:30, verticalAlign:'left'}} />

        <div >
          <div style={{ float: 'left', marginLeft: 50, verticalAlign:'left'}}>
          <iframe width="340" height="191" 
          src="https://www.youtube.com/embed/gZEBDahq7F0?autoplay=1&controls=0&showinfo=0"
          />
          <div>
          <form onSubmit={this.handleSubmit} style={{float: 'left', marginTop: 30, 
          marginBottom:22, width: 343}}>
            <MuiThemeProvider>
              <Paper zDepth={2}>
                <TextField hintText="First name" name='userName' style={style} 
                  value={this.state.userName} 
                  onChange={this.handleChange} 
                  underlineShow={false} 
                />
                <Divider />
                <TextField hintText="Email address" type="email" name='email' 
                  value={this.state.email} 
                  onChange={this.handleChange} 
                  style={style} underlineShow={false} 
                />
                <Divider />
                <TextField hintText="password" type="password" name='password' value={this.state.password}
                onChange={this.handleChange} style={style} underlineShow={false} />
                <Divider />
              </Paper>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <RaisedButton label="SignUp" value="SignUp" type="submit" primary={true}
              style={{width:146.5}}/>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <RaisedButton label="Login With Facebook" onClick={this.facebookLoginHandle}
              primary={true} />
            </MuiThemeProvider>
          </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;