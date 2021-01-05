import React, { Component } from "react"
import { connect } from "react-redux"

class Result extends Component {
	render() {
		const { avatarURL, name } = this.props.author
		const {
			total_answers,
			selected_option_count,
			unselected_option_count,
			selected_option_progress,
			unselected_option_progress,
			selected_option,
			unselected_option,
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
						<div className="option selected">
							<p>Would you {selected_option.text}?</p>
							<div className="progress_bar">
								<div
									style={{
										width: `${selected_option_progress}%`,
									}}
									className="progress"
								>
									{selected_option_progress}%
								</div>
							</div>
							<p className="answer_count">
								{selected_option_count} out of {total_answers}{" "}
								votes
							</p>
						</div>
						<div className="option">
							<p>Would you {unselected_option.text}?</p>
							<div className="progress_bar">
								<div
									style={{
										width: `${unselected_option_progress}%`,
									}}
									className="progress"
								>
									{unselected_option_progress}%
								</div>
							</div>
							<p className="answer_count">
								{unselected_option_count} out of {total_answers}{" "}
								votes
							</p>
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

	const selected_option = question[authedUser_answer]

	let unselected_option = ""
	if (selected_option.text === question.optionOne.text) {
		unselected_option = question.optionTwo
	} else {
		unselected_option = question.optionOne
	}

	const selected_option_count = Object.keys(selected_option.votes).length
	const unselected_option_count = Object.keys(unselected_option.votes).length

	return {
		author,
		total_answers,
		selected_option_count,
		unselected_option_count,
		selected_option_progress: (
			(selected_option_count * 100) /
			total_answers
		).toFixed(1),
		unselected_option_progress: (
			(unselected_option_count * 100) /
			total_answers
		).toFixed(1),
		selected_option,
		unselected_option,
	}
}

export default connect(mapStateToProsp)(Result)
