import React, { Component } from "react"
import { connect } from "react-redux"
import { handleRemoveAuthedUser } from "../actions/authedUser"
import { fakeAuth } from "./Login"

class LoginInfo extends Component {
  logOut = () => {
    const { dispatch } = this.props
    dispatch(handleRemoveAuthedUser())
    fakeAuth.signout()
  }
  render() {
    const { username } = this.props
    return (
      <nav className="nav_username">
        <ul className="log">
          <li className="active">Hello, {username}</li>
          <li className="logout" onClick={this.logOut}>
            Logout
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  const username = users[authedUser].name
  return {
    username,
  }
}

export default connect(mapStateToProps)(LoginInfo)
