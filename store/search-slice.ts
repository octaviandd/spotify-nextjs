const initialState = {
  search: "",
}

interface searchInitialState {
  search: string
}

interface searchReducerInterface {
  state: searchInitialState
  action: {
    type: String
    payload: Object
  }
}

export default function searchReducer({
  state = initialState,
  action,
}: searchReducerInterface) {
  switch (action.type) {
    case "changeSearch":
      return {
        ...state,
        search: action.payload,
      }
    case "clearSearch":
      return {
        initialState,
      }
    default:
      return state
  }
}
