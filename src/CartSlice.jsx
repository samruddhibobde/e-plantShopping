import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // stores all items added to cart
  },
  reducers: {
    // ➕ Add item to cart
    addItem: (state, action) => {
      const newItem = action.payload;
      // check if item already exists in cart
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // if already exists, just increase quantity
        existingItem.quantity += 1;
      } else {
        // otherwise add as new item with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    // ❌ Remove item from cart
    removeItem: (state, action) => {
      const itemName = action.payload;
      // filter out the item with given name
      state.items = state.items.filter(item => item.name !== itemName);
    },

    // 🔁 Update item quantity in cart
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      // find the item by name
      const item = state.items.find(item => item.name === name);

      if (item) {
        item.quantity = amount;

        // if quantity is 0 or less, remove the item
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.name !== name);
        }
      }
    },
  },
});

// Export actions so they can be used in ProductList and CartItem components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer as default for store.js
export default CartSlice.reducer;
