import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: 'I', rotation: 0 };

const pieceSlice = createSlice({

	name: 'piece',
	initialState,
	reducers: {
		fillPiece(state, action) {
			return action.payload; // Remplacer l'état actuel par le tableau de pièces
		},
		modifyPiece(state, action) {
			const { newPiece, pieceIndex } = action.payload;
			const newPieces = [...state];
			newPieces[pieceIndex] = newPiece;
			return newPieces;
		}
	}

})

export const { fillPiece, modifyPiece } = pieceSlice.actions;
export default pieceSlice.reducer

export const selectPiece = (state) => state.piece