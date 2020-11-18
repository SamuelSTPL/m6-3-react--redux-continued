const initialState = {
  currentArtist: null,
  status: "loading",
  error: null,
};

export const artistReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case "REQUEST_ARTIST_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_DATA": {
      // console.log(action);
      return {
        ...state,
        currentArtist: {
          profile: action.data,
        },
        // currentArtist: action.data,
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_DATA_ERROR": {
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

/*
The 'type' for current artist will look like this:
{
  id: 'abc123',
  profile: profile response,
  topTracks: top tracks response,
  relatedArtists: related artists response
}
*/
