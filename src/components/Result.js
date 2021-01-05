import React, { Component } from "react"
import { connect } from "react-redux"
import ProgressBar from 'react-bootstrap/ProgressBar'

class Result extends Component {
	render() {
		const { avatarURL, name } = this.props.author
		const { total_answers, authedUser_answer, this_answer, } = this.props
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
					<div className="result-info">
						<div>
							<span>Results:</span>
						</div>
						<div>
							<p>Would you ...</p>
							<p>{((this_answer *100)/total_answers).toFixed(1) }%</p>
							<p>{this_answer} of {total_answers} votes</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProsp({ authedUser, questions, users }, props) {
	const { id } = props.match.params
	const question = questions[id]
	const author = users[question.author]
	const total_answers =
		Object.keys(question.optionTwo.votes).length +
		Object.keys(question.optionOne.votes).length

	const authedUser_answer = users[authedUser].answers[id]

	const this_answer = Object.keys(question.[authedUser_answer].votes).length

	return {
		total_answers,
		authedUser_answer,
		this_answer,
		author,
	}
}

export default connect(mapStateToProsp)(Result)
