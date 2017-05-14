import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, hashHistory } from 'react-router'


export default class Situp extends React.Component {
	handleSubmit() {
		
	}

	render () {
		return (
	    <div style={{float: 'left', margin: 50}}>
	    	<div>
		    	<iframe width="560" height="315" src="https://www.youtube.com/embed/66FxknOKq3Q"></iframe>
	    	</div>
	    	<div style={{marginTop: 50}}>
		      <MuiThemeProvider >
		        <RaisedButton label="Situp" primary={true} onClick={this.handleSubmit.bind(this)}/>
		      </MuiThemeProvider>
		      <MuiThemeProvider >
		        <Link to='/'><RaisedButton label="Back" primary={true} style={{marginLeft: 30}}/></Link>
		      </MuiThemeProvider>
	      </div>
	    </div>
	    );
	}
}
