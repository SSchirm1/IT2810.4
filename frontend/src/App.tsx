import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Sfwrapper from './components/Search&filter/sfwrapper';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="body">
        <Sfwrapper/>
      </div>
    </div>
  );
}

export default App;
