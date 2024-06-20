import { useState } from 'react';
import './App.css'
import Box from './components/Box';

const history:number[] = []
const future:number[] = []

function App() {
  const [boardSize, setBoardSize] = useState(8);
  const initialBoardState = new Array<number>(boardSize * boardSize).fill(0);

  const [board, setBoard] = useState<number[]>(initialBoardState);

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBoardSize = parseInt(e.target.value);
    setBoardSize(newBoardSize);
    console.log(board);
    const newInitState = new Array<number>(newBoardSize * newBoardSize).fill(0);
    setBoard(newInitState);
    history.splice(0);
    future.splice(0);
  };

  const handleClick = (index: number) => {
    const newBoard = [...board];
    newBoard[index] = newBoard[index] === 0 ? 1 : 0;
    history.push(index);
    setBoard(newBoard);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const index = history.length - 1;
    const prevBoard = [...board];
    future.push(history[index]);
    prevBoard[history[index]] = prevBoard[history[index]] ? 0 : 1;
    history.pop();
    setBoard(prevBoard);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const index = future.length - 1;
    const prevBoard = [...board];
    prevBoard[future[index]] = prevBoard[future[index]] ? 0 : 1;
    const historyIndex = future.pop();
    if (historyIndex) history.push(historyIndex);
    setBoard(prevBoard);
  };

  const handleReset = () => {
    setBoard(initialBoardState);
    history.splice(0);
    future.splice(0);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* Controls */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            gap: "0.75rem",
          }}
        >
          <label htmlFor="boardSize">Select Board Size</label>
          <input
            type="number"
            min={8}
            max={26}
            value={boardSize}
            onChange={handleBoardSizeChange}
            name="boardSize"
            id="boardSize"
            style={{
              padding: "0.5rem 1rem",
              gap: "0.75rem",
            }}
          />
        </div>
        <div
          style={{
            width: "500px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{ padding: "8px 10px" }}
            disabled={history.length === 0}
            onClick={handleUndo}
          >
            Undo
          </button>
          <button
            style={{ padding: "8px 10px" }}
            disabled={future.length === 0}
            onClick={handleRedo}
          >
            Redo
          </button>
          <button onClick={handleReset} style={{ padding: "8px 10px" }}>
            Reset
          </button>
        </div>
      </div>
      {/* Controls - end */}

      <div
        style={{
          backgroundColor: "gray",
          padding: "10px",
        }}
      >
        <div
          className="chessboard"
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            textAlign: "center",
            gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
            gap: "1rem",
          }}
        >
          {board.map((item: number, index: number) => (
            <Box
              box={item}
              key={index}
              handleChange={handleClick}
              index={index}
              isEvenRow={Math.floor(index / boardSize) % 2 === 0}
              isEvenCol={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App

