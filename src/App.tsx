import { useMemo, useState } from 'react'
import './App.css'

import TicTacToeBox from './components/TicTacToeBox/TicTacToeBox';

const horizontalCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const verticalCombos = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const diagonalCombos = [
  [0, 4, 8],
  [2, 4, 6],
];

const winningCombos = [
  ...horizontalCombos,
  ...verticalCombos,
  ...diagonalCombos,
];

const getNewBoxes = () => Array(9).fill('');

function App() {
  const [ boxes, setBoxes ] = useState(getNewBoxes());
  const [ turn, setTurn ] = useState('x');

  const resetBoard = () => {
    setBoxes(getNewBoxes());
    setTurn('x');
  }
  
  const winner: string | undefined = useMemo(() => (
    ['x', 'o'].find((symbol) => (
      winningCombos.find(winningIndices => (
        winningIndices.every(index => boxes[index] === symbol)
      ))
    ))), [boxes],
  );

  const allSpacesTaken: boolean = useMemo(() => (
    boxes.every(box => box !== '')
  ), [boxes]);
  
  const handleClick = (index: number, turn: string) => {
    if (boxes[index] !== '' || winner) return;

    const newBoxes = [...boxes];
    newBoxes[index] = turn;

    // update "boxes"
    setBoxes(newBoxes);

    // if no winner, change turn
    setTurn(turn == 'x' ? 'o' : 'x')
  };

  return (
    <>
      {winner
        ? <p className="winner">Winner is: {winner}</p>
        : allSpacesTaken
          ? <p>No winner! Reset now.</p>
          : <p>Current turn: {turn}</p>
      }

      <div className={`container${winner ? ' disabled' : ''}`}>
        {
          boxes.map((boxValue, i) => (
            <TicTacToeBox
              key={i}
              symbol={boxValue}
              clickHandler={() => handleClick(i, turn)}
            />
          ))
        }
      </div>

      <button onClick={resetBoard}>Reset</button>
    </>
  )
}

export default App;
