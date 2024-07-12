// Define symbols and their probabilities and payouts
const symbols = [
  { symbol: '7', weight: 7, payout: 100 }, // 3 7's = 100 bets
  { symbol: 'bar', weight: 30, payout: 8 }, // 3 bars = 8 bets
  { symbol: 'triple-bar', weight: 15, payout: 30 }, // 3 triple bars = 30 bets
  { symbol: 'orange', weight: 12, payout: 10 }, // 3 oranges = 10 bets
  { symbol: 'berry', weight: 12, payout: 10 }, // 3 berries = 10 bets
  { symbol: 'lemon', weight: 12, payout: 10 }, // 3 lemons = 10 bets
  { symbol: 'cherries', weight: 10, payout: [2, 5, 12] }, // Cherries payout based on count
  { symbol: 'wild', weight: 10, payout: 250 }, // Wild symbol, no payout itself
  { symbol: 'jack-pot', weight: 2, payout: 1500 }, // 500 bets
];

// Helper function to get a symbol based on weighted probability
const getRandomSymbol = () => {
  const totalWeight = symbols.reduce((sum, { weight }) => sum + weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const { symbol, weight } of symbols) {
    cumulativeWeight += weight;
    if (random < cumulativeWeight) {
      return symbol;
    }
  }
};

// Helper function to calculate payout based on symbols
const calculatePayout = (top, middle, bottom, bet) => {
  let totalPayout = 0;

  // Function to determine payout for a specific symbol set
  const getSymbolPayout = (symbol, bet) => {
    const symbolData = symbols.find((s) => s.symbol === symbol);
    return symbolData ? symbolData.payout * bet : 0;
  };

  // Function to determine payout for cherries
  const getCherriesPayout = (count, bet) => {
    if (count === 1) {
      return 2 * bet;
    } else if (count === 2) {
      return 5 * bet;
    } else if (count === 3) {
      return 12 * bet;
    }
    return 0;
  };

  // Check each line for matching symbols with wildcards
  const checkLine = (line) => {
    const [a, b, c] = line;

    // Count how many wild symbols are present
    const wildCount = [a, b, c].filter((symbol) => symbol === 'wild').length;
    // Handle cherry payouts
    const cherryCount = [a, b, c].filter(
      (symbol) => symbol === 'cherries'
    ).length;
    // Determine actual symbols excluding wilds
    const nonWilds = [a, b, c].filter((symbol) => symbol !== 'wild');

    if (wildCount === 3) {
      return getSymbolPayout('wild', bet);
    } else if (wildCount === 2 && nonWilds[0] !== 'cherries') {
      // Two wilds - replace with the remaining non-wild symbol

      const remainingSymbol = nonWilds[0];

      return getSymbolPayout(remainingSymbol, bet);
    } else if (wildCount === 1) {
      // One wild - replace wild with each non-wild symbol
      if (nonWilds.length === 1) {
        const symbol = nonWilds[0];
        return getSymbolPayout(symbol, bet);
      } else if (
        nonWilds.length === 2 &&
        nonWilds[0] === nonWilds[1] &&
        nonWilds[0] !== 'cherries' &&
        nonWilds[1] !== 'cherries'
      ) {
        const symbol = nonWilds[0];
        return getSymbolPayout(symbol, bet);
      }
    } else if (cherryCount !== 3) {
      if (a === b && b === c) {
        return getSymbolPayout(a, bet);
      }
    }

    let effectiveCherryCount = 0;
    if (cherryCount === 0) {
      effectiveCherryCount = 0;
      console.log(effectiveCherryCount);
    } else {
      effectiveCherryCount = cherryCount + wildCount;
      console.log(effectiveCherryCount);
    }

    if (effectiveCherryCount > 0) {
      return getCherriesPayout(effectiveCherryCount, bet);
    }

    return 0;
  };

  // Check each row (line) for a payout
  console.log('top');
  totalPayout += checkLine(top);
  console.log('middle');
  totalPayout += checkLine(middle);
  console.log('bottom');
  totalPayout += checkLine(bottom);

  return totalPayout;
};

module.exports = { symbols, getRandomSymbol, calculatePayout };
