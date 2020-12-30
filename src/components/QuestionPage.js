import React, { Component } from 'react';
import { connect } from "react-redux"

class QuestionPage extends Component {
	render() {
		const { id } = this.props
		return (
			<div>
				{id}
			</div>
		);
	}
}

function mapStateToProsp({ authedUser }, props) {
	const { id } = props.match.params

	return {
		id,
	}
}

export default connect(mapStateToProsp)(QuestionPage)

