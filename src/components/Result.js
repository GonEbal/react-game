import React, { Component } from "react"
import { connect } from "react-redux"

class Result extends Component {
	render() {
		const { avatarURL, name } = this.props.author
		const {
			total_answers,
			authedUser_answer,
			this_answer,
			progress,
		} = this.props
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
							<p>{progress}%</p>
							<p>
								{this_answer} of {total_answers} votes
							</p>
							<progress id="file" value={progress} max="100">
								{" "}
								{progress}%{" "}
							</progress>
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

	const this_answer = Object.keys(question[authedUser_answer].votes).length

	return {
		total_answers,
		authedUser_answer,
		this_answer,
		author,
		progress: ((this_answer * 100) / total_answers).toFixed(1),
	}
}

export default connect(mapStateToProsp)(Result)
