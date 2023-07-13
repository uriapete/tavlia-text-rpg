import './App.css';
import { Route,Routes } from "react-router";
import Home from './pages/Home';
import Game from './pages/Game';

function App() {
  return (
    <div className="App">
      <h1 className="title">Tavlia</h1>
      <main className="App-main">
        <Routes>
          <Route path='' element={Home()} />
          <Route path='game' element={Game()} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
