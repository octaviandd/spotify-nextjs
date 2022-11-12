const initialState = {
  acousticness: [0, 100],
  danceability: [0, 100],
  duration: [0, 100],
  energy: [0, 100],
  instrumentalness: [0, 100],
  key: [0, 100],
  liveness: [0, 100],
  loudness: [0, 100],
  popularity: [0, 100],
  speechiness: [0, 100],
  tempo: [0, 100],
  valence: [0, 100],
}

interface filtersInitialState {
  acousticness: number[]
  danceability: number[]
  duration: number[]
  energy: number[]
  instrumentalness: number[]
  key: number[]
  liveness: number[]
  loudness: number[]
  popularity: number[]
  speechiness: number[]
  tempo: number[]
  valence: number[]
}

interface filtersReducerInterface {
  state: filtersInitialState
  action: {
    type: String
    payload: Object
  }
}

export default function filtersReducer({
  state = initialState,
  action,
}: filtersReducerInterface) {
  switch (action.type) {
    case "acoustiness/change":
      return {
        ...state,
        acousticness: action.payload,
      }
    case "danceability/change":
      return {
        ...state,
        danceability: action.payload,
      }
    case "duration/change":
      return {
        ...state,
        duration: action.payload,
      }
    case "energy/change":
      return {
        ...state,
        energy: action.payload,
      }
    case "instrumentalness/change":
      return {
        ...state,
        instrumentalness: action.payload,
      }
    case "key/change":
      return {
        ...state,
        key: action.payload,
      }
    case "liveness/change":
      return {
        ...state,
        liveness: action.payload,
      }
    case "loudness/change":
      return {
        ...state,
        acousticness: action.payload,
      }
    case "popularity/change":
      return {
        ...state,
        popularity: action.payload,
      }
    case "speechiness/change":
      return {
        ...state,
        speechiness: action.payload,
      }
    case "tempo/change":
      return {
        ...state,
        tempo: action.payload,
      }
    case "valence/change":
      return {
        ...state,
        valence: action.payload,
      }
    default:
      return state
  }
}
