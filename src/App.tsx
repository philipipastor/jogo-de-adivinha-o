import { Header } from "./components/Header/index"
import { Tip } from "./components/Tip/index"
import { Input } from "./components/Input/index"
import { Button} from "./components/Button/index"
import { Letter } from "./components/Letter"
import { LetterUsed, type LetterUsedProps } from "./components/LetterUsed"

import {WORDS, type Challenge } from "./utils/words"
import { useEffect, useState } from "react"

import styles from "./app.module.css"

export default function App(){

  const [attempts, setAttempts] = useState(0)
  const [letterUsed, setLetterUsed] = useState<LetterUsedProps[]>([])
  const [letter, setLetter] = useState("")
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  const attemptsLimit = 5

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)

    setAttempts(0) 
    setLetter("")
    setLetterUsed([])

  }

  function handleRestart() {
    const confirmRestart = window.confirm("Tem certeza que deseja reiniciar o jogo?")

    if(confirmRestart){
      startGame()
    }
  }
  
  function handleConfirm(){

    if(!challenge){
      return
    }

    if(!letter.trim()) {
      alert("Digite uma letra!")
      return
    }

    const value = letter.toUpperCase()

    if(letterUsed.find(used => used.value.toUpperCase() === value)){
      alert("Você já usou essa letra!")
      return
    }
    
    const correct = challenge.word.toUpperCase().includes(value)

    
    setAttempts(attempts + 1)
    

    if(attempts >= challenge.word.length + attemptsLimit ) {
      alert("Você perdeu, o jogo será reiniciado")
      startGame()
      return
    }

    setLetterUsed((prevState) => [...prevState, {value, correct: correct}])

    setLetter("")

  }

  useEffect(() => {
    startGame()
  }, [])

  if(!challenge){
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={challenge.word.length + attemptsLimit} onRestart={handleRestart}/>
        
        <Tip textoDica={challenge.tip}/>
        
        <div className={styles.word}>
        {
          challenge.word.split("").map((letter, index) => {
            const letterCorrect = letterUsed.some(
              used => used.value.toUpperCase() === letter.toUpperCase() && used.correct
            )

            return (
              <Letter key={index} value={letterCorrect ? letter : ""} color={letterCorrect ? "correct" : "default"}/>
            )
          })
        }
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?" value={letter} onChange= {(event) => setLetter(event.target.value)}/>
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <div>
          <LetterUsed data={letterUsed}/>
        </div>
      </main>
    </div>
  )
}