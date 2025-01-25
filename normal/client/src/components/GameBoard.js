import React from 'react';
import { useSelector } from 'react-redux';

const GameBoard = () => {
  const rows = useSelector(state => state.rows);
  const positions = useSelector(state => state.positions);
  const score = useSelector(state => state.score);
  const gameOver = useSelector(state => state.gameOver);

  return (
    <div className="game-board" data-testid="game-board">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row" role="row">
          {row.map((cell, cellIndex) => {
            const isPiecePart = positions && positions.some(
              pos => pos.y === rowIndex && pos.x === cellIndex
            );
            return (
              <div
                key={cellIndex}
                className={`cell ${cell ? 'filled' : ''} ${isPiecePart ? 'current-piece' : ''}`}
                data-testid="cell"
              />
            );
          })}
        </div>
      ))}
      <div className="game-info" data-testid="game-info">
        <p data-testid="score">Score: {score}</p>
        {gameOver && <p data-testid="game-over">Game Over!</p>}
      </div>
    </div>
  );
};

export default GameBoard;