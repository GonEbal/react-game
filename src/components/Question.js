import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

class Question extends Component {
	render() {
		const { answer, answered } = this.props
		const { avatarURL, name } = this.props.author
		return (
			<Fragment>
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
							<span>Would you rather</span>
							<p>...{answer}...</p>
							{answered === false ? (
								<Link to={{pathname: `/questions/${this.props.id}`, state: {answered: false}}}>
									<button className="view_poll_btn">
										View Poll
									</button>
								</Link>
							) : (
								<Link to={{pathname: `/questions/${this.props.id}`, state: {answered: true}}}>
									<button className="view_poll_btn">
										View Poll
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
	const question = questions[id]
	const author = users[question.author]
	const loggedUser = users[authedUser]
	const answer = loggedUser.answers[id]
	return {
		question: question,
		author: author,
		loggedUser: loggedUser,
		answer: answer
			? question[answer].text
			: `${question["optionOne"].text}...or...${question["optionTwo"].text}`,
	}
}

export default withRouter(connect(mapStateToProps)(Question))
