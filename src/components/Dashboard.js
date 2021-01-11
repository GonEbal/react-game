import React, { Component } from "react"
import { connect } from "react-redux"
import Question from "./Question"

class Dashboard extends Component {
  state = {
    show_answered: false,
  }

  unanswered = () => {
    const box2 = document.getElementById("box2")
    const box1 = document.getElementById("box1")
    box1.classList.remove("shadow")
    box2.classList.add("shadow")
    const action = { show_answered: false }
    this.change(action)
  }
  answered = () => {
    const box1 = document.getElementById("box1")
    const box2 = document.getElementById("box2")
    box1.classList.add("shadow")
    box2.classList.remove("shadow")
    const action = { show_answered: true }
    this.change(action)
  }

  change = (action) => {
    if (this.state.show_answered !== action.show_answered) {
      this.setState({ show_answered: !this.state.show_answered })
    }
  }
  render() {
    return (
      <div className="container_body">
        <div className="button_container">
          <button id="box2" className="box shadow" onClick={this.unanswered}>
            Unanswered Questions
          </button>
          <button id="box1" className="box" onClick={this.answered}>
            Answered Questions
          </button>
        </div>
        <div style={{ display: this.state.show_answered ? "block" : "none" }}>
          {this.props.answered_q.map((id) => (
            <li key={id} className="question">
              <Question id={id} />
            </li>
          ))}
        </div>
        <div style={{ display: !this.state.show_answered ? "block" : "none" }}>
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
  const sorted_bytime_qs = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )

  const unanswered_q = sorted_bytime_qs.filter(
    (valueName) =>
      !questions[valueName].optionOne.votes.includes(authedUser) &&
      !questions[valueName].optionTwo.votes.includes(authedUser)
  )

  const answered_q = sorted_bytime_qs.filter(
    (valueName) =>
      questions[valueName].optionOne.votes.includes(authedUser) ||
      questions[valueName].optionTwo.votes.includes(authedUser)
  )
  return {
    unanswered_q,
    answered_q,
  }
}

export default connect(mapStateToProps)(Dashboard)
