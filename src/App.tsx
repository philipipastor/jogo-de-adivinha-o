import { Header } from "./components/Header/index"
import { Tip } from "./components/Tip/index"
import { Palpite } from "./components/Palpite"
import { Letter } from "./components/Letter"
import { LetterUsed, type LetterUsedProps } from "./components/LetterUsed"

import {WORDS, type Challenge } from "./utils/words"
import { useEffect, useState } from "react"

import styles from "./app.module.css"

export default function App(){

  const [attempts, setattempts] = useState(0)
  const [letterUsed, setletterUsed] = useState<LetterUsedProps[]>([])
  const [letter, setLetter] = useState("")
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  function handleRestart(){
    alert("Reiniciar o jogo!")
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)

    setattempts(0) 
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
        <Header current={attempts} max={10} onRestart={handleRestart}/>
        
        <Tip textoDica={"teste"}/>
        
        <div className={styles.word}>
          {
            challenge.word.split("").map(() => (
              <Letter value="" />
            ))
          }

        </div>

        <Palpite />

        <div>
          <LetterUsed data={letterUsed}/>
        </div>
      </main>
    </div>
  )
}