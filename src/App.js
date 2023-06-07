import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const sounds = [
    {
      keycode: 81,
      Q: "Heater-1",
      text: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keycode: 87,
      W: "Heater-2",
      text: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keycode: 69,
      E: "Heater-3",
      text: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keycode: 65,
      A: "Heater-4",
      text: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keycode: 83,
      S: "Clap",
      text: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keycode: 68,
      D: "Open-HH",
      text: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keycode: 90,
      Z: "Kick-n-Hat",
      text: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keycode: 88,
      X: "Kick",
      text: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keycode: 67,
      C: "Closed-HH",
      text: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const [button, setButton] = useState("");

  function playSound(key) {
    const audio = document.getElementById(key);

    audio.play();
    audio.volume = volume;
    for (let i = 0; i < sounds.length; i++) {
      if (sounds[i].hasOwnProperty(key)) {
        setButton(sounds[i][key]);
        break;
      }
    }
  }

  const [volume, setVolume] = useState(1);

  const [power, setPower] = useState(false);

  const handlePower = (event) => {
    if (power == true) {
      setPower(false);
      setButton("");
    } else {
      setPower(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      // let arr = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
      let temp = event.key.toUpperCase();
      playSound(temp);
    });
  }, []);

  return (
    <div className="App">
      <div id="drum-machine">
        <div id="key-pad">
          {sounds.map((drumpad) => {
            return (
              <div
                onClick={() => {
                  power && playSound(drumpad.text);
                }}
                className="drum-pad"
                id={drumpad[drumpad.text]}
              >
                {drumpad.text}
                <audio
                  className="clip"
                  id={drumpad.text}
                  src={drumpad.src}
                ></audio>
              </div>
            );
          })}
        </div>
        <div className="nonkeypad">
          <label className="switch">
            <input
              id="power"
              type="checkbox"
              value={power}
              onChange={handlePower}
            />
            <span className="slider"></span>
          </label>

          <div id="display">{button}</div>
          <div id="volume">
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volume}
              onChange={(event) => {
                setVolume(event.target.valueAsNumber);
                setButton(
                  "volume: " + Math.round(event.target.valueAsNumber * 100)
                );
              }}
            />
          </div>
        </div>
      </div>
      <p>by Aravind</p>
    </div>
  );
}

export default App;
