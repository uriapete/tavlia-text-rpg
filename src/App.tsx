import './App.css';
import { Route,Routes } from "react-router";
import Home from './pages/Home';
import Game from './pages/Game';
import { UserToken } from './hooks/Contexts';
import { useState } from 'react';
import Header from './components/Header';

function App() {
  const [userToken, setUserToken] = useState<null|string>(null)
  return (
    <div className="App">
      <UserToken.Provider value={
        {
          userToken,
          setTokenFn:setUserToken
        }
      }>
        <Header />
        <h1 className="title">Tavlia</h1>
        <main className="App-main">
          <Routes>
            <Route path='' element={<Home/>} />
            <Route path='game' element={<Game/>} />
          </Routes>
        </main>
      </UserToken.Provider>
    </div>
  );
}

export default App;
