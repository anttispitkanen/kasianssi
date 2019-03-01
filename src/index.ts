type TDeck = number[];

/**
 * Shuffle array in place with Fisher-Yates
 * shuffle algorithm
 * https://stackoverflow.com/a/6274381
 */
const shuffle = (a: TDeck): TDeck => {
  let j: number, x: number, i: number;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

/**
 * Takes empty array and populates it with cards in order
 */
const createDeck = (): TDeck => {
  const arr: TDeck = [];
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < 4; j++) {
      arr.push(i);
    }
  }
  return arr;
};

interface IResults {
  completed: boolean;
  cardsRemaining: number;
}

const play = (): IResults => {
  const deck: TDeck = shuffle(createDeck());
  // the container of max length 8
  const table: number[] = [];

  let completed: boolean = false;

  while (true) {
    // take the first card of the deck, mutates deck
    const card: number = deck.shift();

    // put on the table
    table.push(card);

    // sort table for easier pair finding
    table.sort((a, b) => (a > b ? 1 : -1));

    // check if there's a pair
    let i: number = 0;
    let pairFound: boolean = false;

    while (i < table.length - 1) {
      if (table[i] === table[i + 1]) {
        pairFound = true;
        break;
      }
      i++;
    }

    // if there is, remove the pair
    if (pairFound) {
      table.splice(i, 2);
    }

    // if there are 8 cards left on the table and some in deck, we lost
    if (table.length >= 8 && deck.length > 0) {
      break;
    }

    // if we got here and deck is empty, victory!
    if (deck.length === 0) {
      completed = true;
      break;
    }
  }

  return {
    completed,
    cardsRemaining: deck.length,
  } as IResults;
};

const doStatisticResearchThisIsImportant = (howManyTimes: number) => {
  const results = {
    gamesPlayed: 0,
    won: 0,
    lost: 0,
  };

  for (let i = 0; i < howManyTimes; i++) {
    const gameResults: IResults = play();
    if (gameResults.completed) {
      results.won++;
    } else {
      results.lost++;
    }
    results.gamesPlayed++;
  }

  console.log(results);
  console.log(`Win percentage: ${(results.won / results.gamesPlayed) * 100}`);
  return results;
};

doStatisticResearchThisIsImportant(1000000);
