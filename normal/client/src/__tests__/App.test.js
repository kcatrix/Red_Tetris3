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

// Create a mock store
const createMockStore = (initialState = {}) => configureStore({
  reducer: {
    catalogPieces: reducers.catalogPiecesReducer,
    multi: reducers.multiReducer,
    piece: reducers.pieceReducer,
    positions: reducers.positionsReducer,
    score: reducers.scoreReducer,
    gameOver: reducers.gameOverReducer,
    malus: reducers.malusReducer,
    players: reducers.playersReducer,
    url: reducers.urlReducer,
    noName: reducers.noNameReducer,
    tempName: reducers.tempNameReducer,
    oldUrl: reducers.oldUrlReducer,
    back: reducers.backReducer,
    changeOk: reducers.changeOkReducer,
    checkUrl: reducers.checkUrlReducer,
    time: reducers.timeReducer,
    gameLaunched: reducers.gameLaunchedReducer,
    leader: reducers.leaderReducer,
    music: reducers.musicReducer,
    keyDown: reducers.keyDownReducer,
    startPiece: reducers.startPieceReducer,
    pieceIndex: reducers.pieceIndexReducer,
    lastMalus: reducers.lastMalusReducer,
    addMalusGo: reducers.addMalusGoReducer,
    retrySignal: reducers.retrySignalReducer,
    bestScore: reducers.bestScoreReducer,
    showHighScore: reducers.showHighScoreReducer,
    scoreList: reducers.scoreListReducer,
    playersOff: reducers.playersOffReducer,
    rows: reducers.rowsReducer,
    resultats: reducers.resultatsReducer
  },
  preloadedState: {
    catalogPieces: [],
    multi: false,
    piece: { type: 'I', rotation: 0 },
    positions: [],
    score: 0,
    gameOver: false,
    malus: 0,
    players: [],
    url: '',
    noName: false,
    tempName: '',
    oldUrl: '',
    back: false,
    changeOk: false,
    checkUrl: false,
    time: 1000,
    gameLaunched: false,
    leader: false,
    music: false,
    keyDown: '',
    startPiece: false,
    pieceIndex: 0,
    lastMalus: 0,
    addMalusGo: false,
    retrySignal: false,
    bestScore: 0,
    showHighScore: false,
    scoreList: [],
    playersOff: [],
    rows: Array(20).fill().map(() => Array(10).fill(0)),
    resultats: 'Game Over'
  }
});

let store;

beforeEach(() => {
  store = createMockStore();
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Verify that the app renders without crashing
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  test('displays initial game state', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Verify that the create room button is present when noName is false
    const createRoomButton = screen.getByTestId('create-room-button');
    expect(createRoomButton).toBeInTheDocument();
    expect(createRoomButton).toHaveTextContent('Create Room');

    // Verify that the create room container is present
    const createRoomContainer = screen.getByTestId('create-room-container');
    expect(createRoomContainer).toBeInTheDocument();
  });
});
