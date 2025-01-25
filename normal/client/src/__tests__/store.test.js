import { configureStore } from '@reduxjs/toolkit';
import * as reducers from '../reducers';

describe('Redux Store', () => {
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
        positions: [],
        score: 0,
        gameOver: false,
        malus: 0,
        multi: false,
        players: [],
        url: ''
      }
    });
  });

  test('store can dispatch actions', () => {
    // Test dispatching an action to modify score
    store.dispatch({ type: 'score/setScore', payload: 100 });
    expect(store.getState().score).toBe(100);

    // Test dispatching an action to modify gameOver
    store.dispatch({ type: 'gameOver/setGameOver', payload: true });
    expect(store.getState().gameOver).toBe(true);

    // Test dispatching an action to modify malus
    store.dispatch({ type: 'malus/setMalus', payload: 2 });
    expect(store.getState().malus).toBe(2);

    // Test dispatching an action to modify multi
    store.dispatch({ type: 'multi/setMulti', payload: true });
    expect(store.getState().multi).toBe(true);

    // Test dispatching an action to modify players
    const players = [{ id: 1, name: 'Player 1' }];
    store.dispatch({ type: 'players/setPlayers', payload: players });
    expect(store.getState().players).toEqual(players);

    // Test dispatching an action to modify url
    store.dispatch({ type: 'url/setUrl', payload: '/test' });
    expect(store.getState().url).toBe('/test');
  });

  test('store has correct initial state', () => {
    const state = store.getState();
    expect(state).toEqual({
      rows: Array(20).fill().map(() => Array(10).fill(0)),
      piece: { type: 'I', rotation: 0 },
      positions: [],
      score: 0,
      gameOver: false,
      malus: 0,
      multi: false,
      players: [],
      url: ''
    });
  });
});
