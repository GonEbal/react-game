import React, { Component } from "react"
import { connect } from "react-redux"

class QuestionPage extends Component {
	state = {
		selectedOption: "optionOne",
	}

	handleOptionChange = (e) => {
		this.setState({
			selectedOption: e.target.value,
		})
	}
	handleFormSubmit = (formSubmitEvent) => {
		formSubmitEvent.preventDefault()
		console.log("You have selected:", this.state.selectedOption)
	}
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
							<form
								onSubmit={this.handleFormSubmit}
								className="radio_input"
							>
								<label>
									<input
										type="radio"
										value="optionOne"
										checked={
											this.state.selectedOption ===
											"optionOne"
										}
										onChange={this.handleOptionChange}
									/>
									{question.optionOne.text}
								</label>
								<br />
								<label>
									<input
										type="radio"
										value="optionTwo"
										checked={
											this.state.selectedOption ===
											"optionTwo"
										}
										onChange={this.handleOptionChange}
									/>

									{question.optionTwo.text}
								</label>
								<button
									className="submit_poll_btn"
									type="submit"
								>
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
