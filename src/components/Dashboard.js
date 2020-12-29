import React, { Component } from "react"
import { connect } from "react-redux"
import Question from "./Question"

class Dashboard extends Component {
  state ={
    show_answered: true,
  }

  unanswered = () => {
    const container = document.getElementById("container_list")
    container.classList.add("right-panel-active")
  }
  answered = () => {
    const container = document.getElementById("container_list")
    container.classList.remove("right-panel-active")
  }

  change = () => {
    this.setState({ show_answered: !this.state.show_answered })
  }

  render() {
    return (
      <div className="container_body">
      <button
      onClick={this.change}
      >
        Change
      </button>
        <div className='check' style={{display: this.state.show_answered ? 'block' : 'none' }}>
          {this.props.answered_q.map((id) => (
            <li key={id} className="question">
              <Question id={id} />
            </li>
          ))}
        </div>
         <div style={{display: !this.state.show_answered ? 'block' : 'none' }}>
          {this.props.unanswered_q.map((id) => (
            <li key={id} className="question">
              <Question id={id} />
            </li>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  const answered_questions = Object.values(questions).filter(
    (valueName) =>
      valueName.optionOne.votes.includes(authedUser) ||
      valueName.optionTwo.votes.includes(authedUser)
  )

  const unanswered_questions = Object.values(questions).filter(
    (valueName) =>
      !valueName.optionOne.votes.includes(authedUser) &&
      !valueName.optionTwo.votes.includes(authedUser)
  )
  return {
    unanswered_q: Object.values(unanswered_questions).map((item) => item.id),
    answered_q: Object.values(answered_questions).map((item) => item.id),
  }
}

export default connect(mapStateToProps)(Dashboard)
