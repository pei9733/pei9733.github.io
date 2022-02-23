import React, { useEffect,useState } from 'react';
import { checkWin } from '../helpers/helpers';
import HEAD from './bo.jpg'
import like from './like.jpg'

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, win,setWin}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;
  let WIN = false;
  

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulations! You won! 😃';
    playable = false;
    WIN = true;
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = 'Unfortunately you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
    WIN = false;
  }

  useEffect(() => {
    setPlayable(playable);
    setWin(WIN)
  });

  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        {win?<img src = {like} />:<img src = {HEAD} />}
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default Popup
