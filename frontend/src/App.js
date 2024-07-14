import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth";
import MusicPlayer from "./components/MusicPlayer";
import Playlists from "./components/Playlists";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/player" component={MusicPlayer} />
        <Route path="/playlists" component={Playlists} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
