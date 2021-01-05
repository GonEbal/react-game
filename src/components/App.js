import '../App.css'
import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import Result from './Result'
import ProgressBar from 'react-bootstrap/ProgressBar'

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
					<ProgressBar now={60} variant="danger" label='60%' />
						{this.props.loading === true 
							? null 
							: <div>
								<div className='Navbar'>
									<Nav />
								</div>
								<Route path='/' exact component={Dashboard} />
								<Route path='/question/:id' exact component={QuestionPage} />
								<Route path='/result/:id' exact component={Result} />
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
