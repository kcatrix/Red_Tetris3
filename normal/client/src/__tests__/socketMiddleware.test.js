import socketMiddleware from '../middleware/socketMiddleware';
import { configureStore } from '@reduxjs/toolkit';
import * as reducers from '../reducers';

// Mock socket.io-client
jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const connect = jest.fn();
  
  return jest.fn(() => ({
    emit,
    on,
    connect,
    connected: true,
    id: 'test-socket-id'
  }));
});

describe('Socket Middleware', () => {
  let store;
  let next;
  let invoke;
  
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
    
    next = jest.fn();
    const middleware = socketMiddleware(store);
    invoke = action => middleware(next)(action);
  });

  test('handles socket connection', () => {
    invoke({ type: 'socket/connect' });
    expect(next).toHaveBeenCalledWith({ type: 'socket/connect' });
  });

  test('handles piece movement', () => {
    invoke({ 
      type: 'piece/movePiece',
      payload: { x: 1, y: 0 }
    });
    expect(next).toHaveBeenCalled();
  });

  test('handles new game start', () => {
    invoke({ type: 'game/start' });
    expect(next).toHaveBeenCalled();
  });

  test('handles player joining', () => {
    invoke({ 
      type: 'players/addPlayer',
      payload: { id: 'player1', name: 'Test Player' }
    });
    expect(next).toHaveBeenCalled();
  });

  test('handles score update', () => {
    invoke({ 
      type: 'score/update',
      payload: 100
    });
    expect(next).toHaveBeenCalled();
  });

  test('handles malus received', () => {
    invoke({ 
      type: 'malus/received',
      payload: 2
    });
    expect(next).toHaveBeenCalled();
  });

  test('handles game over', () => {
    invoke({ 
      type: 'game/over',
      payload: true
    });
    expect(next).toHaveBeenCalled();
  });

  test('handles URL update', () => {
    invoke({ 
      type: 'url/update',
      payload: 'test-room'
    });
    expect(next).toHaveBeenCalled();
  });

  test('handles multi mode toggle', () => {
    invoke({ 
      type: 'multi/toggle',
      payload: true
    });
    expect(next).toHaveBeenCalled();
  });

  test('handles player disconnection', () => {
    invoke({ 
      type: 'players/removePlayer',
      payload: 'player1'
    });
    expect(next).toHaveBeenCalled();
  });
});
