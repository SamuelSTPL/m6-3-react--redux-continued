import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { ArtistRoute } from "./ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  requestAccessTokenError,
} from "../../actions";
import { useDispatch } from "react-redux";

const DEFAULT_ARTIST_ID = "2CIMQHirSU0MQqyYHq0eOx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
        // console.log(json.access_token);
      })
      .catch((err) => {
        dispatch(requestAccessTokenError);
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path={"/artists/:id"}>
          <ArtistRoute />
        </Route>
        <Redirect to={`artists/${DEFAULT_ARTIST_ID}`} />
      </Switch>
    </Router>
  );
};

export default App;
