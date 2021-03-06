import "../App.css"
import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"
import Dashboard from "./Dashboard"
import QuestionPage from "./QuestionPage"
import Nav from "./Nav"
import Result from "./Result"
import NewQuestion from "./NewQuestion"
import LeaderBoard from "./LeaderBoard"
import Login, { fakeAuth } from "./Login"
import NotFound from "./NotFound"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

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
						<div className="Navbar">
							<Nav />
						</div>
						<div>
							<Switch>
								<PrivateRoute exact path="/" component={Dashboard} />
								<PrivateRoute exact path="/add" component={NewQuestion} />
								<PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
								<PrivateRoute exact path="/questions/:id" component={QuestionPage} />
								<PrivateRoute exact path="/result/:id" component={Result} />
								<Route exact path="/login" component={Login} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Fragment>
			</Router>
		)
	}
}

function mapStateToProps({ authedUser }) {
	return {
		loading: authedUser === null,
	}
}

export default connect(mapStateToProps)(App)
