import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = () =>
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div>
      <h2>Rules</h2>
      <ol>
        <li>Work on your habit for minimum an hour every day for the next 100 days*</li>
        <li>Tweet your progress every day with the #100DaysOfX hashtag and the hashtag of your chosen challenge</li>
        <li>Encourage/help at least 2 people in the challenge every day</li>
      </ol>
    </div>
  </div>

export default App;
