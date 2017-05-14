import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Router, Route, Link, hashHistory } from 'react-router'
import LogUserData from './LogUserData'

export default class CardComp extends Component {

	handleSubmit() {
		this.props.buttonClick()
	}

	render() {
		return (
      <div style={{float: 'left', marginTop: '25px', marginLeft: '25px'}}>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title={this.props.userInfo.displayName}
              subtitle={this.props.totalDistanceTravelled.toFixed(4) + " Miles Run "}
              avatar={this.props.userInfo.photoURL}
            />     
              <RaisedButton label="Start Running" primary={true} 
              onClick={this.handleSubmit.bind(this)}></RaisedButton>
              <Link to="/PushUps"><RaisedButton label="Push Ups" primary={true} ></RaisedButton></Link>
              <RaisedButton label="Sit Ups" primary={true} ></RaisedButton>

          </Card> 
        </MuiThemeProvider>
        <LogUserData userInfo={this.props.userInfo} userData={this.props.totalDistanceTravelled} />
      </div> 
		)
	}
}