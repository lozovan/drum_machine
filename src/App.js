import './App.css';
import React, { useState, useEffect } from 'react';

const bank = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const App = () => {
  const [display, setDisplay] = useState("Display");
  return (
    <main id="drum-machine" className="border border-secondary rounded p-3">
      <div id="display" className="border border-secondary rounded p-3 ">{display}</div>
      <Pads
        bank={bank}
        setDisplay={setDisplay}
      />
    </main>
  );
};

const Pads = (props) => {
  let drumPads = props.bank.map((x) => {
    return (
      <DrumPad
        padId={x.id}
        padName={x.keyTrigger}
        url={x.url}
        keyCode={x.keyCode}
        setDisplay={props.setDisplay}
      />
    );
  });

  return (
    <div className="drum-pads border border-secondary rounded p-3 d-flex flex-wrap justify-content-center">
      {drumPads}
    </div>
  );
};

const DrumPad = (props) => {
  const playSound = () => {
    const sound = document.getElementById(props.padName);
    sound.currentTime = 0;
    sound.play();
    props.setDisplay(props.padId);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === props.keyCode) {
      playSound();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="drum-pad border border-secondary rounded p-3" id={props.padId} onClick={playSound}>
      {props.padName}
      <audio className="clip" id={props.padName} src={props.url} />
    </div>
  );
};

export default App;