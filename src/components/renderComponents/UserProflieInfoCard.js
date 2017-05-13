import React from 'react';
import GoogleWholeRoute from '../googleMapsComponents/WholeRoute.js'
import GoogleMapStatic from '../googleMapsComponents/CurrentLocationMap.js';
import LogUserData from './LogUserData.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



export default class AllUserData extends React.Component{
	constructor (props) {
		super (props)
	}

	render () {
		return (
			<div style={{float: 'left',}}>     
        <LogUserData userData={this.props.userData} userInfo={this.props.userInfo}/>
        <GoogleMapStatic coords={this.props.coords[this.props.coords.length -1]} />
        <GoogleWholeRoute coords={this.props.coords} />
      </div>
		);
	}
} 