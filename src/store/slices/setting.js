import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebarShow: true,
    sidebarUnfoldable: false,
    theme: 'light',
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        set: (state, action) => {
            return { ...state, ...action.payload }
        },
        toggleSidebarUnfoldable: (state) => {
            state.sidebarUnfoldable = !state.sidebarUnfoldable
        }
    }
})

export const { set, toggleSidebarUnfoldable } = settingsSlice.actions
export default settingsSlice.reducer