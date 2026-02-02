import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBoards = createAsyncThunk(
    'boards/fetchBoards',
    async () => {
        const res = await fetch(`https://trello-backend-v4qh.onrender.com/board/default`, {
            method: 'GET',
            credentials: 'include'
        });
        return await res.json();
    }
);

export const createBoards = createAsyncThunk(
    'boards/createBoards',
    async ({ title, background }) => {
        const res = await fetch(`https://trello-backend-v4qh.onrender.com/board/creating_board`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title, background
            })
        });
        return await res.json();
    }
);

export const fecthAllBoards = createAsyncThunk(
    'boards/fetchAllBoards',
    async () => {
        const res = await fetch('https://trello-backend-v4qh.onrender.com/board/all_boards', {
            method: 'GET',
            credentials: 'include'
        });
        return await res.json()
    }
);

const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        boards: [],
        activeBoardId: null,
        loading: false
    },
    reducers: {
        setActiveBoard: (state, action) => {
            state.activeBoardId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchBoards.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.boards = action.payload;
                state.loading = false;

                if (!state.activeBoardId && action.payload.length > 0) {
                    state.activeBoardId = action.payload[0]._id;
                }
            })
            .addCase(createBoards.fulfilled, (state, action) => {
                state.boards.push(action.payload);
                state.activeBoardId = action.payload._id
            })
            .addCase(fecthAllBoards.fulfilled,(state,action)=>{
                state.boards=action.payload;
            })
    }
});

export const { setActiveBoard } = boardsSlice.actions;
export default boardsSlice.reducer;