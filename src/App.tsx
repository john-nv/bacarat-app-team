import { useState } from "react";
import bg_game from "./assets/back.jpg";
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
  { v: 0, f: "d13" }
]

function App() {
  const [box, setBox] = useState<any[]>(() =>
    listCard.filter((_, index) => index <= 5)
  );

  const [scorePlayer, setCorePlayer] = useState<any>(null)
  const [banker, setBanker] = useState<any>(null)

  const [changeCard, setChangeCard] = useState<boolean>(false)

  // handle 
  const shuffleArray = (array: any[]) => {
    for (let i:number = array.length - 1; i > 0; i--) {
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
  }

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

  const handleFillCard = (ele:HTMLElement ,top:string, right:string) => {
    ele.style.top = top;
    ele.style.right = right
  }

  // dom element
  const listBox = Array.from(document.getElementsByClassName('box') as HTMLCollectionOf<HTMLElement>)
  // Handle animation when play game
  const handlePlayGame = () => {
       listBox.forEach((div:HTMLElement, i: number) => {
      if (i === 0) {
        setTimeout(() => {
           handleFillCard(div, '375px', '1200px')
        }, (i+ 1) * 1000)
      } else if (i === 1) {
        setTimeout( () => {
           handleFillCard(div, '375px', '800px')

        }, (i+ 1) * 1000)
      }  else if (i === 2) {
        setTimeout( () => {
           handleFillCard(div, '375px', '1120px')

        }, (i+ 1) * 1000)
      }  else if (i === 3) {
        setTimeout( () => {
           handleFillCard(div, '375px', '720px')
          setChangeCard(true)
        }, (i+ 1) * 1000)
      }
    })

    shuffleArray(listCard);
  };

if (changeCard === true) {
  listBox.forEach((div, index) => {
    console.log(index);
    console.log(index === 1)
    if(index === 0) {
      return setTimeout(()=> {
        div.classList.add('fill')
        setCorePlayer(Number(div.id))
      }, (index + 1) * 1000)
    } 
    
    if(index === 1) {
      return setTimeout(()=> {
        div.classList.add('fill')
        setBanker(Number(div.id))
        setChangeCard(false)
      }, (index + 1) * 1000)
    } 
  })
}

if (scorePlayer !== null && banker !== null) {
  listBox.forEach((div, i) => {
    if(i == 0 ) {
     setTimeout(() => {
      div.style.right = "970px";
      div.style.top = "400px";
     }, 1000)
    }
    if (i == 2) {
      setTimeout(() => {
        div.style.right = "890px";
        div.style.top = "400px";
        div.classList.add('fill')
      }, 1000)
    }
})
}


  return (
    <div id="banner">
      <div></div>
      <div
        className="wrapper"
        style={{
          backgroundImage: `url(${bg_game})`,
        }}
      >
        <div className="showScore">
          <p className="score-player score">{scorePlayer ? scorePlayer : ''}</p>
          <p className="score-banker score">{ banker ? banker : ''}</p>
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
