import { useCallback,useEffect,useState } from 'react'
import {wordList}   from './data/Words'

import './App.css'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'


const stages = [ 
  {id: 0, name: 'Start'},
  {id: 1, name: 'game'},
  {id: 2, name: 'End'}
]


function App() {

  const [stage, setStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const pickWordAndCategory = () =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }


  const startGame = ()  => {
    const {word,category} = pickWordAndCategory()

    let letters = word.split('')
    letters = letters.map((l) => l.toLowerCase())

    console.log(word, category)
    console.log(letters)

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)
    
    setStage(stages[1].name)
  }

  const verifyLetter = ()  =>{
    setStage(stages[2].name)
  }

  const retry = () => {
    setStage(stages[0].name)
  }

  return (
    <div className="App">
        {stage === 'Start' && <StartScreen startGame={startGame} />}
        {stage === 'game' &&<Game verifyLetter = {verifyLetter}/>}
        {stage === 'End' && <GameOver retry ={retry}/>}
    </div>
  )
}

export default App
