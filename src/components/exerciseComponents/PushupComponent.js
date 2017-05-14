import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class PushUps extends React.Component {

	render () {
		return (
	    <div style={{float: 'left', margin: 50}}>
	      <MuiThemeProvider>
	        <RaisedButton label="Push UP" primary={true} onClick={this.handleSubmit}/>
	      </MuiThemeProvider>
	    </div>
	    );
	}
}


