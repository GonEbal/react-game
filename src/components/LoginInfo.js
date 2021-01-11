import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { handleRemoveAuthedUser } from "../actions/authedUser"

class LoginInfo extends Component {
  logOut = () => {
    const { dispatch} = this.props
    dispatch(handleRemoveAuthedUser())
  }
  render() {
    const { username } = this.props
    return (
      <nav className="nav_username">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Hello, {username}
            </NavLink>
          </li>
          <li onClick={this.logOut}>
              Logout
          </li>
        </ul>
      </nav>
    )
  }
} 

function mapStateToProps ({ authedUser, users }) {
  const username = users[authedUser].name
  return {
    username
  }
}

export default connect(mapStateToProps)(LoginInfo)

