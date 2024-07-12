import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    const initialTime = 1200; // 20 minutes in seconds
    setStatus('work');
    setTime(initialTime);
    timerRef.current = setInterval(tick, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setStatus('off');
    setTime(0);
    timerRef.current = null;
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  const tick = () => {
    setTime((prevTime) => {
      if (prevTime <= 0) {
        playBell();
        const newStatus = status === 'work' ? 'rest' : 'work';
        const newTime = newStatus === 'work' ? 1200 : 20;
        clearInterval(timerRef.current);
        timerRef.current = setInterval(tick, 1000);
        setStatus(newStatus);
        return newTime;
      } else {
        return prevTime - 1;
      }
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === 'work' && <img src="./images/work.png" alt="Work" />}
      {status === 'rest' && <img src="./images/rest.png" alt="Rest" />}
      {status !== 'off' && (
        <div className="timer">
          {Math.floor(time / 60)
            .toString()
            .padStart(2, '0')}
          :{(time % 60).toString().padStart(2, '0')}
        </div>
      )}
      {status === 'off' && (
        <button className="btn" onClick={startTimer}>
          Start
        </button>
      )}
      {status !== 'off' && (
        <button className="btn" onClick={stopTimer}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={closeApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
