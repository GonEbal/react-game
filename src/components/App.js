import '../App.css'
import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"
import Dashboard from './Dashboard'
import Nav from './Nav'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className="container">
						{this.props.loading === true 
							? null 
							: <div className='Navbar'>
								<Route path='/' exact component={Nav} />
							</div>}
					</div>
				</Fragment>
			</Router>
		)
	}
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
