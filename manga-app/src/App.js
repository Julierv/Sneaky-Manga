import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MangaList from './components/MangaList';
import MangaDetails from './components/MangaDetails';
import ImageViewer from './components/ImageViewer';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Sneaky-Manga" component={MangaList} />
        <Route path="/manga/:name/:volume" component={ImageViewer} />
        <Route path="/manga/:name" component={MangaDetails} />
      </Switch>
    </Router>
  );
}

export default App;
