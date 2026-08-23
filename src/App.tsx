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

  const [discoveredLetters, setdiscoveredLetters] = useState(0)
  const [letterUsed, setLetterUsed] = useState<LetterUsedProps[]>([])
  const [letter, setLetter] = useState("")
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [shake, setChake] = useState(false)

  const attemptsLimit = 5

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)

    setdiscoveredLetters(0) 
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
      alert("Você já usou essa letra!" + value)
      return
    }
    
    const correct = challenge.word.toUpperCase().includes(value)

    const hits = challenge.word.toUpperCase().split("").filter((char) => char === value).length
  
    setLetterUsed((prevState) => [...prevState, {value, correct: correct}])
    setdiscoveredLetters(discoveredLetters + hits)
    console.log(discoveredLetters)
    setLetter("")

    if(!correct) {
      setChake(true)
      setTimeout(() => setChake(false), 300);
    }
  }

  function endGame(message: string){
    alert(message)
    startGame()
  }

  useEffect(() => {
    startGame()
  }, [])

    useEffect(() => {
    if (!challenge) {
      return
    }
    setTimeout(() => {
      if (discoveredLetters === challenge.word.length) {
        return endGame("Parabéns, você descobriu a palavra!")
      } else if (letterUsed.length >= challenge.word.length + attemptsLimit) {
        return endGame("Que pena, você usou todas as tentativas!")
      }
    }, 200)
  }, [discoveredLetters, letterUsed.length])

  if(!challenge){
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={letterUsed.length} max={challenge.word.length + attemptsLimit} onRestart={handleRestart}/>
        
        <Tip textoDica={challenge.tip}/>
        
        <div className={`${styles.word} ${shake && styles.shake}`}>
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