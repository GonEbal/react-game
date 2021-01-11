import React, { Component, Fragment } from "react"
import { NavLink } from "react-router-dom"
import LoginInfo from "./LoginInfo"
import { connect } from "react-redux"

class Nav extends Component {
  render() {
    return (
      <Fragment>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/new" activeClassName="active">
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard" activeClassName="active">
                Leader Board
              </NavLink>
            </li>
          </ul>
        </nav>
        {this.props.isAuthedUser === false ? null : <LoginInfo />}
      </Fragment>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isAuthedUser: authedUser !== null,
  }
}

export default connect(mapStateToProps)(Nav)
