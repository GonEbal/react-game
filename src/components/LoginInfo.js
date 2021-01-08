import React from "react"
import { NavLink } from "react-router-dom"

export default function LoginInfo() {
  return (
    <nav className="nav_username">
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Hello, Denis
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
