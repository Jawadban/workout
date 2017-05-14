import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App'
import PushUps from './components/exerciseComponents/PushupComponent.js'
import './index.css';
import RunningComponent from './components/exerciseComponents/RunningComponent'
// import { Router, Route, browserHistory, IndexRoute } from 'react-router'


ReactDOM.render(
	<Router history={browserHistory}>
    <Route path="/" component={App} />
	  <Route path="/PushUps" component={PushUps}/>
	  <Route path="/Run" component={RunningComponent} />
	  <Route path="/SitUps" component={PushUps} />
  </Router>,
  document.getElementById('root'))

