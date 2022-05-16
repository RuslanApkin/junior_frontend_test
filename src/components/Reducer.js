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

      window.localStorage.setItem(
        "cart",
        cartItems.map((item) => JSON.stringify(item)).join(", ")
      );
      return {
        ...state,
        cart: cartItems,
      };
    case "INC_PRODUCT":
      const cartItemsInc = state.cart;
      const hashIdInc = action.payload.hash;
      const itemPosInc = cartItemsInc.findIndex(
        ({ hash }) => hash === hashIdInc
      );
      if (itemPosInc >= 0) {
        cartItemsInc[itemPosInc].qty += 1;
      }
      console.log(JSON.stringify(cartItemsInc));
      window.localStorage.setItem(
        "cart",
        cartItemsInc.map((item) => JSON.stringify(item)).join(", ")
      );
      return {
        ...state,
        cart: cartItemsInc,
      };
    case "REMOVE_PRODUCT":
      let cartItemsRemove = state.cart;
      const hashIdRemove = action.payload;
      const itemPosRemove = cartItemsRemove.findIndex(
        ({ hash }) => hash === hashIdRemove
      );
      if (itemPosRemove >= 0) {
        cartItemsRemove[itemPosRemove].qty -= 1;
      }
      if (cartItemsRemove[itemPosRemove].qty === 0) {
        cartItemsRemove = state.cart.filter(
          ({ hash }) => hash !== action.payload
        );
      }
      console.log(JSON.stringify(cartItemsRemove));
      window.localStorage.setItem(
        "cart",
        cartItemsRemove.map((item) => JSON.stringify(item)).join(", ")
      );
      return {
        ...state,
        cart: cartItemsRemove,
      };
    case "RESET":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default Reducer;
