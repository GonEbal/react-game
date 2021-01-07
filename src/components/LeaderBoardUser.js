import React, { Component } from 'react'
import { connect } from "react-redux"

class LeaderBoardUser extends Component {
	render() {
		const { id } = this.props
		return (
			<div>
				{id}
			</div>
		)
	}
}

function mapStateToProps({ users }, { id }) {
 	return {
		id
	}
}

export default connect(mapStateToProps)(LeaderBoardUser)