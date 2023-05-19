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
  const ele_result = document.getElementById("result") as HTMLElement;
  const listBox = Array.from(
    document.getElementsByClassName("box") as HTMLCollectionOf<HTMLElement>
  );
  const [box, setBox] = useState<any[]>(() =>
    listCard.filter((_, index) => index <= 5)
  );

  // use hook
  const [scorePlayer, setCorePlayer] = useState<any>(null);
  const [banker, setBanker] = useState<any>(null);
  const [result, setResult] = useState<object>({
    player: null,
    banker: null,
  });

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
    return box?.map((item, index) => {
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
          handleFillCard(div, "175px", "625px");
        }, (i + 1) * 1000);
      } else if (i === 1) {
        setTimeout(() => {
          handleFillCard(div, "175px", "200px");
        }, (i + 1) * 1000);
      } else if (i === 2) {
        setTimeout(() => {
          handleFillCard(div, "175px", "550px");
        }, (i + 1) * 1000);
      } else if (i === 3) {
        setTimeout(async () => {
          handleFillCard(div, "175px", "125px");
       
            await XuLyLatBai();
            await handleScore();
            await handleReturn();
            await handleScore2();
            await handleReturn2();
            await handleCardThree();
            await handleCardThreeBanker();
            await handleResult();
       
        }, (i + 1) * 1000);
      }
    });

    shuffleArray(listCard);
  };


  // Xu ly lat bai
  function XuLyLatBai() {
    return new Promise<void>((resolve) => {
      listBox.forEach((div, index) => {
        if (index === 0) {
          setTimeout(() => {
            div.classList.add("fill");
            setCorePlayer((prevState: number) => {
              if (Number(div.id) === 10) {
                return 0;
              }
              return prevState + Number(div.id);
            });
          }, (index + 1) * 1000);
        }

        if (index === 1) {
          setTimeout(() => {
            div.classList.add("fill");
            setBanker((prevState: number) => {
              if (Number(div.id) == 10) {
                return 0;
              }
              return prevState + Number(div.id);
            });
            resolve();
          }, (index + 1) * 1000);
        }
      });
    });
  }

  const handleScore = () => {
    return new Promise<void>((resolve) => {
      listBox.forEach((div, i) => {
        if (i == 0) {
          setTimeout(() => {
            div.style.right = "350px";
            div.style.top = "220px";
          }, 1000);
        }
        if (i == 2) {
          setTimeout(() => {
            div.style.top = "220px";
            div.style.right = "420px";
            div.classList.add("fill");
            setCorePlayer((prevState: number) => {
              if (prevState + Number(div.id) == 10) {
                return 0;
              } else if (prevState + Number(div.id) > 10) {
                setResult((prev: object) => {
                  return { ...prev, player: prevState + Number(div.id) - 10 };
                });
                return prevState + Number(div.id) - 10;
              }
              setResult((prev: object) => {
                return { ...prev, player: prevState + Number(div.id) };
              });
              return prevState + Number(div.id);
            });
            resolve();
          }, 1000);
        }
      });
    });
  };

  const handleScore2 = () => {
    return new Promise<void>((resolve) => {
      listBox.forEach((div, i) => {
        if (i == 1) {
          setTimeout(() => {
            div.style.right = "330px";
            div.style.top = "220px";
          }, 1000);
        }
        if (i == 3) {
          setTimeout(() => {
            div.style.top = "220px";
            div.style.right = "400px";
            div.classList.add("fill");
            setBanker((prevState: number) => {
              if (prevState + Number(div.id) === 10) {
                return 0;
              } else if (prevState + Number(div.id) > 10) {
                setResult((prev: object) => {
                  return setResult({
                    ...prev,
                    banker: prevState + Number(div.id) - 10,
                  });
                });
                return prevState + Number(div.id) - 10;
              }

              setResult((prev: object) => {
                return setResult({
                  ...prev,
                  banker: prevState + Number(div.id),
                });
              });
              return prevState + Number(div.id);
            });
            resolve();
          }, 1000);
        }
      });
    });
  };

  const handleReturn = () => {
    return new Promise<void>((resolve) => {
      listBox.forEach((div: HTMLElement, i: number) => {
        if (i === 0) {
          setTimeout(() => {
            handleFillCard(div, "175px", "625px");
          }, 1000);
        } else if (i === 2) {
          setTimeout(() => {
            handleFillCard(div, "175px", "550px");
            resolve();
          }, 1000);
        }
      });
    });
  };

  const handleReturn2 = () => {
    return new Promise<void>((resolve) => {
      listBox.forEach((div: HTMLElement, i: number) => {
        if (i === 1) {
          setTimeout(() => {
            handleFillCard(div, "175px", "200px");
          }, 1000);
        } else if (i === 3) {
          setTimeout(() => {
            handleFillCard(div, "175px", "120px");
            resolve();
          }, 1000);
        }
      });
    });
  };

  const handleCardThree = () => {
    return new Promise<void>((resolve) => {
      return listBox.forEach((div: HTMLElement, i: number) => {
        if (i == 4) {
          setCorePlayer((prevState: number) => {
            if (prevState < 5) {
              setTimeout(() => {
                handleFillCard(div, "175px", "700px");
                div.classList.add("fill");

              }, 1000);
              if (prevState + Number(div.id) === 10) {
                setResult((prev: object) => {
                  return setResult({ ...prev, player: 0 });
                });

                resolve();
                return 0;
              } else if (prevState + Number(div.id) > 10) {
                setResult((prev: object) => {
                  return setResult({
                    ...prev,
                    player: prevState + Number(div.id) - 10,
                  });
                });

                resolve();
                return prevState + Number(div.id) - 10;
              }

              setResult((prev: object) => {
                return setResult({
                  ...prev,
                  player: prevState + Number(div.id),
                });
              });

              resolve();
              return prevState + Number(div.id);
            }

            resolve();
            setResult((prev: object) => {
              return setResult({ ...prev, player: prevState });
            });
            return prevState;
          });
        }
      });
    });
  };

  const handleCardThreeBanker = () => {
    return new Promise<void>((resolve) => {
      return listBox.forEach((div: HTMLElement, i: number) => {
        if (i == 5) {
          setBanker((prevState: number) => {
            if (prevState < 5) {
              setTimeout(() => {
                handleFillCard(div, "175px", "50px");
                div.classList.add("fill");
              }, 1000);
              if (prevState + Number(div.id) === 10) {
                setResult((prev: object) => {
                  return setResult({ ...prev, banker: 0 });
                });
                resolve();
                return 0;
              } else if (prevState + Number(div.id) > 10) {
                setResult((prev: object) => {
                  return setResult({
                    ...prev,
                    banker: prevState + Number(div.id) - 10,
                  });
                });
                resolve();
                return prevState + Number(div.id) - 10;
              }

              resolve();
              setResult((prev: object) => {
                return setResult({
                  ...prev,
                  banker: prevState + Number(div.id),
                });
              });

              return prevState + Number(div.id);
            }

            setResult((prev: object) => {
              return setResult({ ...prev, banker: prevState });
            });
            resolve();
            return prevState;
          });
        }
      });
    });
  };

  const handleResult = () => {
    return new Promise<void>((resolve) => {
      setResult((prev: any) => {
        setTimeout(() => {
          if (prev.banker > prev.player) {
            ele_result.innerHTML = "Banker Win";
            resolve();
          } else if (prev.player > prev.banker) {
            ele_result.innerHTML = "Player Win";
            resolve();
          } else {
            resolve();
            ele_result.innerHTML = "Tie";
          }
          resolve();
          return prev;
        }, 1000)
      });
    });
  };

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
            <p className="score-player score">{scorePlayer}</p>
            <p className="score-banker score">{banker}</p>
          </div>
          <button className="btn" onClick={handlePlayGame}>
            Play Game
          </button>
        </div>

        {renderBox()}

        <div id="result"></div>
      </div>
    </div>
  );
}

export default App;
