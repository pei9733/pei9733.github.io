import React, {useRef ,useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';
import bo from './components/bo.jpg'
//import React, { useRef, useState } from "react";
//import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import './App.css';
//import "./styles.css";

const words = ['covid19','halfdollar','bicycle','playingcards','doublelift','retention','keycard','diagonalpalmshift','buffer'];
//let selectedWord = words[Math.floor(Math.random() * words.length)];
var selectedWord = words[0];


function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [win, setWin] = useState(false)
  const [number, setNumber] = useState(0)

  const onChange = input => {
    let tmp = input[input.length - 1]
    console.log(tmp)
    setInput(tmp);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };
  useEffect(() => {
      if (playable && ((input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122)||(input.charCodeAt(0)>=48 && input.charCodeAt(0)<=57))) {
        const letter = input.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
        
      }
  }, [input, playable]);
  // useEffect(() => {
  //   const handleKeydown = event => {
  //     const { key, keyCode } = event;
  //     if (playable && keyCode >= 65 && keyCode <= 90) {
  //       const letter = key.toLowerCase();
  //       if (selectedWord.includes(letter)) {
  //         if (!correctLetters.includes(letter)) {
  //           setCorrectLetters(currentLetters => [...currentLetters, letter]);
  //         } else {
  //           show(setShowNotification);
  //         }
  //       } else {
  //         if (!wrongLetters.includes(letter)) {
  //           setWrongLetters(currentLetters => [...currentLetters, letter]);
  //         } else {
  //           show(setShowNotification);
  //         }
  //       }
  //     }
  //   }
  //   window.addEventListener('keydown', handleKeydown);

  //   return () => window.removeEventListener('keydown', handleKeydown);
  // }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    let tmp = number + 1
    setCorrectLetters([]);
    setWrongLetters([]);
    setInput('')
    setNumber(tmp)
    const random = Math.floor(Math.random() * words.length);
    try{
      selectedWord = words[tmp];
    }
    catch{
      setNumber(0)
      selectedWord = words[0];
    }
  }

  return (
    <div className='App'>
      
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        {/* <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      /> */}
      
      </div>
      <Keyboard
        //keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        />
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} win = {win} setWin = {setWin} />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
