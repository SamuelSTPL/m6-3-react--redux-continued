const initialState = {
  token: null,
  status: "idle",
};

export const authReducer = (state = initialState, action) => {
  // console.log(action);
  // console.log(state);
  switch (action.type) {
    case "REQUEST_ACCESS_TOKEN": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ACCESS_TOKEN": {
      return {
        ...state,
        token: action.token,
        status: "idle",
      };
    }
    case "RECEIVE_ACCESS_TOKEN_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    default: {
      return state;
    }
  }
};
