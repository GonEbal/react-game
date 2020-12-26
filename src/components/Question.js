import React, { Component } from 'react';

class Question extends Component {
	render() {
		return (
			<div>
				{this.props.id}
			</div>
		);
	}
}

export default Question