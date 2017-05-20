/* eslint-disable */
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


class LogUserData extends React.Component {

  render () {
    return (
      <div style={{float: 'left', marginTop: '65px'}}>
        <ul>
          <MuiThemeProvider>
            <Paper zDepth={1} >
            <Card>
              <CardHeader
                title={this.props.userInfo.displayName}
                subtitle={this.props.userData.toFixed(4) + " Miles Run "}
                avatar={this.props.userInfo.photoURL}
                style={{marginRight: '0px'}}
              />     
            </Card> 
            </Paper>
          </MuiThemeProvider>

          <h1 style={{color: 'white'}}>Total miles run</h1>
          <p style={{color: 'red', fontSize: 40}}>{(this.props.userData.toFixed(4))} <span style={{color: 'white', fontSize: 40}}>Miles</span></p>
          <h1 style={{color: 'white'}}>Total calories burnt</h1>
          <p style={{color: 'red', fontSize: 40}}>{(this.props.userData*100).toFixed(2)} <span style={{color: 'white', fontSize: 40}}>Calories</span></p>
        </ul>
      </div>
    )
  }

}

export default LogUserData;