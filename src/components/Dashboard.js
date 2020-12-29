import React, { Component } from "react"
import { connect } from "react-redux"
import Question from "./Question"

class Dashboard extends Component {
  state ={
    show_answered: true,
  }

  unanswered = () => {
    const box2 = document.getElementById("box2")
    const box1 = document.getElementById("box1")
    box1.classList.remove("shadow")
    box2.classList.add("shadow")
  }
  answered = () => {
    const box1 = document.getElementById("box1")
    const box2 = document.getElementById("box2")
    box1.classList.add("shadow")
    box2.classList.remove("shadow")
  }

  change = () => {
    this.setState({ show_answered: !this.state.show_answered })
  }

  render() {
    return (
      <div className="container_body">
        <div className='button_container'>
          <div
            id='box1' 
            className='box shadow'
            onClick={this.answered}
            >
            Answered Questions
          </div>
          <div 
            id='box2'
            className='box'
            onClick={this.unanswered}
            >
            Unanswered Questions
          </div>
        </div>
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
