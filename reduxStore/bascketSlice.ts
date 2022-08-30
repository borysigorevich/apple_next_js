import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@reduxStore'

type BasketStateType = {
  items: {
    [key: string]: ProductType & { count: number }
  },
  itemsTotalCount: number
}

const initialState: BasketStateType = {
  items: {},
  itemsTotalCount: 0
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, { payload }: PayloadAction<ProductType>) => {
      const item = state.items[payload._id]
      if (item) {
        item.count += 1
      } else {
        state.items[payload._id] = { ...payload, count: 1 }
      }
      ++state.itemsTotalCount
    },
    removeFromBasket: (state, { payload }: PayloadAction<string>) => {
      const item = state.items[payload]
      if (item.count === 1) delete state.items[payload]
      else item.count -= 1
      --state.itemsTotalCount
    },
  },
})

export const selectBasketItems = (state: RootState) => state.basket.items
export const selectBasketItemsTotalCount = (state: RootState) => state.basket.itemsTotalCount

export const { addToBasket, removeFromBasket } = basketSlice.actions
export default basketSlice.reducer
