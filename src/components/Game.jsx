import './Game.css'
import { useState, useRef } from 'react'

const Game = ({ verifyLetter, pickedCategory, pickedWord, letters, guessedLetters, wrongLetters, score, guesses }) => {

    const [ letter, setLetter ] = useState('')
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        verifyLetter(letter)
        setLetter('')
        letterInputRef.current.focus()
    }

    return (
        <div className='game'>
            <p className='point'>
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra :</h1>
            <h3 className='tip'>
                Dica Sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativa(s) </p>
            <div className="wordContainer">
                {letters && guessedLetters && letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className='letter'>{letter}</span>
                    ) : (
                        <span key={i} className='blankSquare'></span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='letter' maxLength='1' required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLetterContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.length > 0 ? <span>{wrongLetters.join(', ')}</span> : <span>Nenhuma letra utilizada</span>}
            </div>

        </div>
    )
}

export default Game