import React, { Component } from "react"

class NewQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState((previousState) => ({
			...previousState,
			[e.target.name]: value,
		}))
	}
	render() {
		return (
			<div className="container_body">
				<div className="title_newq">
					<h1>Create New Question</h1>
				</div>
				<div className="newq-inner">
					<div className="newq_text">
						<span>Complete the question:</span>
					</div>
					<div className="newq_text">
						<span>Would you rather ...</span>
					</div>
					<div className="newq-info">
						<form className="create_form">
							<input
								type="text"
								name="optionOne"
								value={this.state.optionOne}
								onChange={this.handleChange}
								placeholder="Enter Option One Text Here"
							/>
							<br />
							<span>OR</span>
							<br />
							<input
								type="text"
								name="optionTwo"
								value={this.state.optionTwo}
								onChange={this.handleChange}
								placeholder="Enter Option Two Text Here"
							/>
							<button className="submit_new_btn" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default NewQuestion
