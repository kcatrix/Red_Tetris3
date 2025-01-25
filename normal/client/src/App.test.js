import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './reducers';
import App from './App';

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
    resultats: reducers.resultatsReducer,
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
    rows: reducers.rowsReducer
  },
  preloadedState: {
    ...initialState,
    tempName: '',
    oldUrl: '',
    back: false,
    changeOk: false,
    noName: true,
    url: '',
    checkUrl: false,
    resultats: []
  }
});

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    const mockStore = createMockStore();
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  test('renders name input when noName is true', () => {
    const mockStore = createMockStore({
      noName: true
    });
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
  });

  test('validates name input correctly', () => {
    const mockStore = createMockStore({
      noName: true,
      tempName: ''
    });
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
  });
});
