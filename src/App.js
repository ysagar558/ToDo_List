import React from 'react';
import './App.css';

import Board from './components/Board';

function App() {



  return (
    <div className="App">
      <div className="container">
        <Board boardName="TODO - List"/>
      </div>
    </div>
  );
}

export default App;
