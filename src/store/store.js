import { configureStore } from '@reduxjs/toolkit'
import settingsSlice from './slices/setting'
import visasSlice from './slices/get_work_visa'

const store = configureStore({
  reducer: {
    settings: settingsSlice,
    visa: visasSlice
  }
})

export default store