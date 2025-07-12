import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import { FaSun, FaMoon } from 'react-icons/fa';

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dataRef = useRef(["", "", "", "", "", "", "", "", ""]);
    let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || dataRef.current[num] !== "") return;

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'>`;
      dataRef.current[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}'>`;
      dataRef.current[num] = "o";
    }

    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
  const d = dataRef.current;
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let [a, b, c] of wins) {
    if (d[a] && d[a] === d[b] && d[b] === d[c]) {
      won(d[a]);
      return;
    }
  }

    // 🔽 Draw condition: if all cells are filled and no winner
    if (d.every(cell => cell !== "")) {
      titleRef.current.innerHTML = `Match Draw! 🤝`;
      setLock(true);
    }
  };


  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src=${winner === "x" ? cross_icon : circle_icon}> Wins`;
  };

  const reset = () => {
    setLock(false);
    setCount(0);
    dataRef.current = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
    box_array.forEach(ref => ref.current.innerHTML = "");
  };


  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>

      <div className="board">
        {[0, 1, 2].map(row => (
          <div className="row" key={row}>
            {[0, 1, 2].map(col => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes"
                  ref={box_array[index]}
                  onClick={(e) => toggle(e, index)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
