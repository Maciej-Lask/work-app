import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    };
  }

  startTimer = () => {
    const initialTime = 1200; // 20 minutes in seconds
    this.setState({
      status: 'work',
      time: initialTime,
      timer: setInterval(this.tick, 1000),
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({ status: 'off', time: 0, timer: null });
  };
  closeApp = () => {
    window.close();
  };
  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  tick = () => {
    this.setState((prevState) => {
      if (prevState.time <= 0) {
        this.playBell();
        const newStatus = prevState.status === 'work' ? 'rest' : 'work';
        const newTime = newStatus === 'work' ? 1200 : 20;
        clearInterval(prevState.timer);
        return {
          status: newStatus,
          time: newTime,
          timer: setInterval(this.tick, 1000),
        };
      } else {
        return { time: prevState.time - 1 };
      }
    });
  };

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  render() {
    const { status, time } = this.state; // Destructuring the state
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {status === 'work' && <img src="./images/work.png" />}
        {status === 'rest' && <img src="./images/rest.png" />}
        {status !== 'off' && (
          <div className="timer">
            {Math.floor(time / 60)
              .toString()
              .padStart(2, '0')}
            :{(time % 60).toString().padStart(2, '0')}
          </div>
        )}
        {status === 'off' && (
          <button className="btn" onClick={this.startTimer}>
            Start
          </button>
        )}
        {status !== 'off' && (
          <button className="btn" onClick={this.stopTimer}>
            Stop
          </button>
        )}
        <button className="btn btn-close" onClick={this.closeApp}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
