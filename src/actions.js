//Token
export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});
export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});
export const requestAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

//Artist Data
export const requestArtistData = () => ({
  type: "REQUEST_ARTIST_DATA",
});
export const receiveArtistData = (data) => ({
  type: "RECEIVE_ARTIST_DATA",
  data,
});
export const receiveArtistDataError = () => ({
  type: "RECEIVE_ARTIST_DATA_ERROR",
});
