import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAddQuestion } from "../actions/questions"
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
		toHome: false,
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState({ [e.target.name]: value })
	}
	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOne, optionTwo } = this.state
		const { id } = this.props

		this.props.handleAddQuestion(optionOne, optionTwo)

		this.setState(() => ({
			optionOne: "",
			optionTwo: "",
			toHome: id ? false : true,
		}))
	}
	render() {
		const { optionOne, optionTwo, toHome } = this.state
		if (toHome === true) {
	      return <Redirect to='/' />
	    }
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
						<form
							className="create_form"
							onSubmit={this.handleSubmit}
						>
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
							<button
								className="submit_new_btn"
								type="submit"
								disabled={optionOne === "" || optionTwo === ""}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(null, { handleAddQuestion })(NewQuestion)
