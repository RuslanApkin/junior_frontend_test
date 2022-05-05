const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURR":
      window.localStorage.setItem("curr", action.payload.label);
      return {
        ...state,
        currency: action.payload,
      };
    case "ADD_PRODUCT":
      const prev = window.localStorage.getItem("cart")
        ? window.localStorage.getItem("cart") + ", "
        : "";
      window.localStorage.setItem(
        "cart",
        prev + JSON.stringify(action.payload)
      );
      return {
        ...state,
        cart: state.cart ? state.cart.concat(action.payload) : [action.payload],
      };
    case "REMOVE_PRODUCT":
      window.localStorage.setItem(
        state.cart.filter((post) => post.id !== action.payload)
      );
      return {
        ...state,
        cart: state.cart.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export default Reducer;
