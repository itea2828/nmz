import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
}

export const persSlice = createSlice({
    name: 'pers',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const { 
    

    setIsAuthenticated,



} = persSlice.actions;

// selectors 


export const selectIsAuthenticated = (state) => state.pers.isAuthenticated;

export default persSlice.reducer;

