// Write your code here
import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    timer: 25,
    isTimerStarted: false,
    timeElapsedInSeconds: 0,
    timerId: null,
  }

  runTimer = () => {
    const {timeElapsedInSeconds, timer, timerId} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timer * 60
    if (isTimerCompleted) {
      clearInterval(timerId)
      this.setState({isTimerStarted: false, timerId: null})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  getFormattedTime = () => {
    const {timer, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timer * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = totalRemainingSeconds % 60

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${formattedMinutes}:${formattedSeconds}`
  }

  onDecreaseTimerLimit = () => {
    this.setState(prevState => ({
      timer: prevState.timer > 1 ? prevState.timer - 1 : 1,
    }))
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
    }))
  }

  onClickReset = () => {
    const {timerId} = this.state
    clearInterval(timerId)

    this.setState({
      timer: 25,
      isTimerStarted: false,
      timeElapsedInSeconds: 0,
      timerId: null,
    })
  }

  onToggleStartOrPause = () => {
    const {isTimerStarted, timer, timeElapsedInSeconds, timerId} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timer * 60
    if (isTimerCompleted) {
      this.setState({
        timeElapsedInSeconds: 0,
      })
    }
    if (isTimerStarted) {
      clearInterval(timerId)
      this.setState({isTimerStarted: false, timerId: null})
    } else {
      const newTimerId = setInterval(this.runTimer, 1000)
      this.setState({isTimerStarted: true, timerId: newTimerId})
    }
  }

  render() {
    const {timer, isTimerStarted} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="timer-and-settings-container">
          <div className="timer-container">
            <div className="time-displaying-container">
              <h1 className="timer-text">{this.getFormattedTime()}</h1>
              <p className="timer-description">
                {isTimerStarted ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="settings-container">
            <div className="pause-or-start-and-reset-container">
              <div className="play-pause-reset-container">
                <img
                  src={
                    isTimerStarted
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isTimerStarted ? 'pause icon' : 'play icon'}
                  className="play-pause-reset-icon"
                />
                <button
                  type="button"
                  className="play-pause-reset-text"
                  onClick={this.onToggleStartOrPause}
                >
                  {isTimerStarted ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="play-pause-reset-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-pause-reset-icon"
                />
                <button
                  type="button"
                  className="play-pause-reset-text"
                  onClick={this.onClickReset}
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="settings-timer-description">Set Timer limit</p>
            <div className="minutes-adjusting-container">
              <button
                type="button"
                className="plus-or-minus"
                onClick={this.onDecreaseTimerLimit}
                disabled={isTimerStarted}
              >
                -
              </button>
              <div className="minutes-displaying-container">
                <p className="plus-or-minus">{timer}</p>
              </div>
              <button
                type="button"
                className="plus-or-minus"
                onClick={this.onIncreaseTimerLimit}
                disabled={isTimerStarted}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
