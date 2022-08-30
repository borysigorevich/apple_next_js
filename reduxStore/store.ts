import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './bascketSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
