import React, { useEffect, useState } from 'react';
import './App.css';
import MultiGame from './multigame';
import * as changeButtonFunctions from './components/changeButton';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HighScoreBoard } from './components/HighScoreBoard';
import { selectRandomPiece } from "./reducers/pieceSlice";
import { selectCatalogPieces } from './reducers/catalogPiecesSlice';
import { multiOff, selectMulti } from './reducers/multiSlice';
import { selectUrl, changeUrl } from './reducers/urlSlice';
import { changeOkOff, selectChangeOk } from './reducers/changeOkSlice';
import { selectShowHighScore, showHighScoreOn } from './reducers/showHighScoreSlice';
import { createRoomOn } from './reducers/createRoomSlice';
import { changeTempName, selectTempName } from './reducers/tempNameSlice';
import { selectCheckUrl } from './reducers/checkUrlSlice';
import { noNameOff, noNameOn, selectNoName } from './reducers/noNameSlice';
import { changeOldUrl, selectOldUrl } from './reducers/oldUrlSlice';
import { changeCheckUrl } from './reducers/checkUrlSlice';
import { backOff, selectBack } from './reducers/backSlice';

function App() {
  const catalogPieces = useSelector(selectCatalogPieces);
  const multi = useSelector(selectMulti);
  const url = useSelector(selectUrl);
  const back = useSelector(selectBack);
  const changeOk = useSelector(selectChangeOk);
  const tempName = useSelector(selectTempName);
  const checkUrl = useSelector(selectCheckUrl);
  const noName = useSelector(selectNoName);
  const oldUrl = useSelector(selectOldUrl);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SOCKET_INIT' });
  }, [dispatch]);

  useEffect(() => {
    if (url === "" && location.pathname.length > 1) {
      const tempUrl = location.pathname;
      dispatch(changeCheckUrl(tempUrl));
    }
    navigate("/");
  }, [checkUrl, dispatch, location.pathname, navigate, url]);

  useEffect(() => {
    if (multi && url.length > 1) {
      navigate(url);
    }
  }, [multi, navigate, url]);

  useEffect(() => {
    if (tempName.length === 0 && !back) {
      dispatch(changeOldUrl(checkUrl));
      navigate("/");
    }
    if (checkUrl && checkUrl.length > 3 && !back) {
      dispatch({ type: 'URL_CHECK' });
    }
    if (back) {
      dispatch(changeOldUrl(""));
      dispatch(changeUrl(location.pathname));
      dispatch(changeTempName(''));
      dispatch(noNameOn());
      dispatch(backOff());
      navigate("/");
    }
  }, [back, checkUrl, dispatch, location.pathname, navigate, tempName.length]);

  useEffect(() => {
    if (changeOk && oldUrl.length > 0 && !noName && !back) {
      dispatch(changeUrl(oldUrl));
      dispatch({ type: 'CREATE_PLAYER' });
      dispatch(changeOldUrl(""));
      navigate(oldUrl);
    } else if (back) {
      dispatch(changeOldUrl(""));
      dispatch(changeUrl(location.pathname));
      dispatch(changeTempName(''));
      dispatch(noNameOn());
      dispatch(backOff());
      dispatch(changeOkOff());
      navigate("/");
    }
  }, [back, changeOk, dispatch, location.pathname, navigate, noName, oldUrl]);

  const handleInputChange = (event) => {
    dispatch(changeTempName(event.target.value));
  };

  const handleValidation = () => {
    const sanitizedTempName = tempName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const finalTempName = sanitizedTempName.replace(/[^a-zA-Z0-9]/g, '');

    if (finalTempName.length >= 2 && finalTempName.length <= 15) {
      dispatch(changeTempName(finalTempName));
      dispatch(noNameOff());
    } else {
      alert('Name must be between 2 and 15 characters');
    }
  };

  return (
    <div className='Game' data-testid="app-container">
      <h1>Red Tetris</h1>
      <Routes>
        {!noName && (
          <Route path="/:roomId/:name" element={
            <div>
              <MultiGame/>
            </div>
          }/>
        )}
        <Route path="/" element={
          <>
            {!noName && (
              <div className="button">
                <button onClick={() => dispatch(createRoomOn())}>Create Room</button>
              </div>
            )}
            {noName && (
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="Add your name"
                  name="name"
                  required
                  minLength="4"
                  maxLength="15"
                  size="10"
                  value={tempName}
                  onChange={handleInputChange}
                />
                <button onClick={handleValidation}>Validate</button>
              </div>
            )}
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
