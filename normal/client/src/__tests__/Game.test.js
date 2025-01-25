import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import * as reducers from '../reducers';
import Game from '../components/Game';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null
  })
}));

describe('Game Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        rows: reducers.rowsReducer,
        piece: reducers.pieceReducer,
        positions: reducers.positionsReducer,
        score: reducers.scoreReducer,
        gameOver: reducers.gameOverReducer,
        malus: reducers.malusReducer,
        multi: reducers.multiReducer,
        players: reducers.playersReducer,
        url: reducers.urlReducer
      },
      preloadedState: {
        rows: Array(20).fill().map(() => Array(10).fill(0)),
        piece: { type: 'I', rotation: 0 },
        positions: [{ x: 4, y: 0 }],
        score: 0,
        gameOver: false,
        malus: 0,
        multi: false,
        players: [],
        url: ''
      }
    });
  });

  test('renders game board', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Game />
        </BrowserRouter>
      </Provider>
    );

    const board = screen.getByTestId('game-board');
    expect(board).toBeInTheDocument();
  });

  test('displays score', () => {
    store = configureStore({
      reducer: {
        rows: reducers.rowsReducer,
        piece: reducers.pieceReducer,
        positions: reducers.positionsReducer,
        score: reducers.scoreReducer,
        gameOver: reducers.gameOverReducer,
        malus: reducers.malusReducer,
        multi: reducers.multiReducer,
        players: reducers.playersReducer,
        url: reducers.urlReducer
      },
      preloadedState: {
        rows: Array(20).fill().map(() => Array(10).fill(0)),
        piece: { type: 'I', rotation: 0 },
        positions: [{ x: 4, y: 0 }],
        score: 100,
        gameOver: false,
        malus: 0,
        multi: false,
        players: [],
        url: ''
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Game />
        </BrowserRouter>
      </Provider>
    );

    const scoreDisplay = screen.getByTestId('score');
    expect(scoreDisplay).toBeInTheDocument();
    expect(scoreDisplay).toHaveTextContent('Score: 100');
  });

  test('shows game over message', () => {
    store = configureStore({
      reducer: {
        rows: reducers.rowsReducer,
        piece: reducers.pieceReducer,
        positions: reducers.positionsReducer,
        score: reducers.scoreReducer,
        gameOver: reducers.gameOverReducer,
        malus: reducers.malusReducer,
        multi: reducers.multiReducer,
        players: reducers.playersReducer,
        url: reducers.urlReducer
      },
      preloadedState: {
        rows: Array(20).fill().map(() => Array(10).fill(0)),
        piece: { type: 'I', rotation: 0 },
        positions: [{ x: 4, y: 0 }],
        score: 0,
        gameOver: true,
        malus: 0,
        multi: false,
        players: [],
        url: ''
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Game />
        </BrowserRouter>
      </Provider>
    );

    const gameOverMessage = screen.getByTestId('game-over');
    expect(gameOverMessage).toBeInTheDocument();
    expect(gameOverMessage).toHaveTextContent('Game Over!');
  });

  test('displays current piece', () => {
    const currentPiece = { type: 'T', rotation: 0 };
    store.dispatch({ type: 'piece/setPiece', payload: currentPiece });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Game />
        </BrowserRouter>
      </Provider>
    );

    const board = screen.getByTestId('game-board');
    const cells = screen.getAllByTestId('cell');
    
    expect(board).toBeInTheDocument();
    expect(cells.some(cell => cell.classList.contains('current-piece'))).toBe(true);
  });
});
