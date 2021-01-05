import React, { Component } from "react"
import { connect } from "react-redux"

class Result extends Component {
	state = {
		optionOne_class: '',
		optionTwo_class: '',
	}
	componentDidMount() {
		const { authedUser_answer } = this.props
		if (authedUser_answer === "optionOne") {
			this.setState({ optionOne_class: 'option selected',
							optionTwo_class: 'option'})
		} else if (authedUser_answer === "optionTwo") {
			this.setState({ optionOne_class: 'option',
							optionTwo_class: 'option selected'})
		}
	}
	render() {
		const { avatarURL, name } = this.props.author
		const {
			total_answers,
			this_answer_count,
			progress,
		} = this.props
		const { optionOne_class, optionTwo_class } = this.state

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
						<div className={optionOne_class}>
							<p>Would you ...</p>
							<div className="progress_bar">
								<div
									style={{ width: `${progress}%` }}
									className="progress"
								>
									{progress}%
								</div>
							</div>
							<p className="answer_count">
								{this_answer_count} out of {total_answers} votes
							</p>
						</div>
						<div className= {optionTwo_class}>
							<p>Would you ...</p>
							<div className="progress_bar">
								<div
									style={{ width: `${progress}%` }}
									className="progress"
								>
									{progress}%
								</div>
							</div>
							<p className="answer_count">
								{this_answer_count} out of {total_answers} votes
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

	const this_answer_count = Object.keys(question[authedUser_answer].votes)
		.length

	return {
		total_answers,
		authedUser_answer,
		this_answer_count,
		author,
		progress: ((this_answer_count * 100) / total_answers).toFixed(1),
	}
}

export default connect(mapStateToProsp)(Result)
