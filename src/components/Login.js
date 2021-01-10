import React, { Component } from 'react'
import logo from '../loginicon.png'
import { connect } from "react-redux"

class Login extends Component {
	state = {
		selectedUser: "",
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
		const { authedUser } = this.props
		console.log(authedUser)
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
					<img
						src={logo}
						alt='logo'
						className='logo'
					/>
					<p>Sign in</p>
					<form onSubmit={this.handleSubmit}>
						<select className='select-login' onChange={this.handleChange} value={selectedUser}>
						{users.map((user) => (
				            <option value={user.id}>{user.name}</option>
				        ))}
					  </select>
					  <br/>
						<button className='sign-btn'>
							Sign in
						</button>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProsp({ authedUser, users }) {
	return {
		authedUser,
		users: Object.values(users).map((user) => user),
	}
}

export default connect(mapStateToProsp)(Login)