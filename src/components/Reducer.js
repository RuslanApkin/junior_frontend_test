const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURR":
      window.localStorage.setItem("curr", action.payload.label);
      return {
        ...state,
        currency: action.payload,
      };
    case "ADD_PRODUCT":
      const cartItems = state.cart;
      let hashId = action.payload.id;
      const attr = action.payload.attr;
      Object.keys(attr).every((key) => (hashId += attr[key]));
      const itemPos = cartItems.findIndex(({ hash }) => hash === hashId);
      if (itemPos >= 0) {
        cartItems[itemPos].qty += 1;
      } else
        cartItems.push({
          hash: hashId,
          id: action.payload.id,
          attrs: { ...action.payload.attr },
          qty: 1,
        });

      console.log(JSON.stringify(cartItems));
      window.localStorage.setItem(
        "cart",
        cartItems.map((item) => JSON.stringify(item)).join(", ")
      );
      return {
        ...state,
        cart: cartItems,
      };
    case "REMOVE_PRODUCT":
      window.localStorage.setItem(
        state.cart.filter((post) => post.id !== action.payload)
      );
      return {
        ...state,
        cart: state.cart.filter((post) => post.id !== action.payload),
      };
    case "RESET":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default Reducer;
