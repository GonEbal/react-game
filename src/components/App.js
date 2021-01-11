import "../App.css"
import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"
import Dashboard from "./Dashboard"
import QuestionPage from "./QuestionPage"
import Nav from "./Nav"
import Result from "./Result"
import NewQuestion from "./NewQuestion"
import LeaderBoard from "./LeaderBoard"
import Login from "./Login"
import NotFound from "./NotFound"

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
						{this.props.loading === true ? 
						<Route component={Login} /> 
						: (
							<div>
								<Switch>
									<Route exact path="/" component={Dashboard} />
									<Route exact path="/add" component={NewQuestion} />
									<Route exact path="/leaderboard" component={LeaderBoard} />
									<Route exact path="/questions/:id" component={QuestionPage} />
									<Route exact path="/result/:id" component={Result} />
									<Route component={NotFound} />
								</Switch>
							</div>
						)}
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