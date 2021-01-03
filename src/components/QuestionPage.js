import React, { Component } from "react"
import { connect } from "react-redux"

class QuestionPage extends Component {
	render() {
		const { question } = this.props
		const { avatarURL, name } = this.props.author
		return (
			<div className="container_body">
				<div className="user_asks">
					<span>{name} asks:</span>
				</div>
				<div className="question-inner">
					<img
						src={avatarURL}
						alt={`Avatar of ${name}`}
						className="avatar"
					/>
					<div className="question-info">
						<div>
							<span>Would you rather...</span>
						</div>
						<div>
							<form className="radio_input">
								<input
									type="radio"
									id="optionOne"
									name="option"
									value="optionOne"
								/>
								<label for="optionOne">
									{question.optionOne.text}
								</label>
								<br />
								<input
									type="radio"
									id="optionTwo"
									name="option"
									value="optionTwo"
								/>
								<label for="optionTwo">
									{question.optionTwo.text}
								</label>
								<button className="submit_poll_btn">
									Submit
								</button>
							</form>
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

	return {
		id,
		author,
		question: question,
	}
}

export default connect(mapStateToProsp)(QuestionPage)
