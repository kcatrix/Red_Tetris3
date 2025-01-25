import { configureStore } from '@reduxjs/toolkit';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      multi: (state = false, action) => 
        action.type === 'multi/setMulti' ? action.payload : state,
      players: (state = [], action) => 
        action.type === 'players/setPlayers' ? action.payload : state,
      playersOff: (state = [], action) => 
        action.type === 'playersOff/setPlayersOff' ? action.payload : state,
      resultats: (state = [], action) => 
        action.type === 'resultats/setResultats' ? action.payload : state,
      leader: (state = false, action) => 
        action.type === 'leader/setLeader' ? action.payload : state,
      gameLaunched: (state = false, action) => 
        action.type === 'gameLaunched/setGameLaunched' ? action.payload : state,
      createRoom: (state = false, action) => 
        action.type === 'createRoom/setCreateRoom' ? action.payload : state,
      url: (state = '', action) => 
        action.type === 'url/setUrl' ? action.payload : state
    },
    preloadedState: initialState
  });
};

describe('Multigame Actions', () => {
  let store;

  beforeEach(() => {
    store = createMockStore({
      multi: false,
      players: [],
      playersOff: [],
      resultats: [],
      leader: false,
      gameLaunched: false,
      createRoom: false,
      url: ''
    });
  });

  test('sets multi mode', () => {
    store.dispatch({ type: 'multi/setMulti', payload: true });
    expect(store.getState().multi).toBe(true);
  });

  test('updates players list', () => {
    const players = ['Player1', 'Player2'];
    store.dispatch({ type: 'players/setPlayers', payload: players });
    expect(store.getState().players).toEqual(players);
  });

  test('updates offline players list', () => {
    const playersOff = ['Player3', 'Player4'];
    store.dispatch({ type: 'playersOff/setPlayersOff', payload: playersOff });
    expect(store.getState().playersOff).toEqual(playersOff);
  });

  test('updates game results', () => {
    const resultats = [
      { player: 'Player1', score: 1000 },
      { player: 'Player2', score: 800 }
    ];
    store.dispatch({ type: 'resultats/setResultats', payload: resultats });
    expect(store.getState().resultats).toEqual(resultats);
  });

  test('sets leader status', () => {
    store.dispatch({ type: 'leader/setLeader', payload: true });
    expect(store.getState().leader).toBe(true);
  });

  test('sets game launched status', () => {
    store.dispatch({ type: 'gameLaunched/setGameLaunched', payload: true });
    expect(store.getState().gameLaunched).toBe(true);
  });

  test('sets create room status', () => {
    store.dispatch({ type: 'createRoom/setCreateRoom', payload: true });
    expect(store.getState().createRoom).toBe(true);
  });

  test('sets game URL', () => {
    const url = 'test-room';
    store.dispatch({ type: 'url/setUrl', payload: url });
    expect(store.getState().url).toBe(url);
  });

  test('handles multiple state changes', () => {
    // Set multi mode and add players
    store.dispatch({ type: 'multi/setMulti', payload: true });
    store.dispatch({ type: 'players/setPlayers', payload: ['Player1', 'Player2'] });
    
    const state = store.getState();
    expect(state.multi).toBe(true);
    expect(state.players).toEqual(['Player1', 'Player2']);
  });

  test('resets game state', () => {
    // First set some state
    store.dispatch({ type: 'multi/setMulti', payload: true });
    store.dispatch({ type: 'players/setPlayers', payload: ['Player1', 'Player2'] });
    store.dispatch({ type: 'leader/setLeader', payload: true });
    
    // Reset state
    store.dispatch({ type: 'multi/setMulti', payload: false });
    store.dispatch({ type: 'players/setPlayers', payload: [] });
    store.dispatch({ type: 'leader/setLeader', payload: false });
    
    const state = store.getState();
    expect(state.multi).toBe(false);
    expect(state.players).toEqual([]);
    expect(state.leader).toBe(false);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as reducers from '../reducers';
import MultiGame from '../multigame';

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

describe('MultiGame Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        rows: reducers.rowsReducer,
        piece: reducers.pieceReducer,
        positions: reducers.positionsReducer,
        score: reducers.scoreReducer,
        malus: reducers.malusReducer,
        multi: reducers.multiReducer,
        players: reducers.playersReducer,
        url: reducers.urlReducer,
        gameOver: reducers.gameOverReducer,
      }
    });
  });

  test('renders multiplayer game board', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MultiGame />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const gameBoard = screen.getByTestId('multi-game-board');
    expect(gameBoard).toBeInTheDocument();
  });

  test('displays player scores', () => {
    const players = [
      { id: 'player1', score: 100 },
      { id: 'player2', score: 200 }
    ];

    store.dispatch({ type: 'players/setPlayers', payload: players });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MultiGame />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const player1Score = screen.getByText('Score: 100');
    const player2Score = screen.getByText('Score: 200');
    expect(player1Score).toBeInTheDocument();
    expect(player2Score).toBeInTheDocument();
  });

  test('shows game over message when game ends', () => {
    store.dispatch({ type: 'gameOver/setGameOver', payload: true });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MultiGame />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const gameOverMessage = screen.getByText(/game over/i);
    expect(gameOverMessage).toBeInTheDocument();
  });

  test('displays malus counter', () => {
    store.dispatch({ type: 'malus/setMalus', payload: 2 });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MultiGame />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const malusCounter = screen.getByText('Malus: 2');
    expect(malusCounter).toBeInTheDocument();
  });
});
