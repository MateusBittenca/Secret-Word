import './Game.css'

const Game = ({ verifyLetter, pickedCategory, pickedWord, letters, guessedLetters, wrongLetters,score,guesses }) => 
    {

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
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className='letter'>{letter}</span>
                    ) : (
                        <span key={i} className='blankSquare'></span>
                    )
                ))}
              


            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form>
                    <input type="text" name='letter' maxLength='1' required />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLetterContainer">
                <p>Letras já utilizadas:</p>
                <span>a,</span>
            </div>

        </div>
    )
}

export default Game