import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'

function XoxGameComponent() {
  const [games, setGames] = useState([]);
  const [mark, setMark] = useState("X");
  const [message, setMessage] = useState("");
  const [isGameFinish, setIsGameFinish] = useState(false);
  const [gameMove, setGameMove] = useState([]);

  useEffect(() => {
    newGame();
  }, [])

  const newGame = () => {
    setGames([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
    setIsGameFinish(false);
    setMark("X");
    setMessage("Hamle Sırası:" + mark);
    setGameMove([]);
  }

  const markGame = (index) => {
    if (!isGameFinish) {
      const newGames = [...games];
      if (newGames[index] == "") {
        newGames[index] = mark;
        setGames(newGames);

        setGameMove((val) => [...val, newGames]);
        console.log(gameMove);

        let e = isMoveFinish(newGames);
        if (e) {
          setMessage("Oyun berabere");
          setIsGameFinish(true);
          return;
        };
        let r = isGameOver(newGames);
        if (r) {
          setMessage("Oyunu " + mark + " kazandı!");
          setIsGameFinish(true);
          return;
        }

        mark == "X" ? setMark("O") : setMark("X");
        setMessage("Hamle Sırası: " + (mark == 'X' ? 'O' : 'X'))
      }
    }
  }

  function isMoveFinish(newGames) {
    for (let i = 0; i < newGames.lenght; i++) {
      const element = newGames[i];
      if (element === "") {
        return false;
      };
    }
  }

  const setThatGameMove = (game) => {
    setGames(game);
  }

  const isGameOver = (newGames) => {
    if (newGames[0] != "" && newGames[0] === newGames[1] && newGames[1] === newGames[2]) {
      return true;
    }
    if (newGames[3] != "" && newGames[3] === newGames[4] && newGames[4] === newGames[5]) {
      return true;
    }
    if (newGames[6] != "" && newGames[6] === newGames[7] && newGames[7] === newGames[8]) {
      return true;
    }
    if (newGames[0] != "" && newGames[0] === newGames[3] && newGames[3] === newGames[6]) {
      return true;
    }
    if (newGames[1] != "" && newGames[1] === newGames[4] && newGames[4] === newGames[7]) {
      return true;
    }
    if (newGames[2] != "" && newGames[2] === newGames[5] && newGames[5] === newGames[8]) {
      return true;
    }
    if (newGames[0] != "" && newGames[0] === newGames[4] && newGames[4] === newGames[8]) {
      return true;
    }
    if (newGames[2] != "" && newGames[2] === newGames[4] && newGames[4] === newGames[6]) {
      return true;
    }
  }


  return (
    <>
      <div className='container text-center'>
        <h1>XOX GAME</h1>
        <h2 className='alert alert-warning'>{message}</h2>
        <button className='btn btn-outline-primary w-100' onClick={newGame}>New Game</button>
        <div className='row mt-2'>
          {games.map((game, index) => (
            <div
              key={index}
              className='col-md-4 box'
              onClick={() => markGame(index)}>
              {game}
            </div>
          ))};
        </div>
        <hr />
        <ol>
          {gameMove.map((game, index) => (
            <button onClick={() => setThatGameMove(game)} className='btn btn-outline-info mx-2 mt-2' key={index}>{index + 1}. Hamle</button>
          ))}
        </ol>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <XoxGameComponent />
);

reportWebVitals();
