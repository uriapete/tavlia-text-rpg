import './App.css';
import { Route,Routes } from "react-router";
import Home from './pages/Home';
import Game from './pages/Game';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='' element={Home()} />
        <Route path='/game' element={Game()} />
      </Routes>
    </div>
  );
}

export default App;
