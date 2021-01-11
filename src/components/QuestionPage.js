import React, { Component } from "react"
import { handleAddQuestionAswer } from "../actions/questions"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class QuestionPage extends Component {
	state = {
		selectedOption: "optionOne",
		toResult: false,
		hasError: false,
	}
	componentDidCatch(error, info) {
	    // Display fallback UI
	    this.setState({ hasError: true });
	    // You can also log the error to an error reporting service
	    //logErrorToMyService(error, info);
	}

	handleOptionChange = (e) => {
		this.setState({
			selectedOption: e.target.value,
		})
	}
	handleFormSubmit = (formSubmitEvent) => {
		formSubmitEvent.preventDefault()
		const { selectedOption } = this.state
		const { id, authedUser, dispatch } = this.props

		dispatch(
			handleAddQuestionAswer({
				authedUser,
				qid: id,
				answer: selectedOption,
			})
		)
		this.setState(() => ({
			toResult: id ? true : false,
		}))
	}
	render() {
		const { question } = this.props
		const { avatarURL, name } = this.props.author
		const { toResult } = this.state
		if (toResult === true) {
			return <Redirect to={`/result/${this.props.id}`} />
		}
		if (this.state.hasError) {
	      // You can render any custom fallback UI
	      return <h1>Something went wrong.</h1>;
	    }
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

function mapStateToProps({ authedUser, questions, users }, props) {
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

export default connect(mapStateToProps)(QuestionPage)
