import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Question extends Component {
	render() {
		const { avatarURL, name } = this.props.user;
		const { answer } = this.props
		return (
			<Fragment>
				<div className='user_asks'>
					<span>{name} asks:</span>
				</div>
				<div className='question-inner'>
					<img
						src={avatarURL}
						alt={`Avatar of ${name}`}
						className="avatar"
					/>
					<div className="question-info">
						<div>
							<span>Would you rather</span>
							<p>...{answer}...</p>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps({ questions, users }, { id }) {
	const question = questions[id];
	const user = users[question.author];
	const answer = user.answers[id]
	return {
		question: question,
		user: user,
		answer: answer
	      ? question[answer].text
	      : question['optionOne'].text
	};
}

export default connect(mapStateToProps)(Question);
