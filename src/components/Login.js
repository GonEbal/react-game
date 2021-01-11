import React, { Component } from "react"
import logo from "../loginicon.png"
import { connect } from "react-redux"
import { handleSetAuthedUser } from "../actions/authedUser"

class Login extends Component {
	state = {
		selectedUser: "none",
		toMain: false,
	}

	handleChange = (e) => {
		this.setState({
			selectedUser: e.target.value,
		})
	}
	handleSubmit = (formSubmitEvent) => {
		formSubmitEvent.preventDefault()
		const { selectedUser } = this.state
		const { authedUser, dispatch } = this.props

		dispatch(handleSetAuthedUser(selectedUser))
		this.setState(() => ({
			toMain: authedUser ? true : false,
		}))
	}
	render() {
		const { users } = this.props
		const { selectedUser } = this.state
		return (
			<div className="container_body">
				<div className="login-greeting">
					<span>Welcome to the Would You Rather APP!</span>
					<p>Please sign in to continue</p>
				</div>
				<div className="login_body">
					<img src={logo} alt="logo" className="logo" />
					<p>Sign in</p>
					<form onSubmit={this.handleSubmit}>
						<select
							className="select-login"
							onChange={this.handleChange}
							value={selectedUser}
						>
							<option value="none" disabled>
								Select User
							</option>
							{users.map((user) => (
								<option key={user.id} value={user.id}>
									{user.name}
								</option>
							))}
						</select>
						<br />
						<button
							className="sign-btn"
							disabled={selectedUser === "none"}
						>
							Sign in
						</button>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users }) {
	return {
		authedUser,
		users: Object.values(users).map((user) => user),
	}
}

export default connect(mapStateToProps)(Login)
