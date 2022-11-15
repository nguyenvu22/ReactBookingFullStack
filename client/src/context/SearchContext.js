import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;    //In4 from Search Haeder

    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

//Children represent a Comopnent which reach this data (initial_state)
//dispatch -> Call function SearchReducer
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,           //Can use any case in switch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
