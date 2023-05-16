import { useState } from "react";
import bg_game from "./assets/back.jpg";
import hidden from "./assets/images/hidden.png";
import "./App.css";

const listCard = [
  { v: 1, f: "c1" },
  { v: 2, f: "c2" },
  { v: 3, f: "c3" },
  { v: 4, f: "c4" },
  { v: 5, f: "c5" },
  { v: 6, f: "c6" },
  { v: 7, f: "c7" },
  { v: 8, f: "c8" },
  { v: 9, f: "c9" },
  { v: 10, f: "c10" },
  { v: 0, f: "c11" },
  { v: 0, f: "c12" },
  { v: 0, f: "c13" },
  { v: 1, f: "h1" },
  { v: 2, f: "h2" },
  { v: 3, f: "h3" },
  { v: 4, f: "h4" },
  { v: 5, f: "h5" },
  { v: 6, f: "h6" },
  { v: 7, f: "h7" },
  { v: 8, f: "h8" },
  { v: 9, f: "h9" },
  { v: 10, f: "h10" },
  { v: 0, f: "h11" },
  { v: 0, f: "h12" },
  { v: 0, f: "h13" },
  { v: 1, f: "s1" },
  { v: 2, f: "s2" },
  { v: 3, f: "s3" },
  { v: 4, f: "s4" },
  { v: 5, f: "s5" },
  { v: 6, f: "s6" },
  { v: 7, f: "s7" },
  { v: 8, f: "s8" },
  { v: 9, f: "s9" },
  { v: 10, f: "s10" },
  { v: 0, f: "s11" },
  { v: 0, f: "s12" },
  { v: 0, f: "s13" },
  { v: 1, f: "d1" },
  { v: 2, f: "d2" },
  { v: 3, f: "d3" },
  { v: 4, f: "d4" },
  { v: 5, f: "d5" },
  { v: 6, f: "d6" },
  { v: 7, f: "d7" },
  { v: 8, f: "d8" },
  { v: 9, f: "d9" },
  { v: 10, f: "d10" },
  { v: 0, f: "d11" },
  { v: 0, f: "d12" },
  { v: 0, f: "d13" },
];

function App() {
  const [box, setBox] = useState<any[]>(() =>
    listCard.filter((item, index) => index <= 5)
  );

  const [changeCard, setChangeCard] = useState<boolean>(false)

  const renderBox = () => {
    return box.map((item, index) => {
      return (
        <div className="box" id={item.v} key={index}>
          <img src="./src/assets/images/hidden.png" className="front" />

          <div
            className="back"
            style={{
              backgroundImage: `url(./src/assets/images/${item.f}.png)`,
            }}
          ></div>
        </div>
      );
    });
  };

  const shuffleArray = (array: any[]) => {
    for (let i: number = array.length - 1; i > 0; i--) {
      // Generate random number
      const j: number = Math.floor(Math.random() * (i + 1))

      const temp:any = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    const newArr = array.filter((_, index) => {
      return index < 6
    })

    setBox(newArr)
  };

  // Handle PlayGame
  const desk = document.querySelectorAll(".box")
  const handlePlayGame = () => {
    desk.forEach((div:any, i: number) => {
      if (i === 0) {
        setTimeout(() => {
          div.style.top = "375px";
          div.style.right = "1200px";
        }, (i+ 1) * 1000)
      } else if (i === 1) {
        setTimeout(() => {
          div.style.top = "375px";
          div.style.right = "700px";
        }, (i+ 1) * 1000)
      }  else if (i === 2) {
        setTimeout(() => {
          div.style.top = "375px";
          div.style.right = "1050px";
        }, (i+ 1) * 1000)
      }  else if (i === 3) {
        setTimeout(() => {
          div.style.top = "375px"
          div.style.right = "550px"
          setChangeCard(!changeCard);
        }, (i+ 1) * 1000)
      }
    })

    shuffleArray(listCard);
  };

  if (changeCard) {
    desk.forEach((div, i) => {
      if(i<=1) {
        setTimeout(()=> {
          div.classList.add('fill')
      }, (i + 1) * 1000)
      }
    })
  }

  return (
    <div id="banner">
      <div
        className="wrapper"
        style={{
          backgroundImage: `url(${bg_game})`,
        }}
      >
        <div className="main">
        </div>
        <button className="btn" onClick={handlePlayGame}>
        Play Game
      </button>
      </div>
    

      {renderBox()}
    </div>
  );
}

export default App;
