import React, { Component } from 'react'
import { connect } from "react-redux"

class Result extends Component {
	render() {
		const { avatarURL, name } = this.props.author
		return (
			<div className="container_body">
				<div className="user_asks">
					<span>Asked by {name}</span>
				</div>
				<div className="question-inner">
					<img
						src={avatarURL}
						alt={`Avatar of ${name}`}
						className="avatar"
					/>
				</div>
			</div>
		)
	}
}

function mapStateToProsp({ authedUser, questions, users }, props) {
	const { id } = props.match.params
	const question = questions[id]
	const author = users[question.author]

	return {
		id,
		authedUser,
		author,
		question,
	}
}

export default connect(mapStateToProsp)(Result)