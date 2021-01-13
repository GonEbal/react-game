import React, { Component } from "react"
import { connect } from "react-redux"
import Question from "./Question"

class Dashboard extends Component {
  state = {
    show_answered: false,
  }

  constructor(props) {
    super(props);
    this.box1 = React.createRef();
    this.box2 = React.createRef();
  }

  unanswered = () => {
    this.box1.current.classList.remove("shadow")
    this.box2.current.classList.add("shadow")
    const action = { show_answered: false }
    this.change(action)
  }
  answered = () => {
    this.box1.current.classList.add("shadow")
    this.box2.current.classList.remove("shadow")
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
          <button ref={this.box2} className="box shadow" onClick={this.unanswered}>
            Unanswered Questions
          </button>
          <button ref={this.box1} className="box" onClick={this.answered}>
            Answered Questions
          </button>
        </div>
        <div style={{ display: this.state.show_answered ? "block" : "none" }}>
          {this.props.answered_q.map((id) => (
            <li key={id} className="question">
              <Question id={id} answered={true}/>
            </li>
          ))}
        </div>
        <div style={{ display: !this.state.show_answered ? "block" : "none" }}>
          {this.props.unanswered_q.map((id) => (
            <li key={id} className="question">
              <Question id={id} answered={false} />
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
