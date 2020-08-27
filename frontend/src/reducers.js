const reducer = (state = [], action) => {
	switch(action.type) {
    case "ADD_DATA":
			return [...state, action.data]
		case "REMOVE_DATA":
			return state.filter(x => x.ticker !== action.data)
		case "CHANGE_MULTIPLIER":
			return state.map(x => x.ticker === action.data.ticker ? {...x, multiplier: action.data.multiplier}: x)
    default:
        return state
  }
}

export const dataAdd = (data) => {
	return {type: "ADD_DATA", data: {...data, multiplier: 1}}
}

export const removeData = (ticker) => {
	return {type: "REMOVE_DATA", data: ticker}
}

export const changeMultiplier = (ticker, multiplier) => {
	return {type: "CHANGE_MULTIPLIER", data: {ticker, multiplier}}
}


export default reducer