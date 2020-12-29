import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Question extends Component {
	render() {
		const { avatarURL, name, id } = this.props.user;
		const { optionOne, optionTwo } = this.props.question
		return (
			<Fragment>
				<img
					src={avatarURL}
					alt={`Avatar of ${name}`}
					className="avatar"
				/>
				<div className="tweet-info">
					<div>
						<span>{name}</span>
						<p>{optionOne.text}</p>
					</div>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps({ questions, users }, { id }) {
	const question = questions[id];
	const user = users[question.author];
	return {
		question: question,
		user: user,
	};
}

export default connect(mapStateToProps)(Question);
