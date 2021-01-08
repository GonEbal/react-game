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
	let sorted_leaders = Object.values(users).sort(function (one, other) {
	   return (Object.values(other.answers).length + Object.values(other.questions).length) - (Object.values(one.answers).length + Object.values(one.questions).length)
	})
	return {
		users: sorted_leaders.map((user) => user.id)
	}
}

export default connect(mapStateToProps)(LeaderBoard)