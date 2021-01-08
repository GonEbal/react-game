import React, { Component } from 'react'
import logo from '../loginicon.png'
import { connect } from "react-redux"

class Login extends Component {
	render() {
		const { users } = this.props
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
					<form>
						<select className='select-login'>
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
		users: Object.values(users).map((user) => user),
	}
}

export default connect(mapStateToProsp)(Login)