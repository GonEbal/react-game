import React, { Component } from 'react'
import { connect } from "react-redux"
import LeaderBoardUser from "./LeaderBoardUser"

class LeaderBoard extends Component {
	render() {
		return (
			<div className='leaderboard'>
				{this.props.users.map((id) => (
		            <li key={id} className="question">
		              <LeaderBoardUser id={id} />
		            </li>
		          ))}
			</div>
		)
	}
}

function mapStateToProps({ users }) {
	return {
		users: Object.values(users).map((user) => user.id)
	}
}

export default connect(mapStateToProps)(LeaderBoard)