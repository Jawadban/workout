import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Router, Route, Link, hashHistory } from 'react-router'
import LogUserData from './LogUserData'

export default class CardComp extends Component {
  constructor(props){
    super(props)
    this.state = {
      textInfo: false
    }
  }

	handleSubmit() {
    this.setState({
      textInfo: !this.state.textInfo
    })
    this.props.buttonClick()
  }


	render() {
    let startedRunning = this.state.textInfo ? 'Stop Running' : 'Start Running'
		return (
      <div style={{float: 'left', marginTop: '25px', marginLeft: '25px'}}>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title={this.props.userInfo.displayName}
              subtitle={this.props.totalDistanceTravelled.toFixed(4) + " Miles Run "}
              avatar={this.props.userInfo.photoURL}
            />
            <RaisedButton label={startedRunning} primary={true}
            onClick={this.handleSubmit.bind(this)} style={{width:150, height:30}}></RaisedButton>
            <Link to="/PushUps"><RaisedButton label="Push Ups" primary={true} style={{marginLeft: 0, height:30}}></RaisedButton></Link>
            <Link to="/Situps"><RaisedButton label="Sit Ups" primary={true} style={{marginLeft: 0, height:30}}></RaisedButton></Link>
          </Card> 
        </MuiThemeProvider>
        <LogUserData userInfo={this.props.userInfo} userData={this.props.totalDistanceTravelled} />
      </div> 
		)
	}
}