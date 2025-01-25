import { configureStore } from '@reduxjs/toolkit';
import * as reducers from '../reducers';

describe('Redux Store Configuration', () => {
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

  test('initial state is set correctly', () => {
    const state = store.getState();
    expect(state.rows).toBeDefined();
    expect(state.piece).toBeDefined();
    expect(state.positions).toBeDefined();
    expect(state.score).toBeDefined();
    expect(state.malus).toBeDefined();
    expect(state.multi).toBeDefined();
    expect(state.players).toBeDefined();
    expect(state.url).toBeDefined();
    expect(state.gameOver).toBeDefined();
  });

  test('reducers handle actions correctly', () => {
    // Test score reducer
    store.dispatch({ type: 'score/setScore', payload: 100 });
    expect(store.getState().score).toBe(100);

    // Test gameOver reducer
    store.dispatch({ type: 'gameOver/setGameOver', payload: true });
    expect(store.getState().gameOver).toBe(true);

    // Test malus reducer
    store.dispatch({ type: 'malus/setMalus', payload: 2 });
    expect(store.getState().malus).toBe(2);

    // Test multi reducer
    store.dispatch({ type: 'multi/setMulti', payload: true });
    expect(store.getState().multi).toBe(true);

    // Test url reducer
    store.dispatch({ type: 'url/setUrl', payload: 'test-room' });
    expect(store.getState().url).toBe('test-room');
  });
});
