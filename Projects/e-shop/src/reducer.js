// defines and mutate application states
export const initialState = {
  basket: []
}

export const getBasketTotal = (basket) => {
  return (basket?.reduce((amount, item) => item.price + amount, 0))
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      }

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )

      let updateBasket = [...state.basket]

      if (index >= 0) {
        updateBasket.splice(index, 1)
      } else {
        console.error(`Could not remove item ${action.id}`)
      }

      return {
        ...state,
        basket: updateBasket
      }

    default:
      return state;
  }
}

export default reducer