import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import FilmList from './components/filmList';
import FilmDetails from './components/filmDetails';
import './App.css';

function App() {
  return(
    <Router>
      <div>
        <Header/>
        <Route exact path="/" component={Listings} />
        <Route path="/:slug" 
              render={({ match }) => <FilmDetails match={match} />}/>
      </div>
    </Router>
  )
}

function Listings() {
  return (
    <div className="App">
      <FilmList minDuration={5500}/>
    </div>
  );
}

function Header() {
  return (
    <header className="App-header">React Films</header>
  );
}

export default App;
