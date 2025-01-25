import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as reducers from './reducers';

// Create a mock store
const createMockStore = (initialState = {}) => configureStore({
  reducer: {
    catalogPieces: reducers.catalogPiecesReducer,
    multi: reducers.multiReducer,
    url: reducers.urlReducer,
    back: reducers.backReducer,
    piece: reducers.pieceReducer,
    positions: reducers.positionsReducer,
    rows: reducers.rowsReducer,
    score: reducers.scoreReducer,
    time: reducers.timeReducer,
    gameOver: reducers.gameOverReducer,
    malus: reducers.malusReducer,
    players: reducers.playersReducer,
    playersOff: reducers.playersOffReducer,
    resultats: reducers.resultatsReducer,
    leader: reducers.leaderReducer,
    gameLaunched: reducers.gameLaunchedReducer,
    music: reducers.musicReducer,
    noName: reducers.noNameReducer,
    tempName: reducers.tempNameReducer,
    createRoom: reducers.createRoomReducer,
    changeOk: reducers.changeOkReducer,
    retrySignal: reducers.retrySignalReducer,
    startPiece: reducers.startPieceReducer,
    pieceIndex: reducers.pieceIndexReducer,
    lastMalus: reducers.lastMalusReducer,
    oldUrl: reducers.oldUrlReducer,
    checkUrl: reducers.checkUrlReducer,
    addMalusGo: reducers.addMalusGoReducer,
    keyDown: reducers.keyDownReducer,
    showHighScore: reducers.showHighScoreReducer,
    bestScore: reducers.bestScoreReducer,
    scoreList: reducers.scoreListReducer
  },
  preloadedState: {
    noName: true,
    tempName: '',
    ...initialState
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

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer).toBeInTheDocument();
  });

  test('renders name input when noName is true', () => {
    const mockStore = createMockStore();
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText('Add your name');
    expect(nameInput).toBeInTheDocument();
  });

  test('handles name validation', () => {
    const mockStore = createMockStore();
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText('Add your name');
    fireEvent.change(nameInput, { target: { value: 'TestPlayer' } });
    expect(nameInput.value).toBe('TestPlayer');

    const validateButton = screen.getByText('Validate');
    fireEvent.click(validateButton);
  });
});
