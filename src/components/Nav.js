import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import LoginInfo from "./LoginInfo"
import { connect } from "react-redux"

const Nav = ({ isAuthedUser }) => (
  <Fragment>
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/react-game" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/react-game/add" activeClassName="active">
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/react-game/leaderboard" activeClassName="active">
            Leader Board
          </NavLink>
        </li>
      </ul>
    </nav>
    {isAuthedUser && <LoginInfo />}
  </Fragment>
)

function mapStateToProps({ authedUser }) {
  return {
    isAuthedUser: authedUser !== null,
  }
}

export default connect(mapStateToProps)(Nav)
