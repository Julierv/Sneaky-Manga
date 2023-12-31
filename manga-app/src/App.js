import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MangaList from './components/MangaList';
import MangaDetails from './components/MangaDetails';
import ImageViewer from './components/ImageViewer';
import ViewAllMangaPage from './components/ViewAllManga';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Sneaky-Manga" component={MangaList} />
        <Route path="/Sneaky-Manga/manga/:name/:volume" component={ImageViewer} />
        <Route path="/Sneaky-Manga/manga/:name" component={MangaDetails} />
        <Route path="/Sneaky-Manga/view-all/:classification" component={ViewAllMangaPage} />
      </Switch>
    </Router>
  );
}

export default App;
