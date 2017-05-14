import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class StartRunning extends React.Component {

	render () {
		return (
	    <div style={{float: 'left'}}>
	    	<h1>thisis the running compon</h1>
	      <MuiThemeProvider>
	        <RaisedButton label="Start Running" primary={true} onClick={this.handleSubmit}/>
	      </MuiThemeProvider>
	    </div>
	    );
	}
}
