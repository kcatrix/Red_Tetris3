import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import * as reducers from '../reducers';
import App from '../App';

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

describe('App Component', () => {
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
        piece: { type: 'T', rotation: 0 },
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

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Vérifie que le titre est présent
    const titleElement = screen.getByText(/Red Tetris/i);
    expect(titleElement).toBeInTheDocument();

    // Vérifie que le bouton Create Room est présent
    const createRoomButton = screen.getByText(/Create Room/i);
    expect(createRoomButton).toBeInTheDocument();
  });

  test('displays initial game state', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Vérifie que le score initial est 0
    const scoreElement = screen.getByText(/Score: 0/i);
    expect(scoreElement).toBeInTheDocument();
  });
});
