import React, { useState } from 'react';
import { render } from 'react-dom';
const { getRandomSymbol, calculatePayout } = require('./slot_logic');

const App = () => {
  const [topSlots, setTopSlots] = useState(['7', 'bar', 'cherries']);
  const [middleSlots, setMiddleSlots] = useState(['7', 'bar', 'cherries']);
  const [bottomSlots, setBottomSlots] = useState(['7', 'bar', 'cherries']);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(10);
  const [money, setMoney] = useState(1000);
  const [winnings, setWinnings] = useState(0); // New state to hold the winnings

  const spinSlots = () => {
    if (money < bet) {
      alert('Not enough money to place this bet!');
      return;
    }

    setSpinning(true);

    // Generate new symbols for each row
    const newTopSlots = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ];
    const newMiddleSlots = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ];
    const newBottomSlots = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ];

    // Display new symbols after a delay to simulate spinning
    setTimeout(() => {
      setTopSlots(newTopSlots);
      setMiddleSlots(newMiddleSlots);
      setBottomSlots(newBottomSlots);

      // Calculate payout
      const payout = calculatePayout(
        newTopSlots,
        newMiddleSlots,
        newBottomSlots,
        bet
      );

      // Update money and winnings using functional updates
      setMoney((prevMoney) => prevMoney - bet + payout); // Deduct the bet first, then add the payout
      setWinnings(payout);

      setSpinning(false);
    }, 1000); // Total spinning duration
  };

  const increaseBet = () => {
    setBet((prevBet) => prevBet + 10);
  };

  const decreaseBet = () => {
    setBet((prevBet) => Math.max(prevBet - 10, 10)); // Ensure bet is at least 10
  };

  const closeApp = () => {
    window.close();
  };

  return (
    <div className="app">
      <div className="slot-machine">
        <h1>Simple Slot Machine</h1>
        <div className="slots-wrapper">
          <div className="slots top">
            {topSlots.map((slot, index) => (
              <div
                key={`top-${index}`}
                className={`slot ${spinning ? 'spinning' : ''}`}
              >
                <img src={`./images/${slot}.png`} alt={slot} />
              </div>
            ))}
          </div>
          <div className="slots">
            {middleSlots.map((slot, index) => (
              <div
                key={`main-${index}`}
                className={`slot ${spinning ? 'spinning' : ''}`}
              >
                <img src={`./images/${slot}.png`} alt={slot} />
              </div>
            ))}
          </div>
          <div className="slots bottom">
            {bottomSlots.map((slot, index) => (
              <div
                key={`bottom-${index}`}
                className={`slot ${spinning ? 'spinning' : ''}`}
              >
                <img src={`./images/${slot}.png`} alt={slot} />
              </div>
            ))}
          </div>
        </div>
        <div className="money-display">Money: ${money}</div>
        <div className="winnings-display">Winnings: ${winnings}</div>{' '}
        {/* Display winnings */}
        <div className="controls">
          <div className="bet-controls">
            <button className="btn" onClick={decreaseBet}>
              -
            </button>
            <span className="bet-amount">Bet: ${bet}</span>
            <button className="btn" onClick={increaseBet}>
              +
            </button>
            <button
              className="btn btn-spin"
              onClick={spinSlots}
              disabled={spinning}
            >
              {spinning ? 'Spinning...' : 'Spin'}
            </button>
          </div>
        </div>
      </div>
      <button className="btn btn-close" onClick={closeApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
