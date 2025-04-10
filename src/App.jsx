import { useCallback, useEffect, useState } from 'react'
import { wordList } from './data/Words'

import './App.css'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'


const stages = [
  { id: 0, name: 'Start' },
  { id: 1, name: 'game' },
  { id: 2, name: 'End' }
]


function App() {

  const [stage, setStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }


  const startGame = () => {
    const { word, category } = pickWordAndCategory();

    let letters = word.split('');
    letters = letters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);

    setStage(stages[1].name);
  }

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    } 
    
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);

    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    
    if(guesses <= 0){
      clearLetterStates();
      setStage(stages[2].name);
    }

  } , [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length) {
      clearLetterStates();
      setScore((actualScore) => actualScore + 100);
      startGame();
    }

  },[guessedLetters,letters,startGame]);


  const retry = () => {
    setScore(0)
    setGuesses(3)
    setStage(stages[0].name);
  }

  return (
    <div className="App">
      {stage === 'Start' && <StartScreen startGame={startGame} />}
      {stage === 'game' && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {stage === 'End' && <GameOver retry={retry}  score={score} />}
    </div>
  )
}

export default App
