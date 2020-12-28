import React, { Component } from "react"
import { connect } from "react-redux"
import Question from "./Question"

class Dashboard extends Component {
  unanswered = () => {
    const container = document.getElementById("container_list")
    container.classList.add("right-panel-active")
  }
  answered = () => {
    const container = document.getElementById("container_list")
    container.classList.remove("right-panel-active")
  }
  render() {
    console.log(this.props.questionIds)
    console.log(this.props.answered_q)
    return (
      <div className="container_body">
        <div className="container_list" id="container_list">
          <div className="form-container_list unanswered-container_list questions_list">
            <h1>Unanswered</h1>
            <ul className="dashboard-list">
              {this.props.unanswered_q.map((id) => (
                <li key={id} className="question">
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </div>
          <div className="form-container_list answered-container_list questions_list">
            <h1>Answered</h1>
            <ul className="dashboard-list">
              {this.props.answered_q.map((id) => (
                <li key={id} className="question">
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </div>
          <div className="overlay-container_list">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Don't feel to answer?</h1>
                <p>Wanna see answered questions?</p>
                <button className="ghost" id="signIn" onClick={this.answered}>
                  View Answered
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Want more questions?</h1>
                <p>Check out all questions</p>
                <button className="ghost" id="signUp" onClick={this.unanswered}>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  const answered_questions = Object.values(questions).filter(
    valueName => (valueName.optionOne.votes).includes(authedUser) 
    || (valueName.optionTwo.votes).includes(authedUser))

  const unanswered_questions = Object.values(questions).filter(
    valueName => (!(valueName.optionOne.votes).includes(authedUser)) 
    && (!(valueName.optionTwo.votes).includes(authedUser)))
  return {
    unanswered_q: Object.values(unanswered_questions).map(
    item => item.id
    ),
    answered_q: Object.values(answered_questions).map(
    item => item.id
    )
  }
}

export default connect(mapStateToProps)(Dashboard)
