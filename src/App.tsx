import { useState, useEffect } from "react";
import bg_game from "./assets/back.jpg";
import "./App.css";
import { checkApiParam } from "./components/checkUrl";

// Cards Default
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
  // initialState
  const listBox = Array.from(
    document.getElementsByClassName("box") as HTMLCollectionOf<HTMLElement>
  );
  const [box, setBox] = useState<any[]>(() =>
    listCard.filter((_, index) => index <= 5)
  );

  // use hook
  const [scorePlayer, setCorePlayer] = useState<any>(null);
  const [banker, setBanker] = useState<any>(null);

    // check APIkey path Url 
  useEffect(() => {
    checkApiParam();
  }, []);

  // shuffleArray
  const shuffleArray = (array: any[]) => {
    for (let i: number = array.length - 1; i > 0; i--) {
      // Generate random number
      const j: number = Math.floor(Math.random() * (i + 1));

      const temp: any = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    const newArr = array.filter((_, index) => {
      return index < 6;
    });

    setBox(newArr);
  };

  // render Box
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

  // handle Fill Card
  const handleFillCard = (ele: HTMLElement, top: string, right: string) => {
    ele.style.top = top;
    ele.style.right = right;
  };

  // Play game
  const handlePlayGame = () => {
    listBox.forEach((div: HTMLElement, i: number) => {
      if (i === 0) {
        setTimeout(() => {
          handleFillCard(div, "175px", "600px");
        }, (i + 1) * 1000);
      } else if (i === 1) {
        setTimeout(() => {
          handleFillCard(div, "175px", "200px");
        }, (i + 1) * 1000);
      } else if (i === 2) {
        setTimeout(() => {
          handleFillCard(div, "175px", "520px");
        }, (i + 1) * 1000);
      } else if (i === 3) {
        setTimeout(() => {
          handleFillCard(div, "175px", "120px");
          XuLyLatBai()
        }, (i + 1) * 1000);
      }
    });

    shuffleArray(listCard);
  };

// Xu li quay lai
  const handleReturn = () => {
    listBox.forEach((div: HTMLElement, i: number) => {
      if (i === 0) {
        setTimeout(() => {
          handleFillCard(div, "175px", "600px");
        },  1000);
      }  else if (i === 2) {
        setTimeout(() => {
          handleFillCard(div, "175px", "520px");
        },  1000);
      } 
    })
  }

// Xu ly lat bai
const XuLyLatBai = () => {
  listBox.forEach((div, index) => {
    if (index === 0) {
      setTimeout(() => {
        div.classList.add("fill")
        setCorePlayer(Number(div.id))
        console.log(scorePlayer, Number(div.id))
      }, (index + 1) * 1000);
    }

    if (index === 1) {
      setTimeout(() => {
        div.classList.add("fill")
        setBanker(Number(div.id))
        console.log(scorePlayer);
        handleScore()
      }, (index + 1) * 1000);
    }
  });
}

// Xu ly tinh diem
//   const handleScore =(callback: any) => {
//     listBox.forEach((div, i) => {
//       if (i == 0) {
//         setTimeout(() => {
//           div.style.right = "330px";
//           div.style.top = "220px";
//         }, 1000);
//       }
//       if (i == 2) {
//         setTimeout(() => {
//           div.style.top = "220px";
//           div.style.right = "400px";
//           div.classList.add("fill")
//           console.log(scorePlayer)
//           console.log(scorePlayer + Number(div.id));
//           setCorePlayer(scorePlayer + Number(div.id))
//           callback()
//         }, 1000)
//       }
//     })
// }
const handleScore =() => {
  listBox.forEach((div, i) => {
    if (i == 0) {
      setTimeout(() => {
        div.style.right = "330px";
        div.style.top = "220px";
        console.log(scorePlayer)
      }, 1000);
    }
    if (i == 2) {
      setTimeout(() => {
        div.style.top = "220px";
        div.style.right = "400px";
        div.classList.add("fill")
        console.log(scorePlayer)
        setCorePlayer(scorePlayer + Number(div.id))
      }, 1000)
    }
  })
}



// main
  return (
    <div id="banner">
      <div className="relative">
        <div
          className="wrapper"
          style={{
            backgroundImage: `url(${bg_game})`,
          }}
        >
          <div className="showScore">
            <p className="score-player score">
              {scorePlayer == 0 || scorePlayer == 10 ? '0' : scorePlayer ? scorePlayer : ""}
            </p>
            <p className="score-banker score">{banker == 0 || banker == 10 ? '0' : banker ?  banker : ""}</p>
          </div>
          <button className="btn" onClick={handlePlayGame}>
            Play Game
          </button>
        </div>

        {renderBox()}
      </div>
    </div>
  );
}

export default App;
