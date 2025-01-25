import { store } from '../store';

describe('Redux Store Configuration', () => {
  beforeEach(() => {
    // Reset store to initial state
    store.dispatch({ type: 'rows/resetRows' });
    store.dispatch({ type: 'piece/resetPiece' });
    store.dispatch({ type: 'positions/resetPositions', payload: 0 });
    store.dispatch({ type: 'score/modifyScore', payload: 0 });
    store.dispatch({ type: 'gameOver/gameOverOff' });
  });

  test('initial state is set correctly', () => {
    const state = store.getState();
    expect(state).toEqual({
      rows: Array(20).fill().map(() => Array(10).fill(0)),
      piece: { type: 'I', rotation: 0 },
      positions: [{ x: 4, y: 0 }],
      score: 0,
      gameOver: false,
      malus: 0,
      multi: false,
      players: [],
      url: '',
      noName: true,
      tempName: '',
      oldUrl: '',
      back: false,
      changeOk: false,
      checkUrl: '',
      time: 1000,
      gameLaunched: false,
      leader: false,
      music: false,
      keyDown: 'null',
      startPiece: true,
      pieceIndex: 0,
      lastMalus: 0,
      addMalusGo: 0,
      retrySignal: false,
      bestScore: 0,
      showHighScore: false,
      scoreList: [],
      playersOff: [],
      catalogPieces: [],
      resultats: 'Game Over',
      createRoom: false
    });
  });

  test('reducers handle actions correctly', () => {
    // Test rows reducer
    const newRows = Array(20).fill().map(() => Array(10).fill(1));
    store.dispatch({ type: 'rows/modifyRows', payload: newRows });
    expect(store.getState().rows).toEqual(newRows);

    // Test piece reducer
    const initialPiece = { type: 'I', rotation: 0 };
    expect(store.getState().piece).toEqual(initialPiece);

    const newPiece = { type: 'I', rotation: 1 };
    store.dispatch({ type: 'piece/fillPiece', payload: newPiece });
    expect(store.getState().piece).toEqual(newPiece);

    // Test positions reducer
    const initialPositions = [{ x: 4, y: 0 }];
    expect(store.getState().positions).toEqual(initialPositions);
    
    store.dispatch({ type: 'positions/modifyPositions', payload: { newPosition: { x: 1, y: 2 }, pieceIndex: 0 } });
    expect(store.getState().positions[0]).toEqual({ x: 1, y: 2 });

    // Test score reducer
    store.dispatch({ type: 'score/modifyScore', payload: 100 });
    expect(store.getState().score).toBe(100);

    // Test gameOver reducer
    store.dispatch({ type: 'gameOver/gameOverOn' });
    expect(store.getState().gameOver).toBe(true);
  });
});
