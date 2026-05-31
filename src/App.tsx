import { Header } from "./components/Header/index"
import { Tip } from "./components/Tip/index"
import { Palpite } from "./components/Palpite"
import { Letter } from "./components/Letter"

import styles from "./app.module.css"

export default function App(){
  function handleRestart(){
    alert("Reiniciar o jogo!")
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestart}/>
        
        <Tip textoDica={"teste"}/>
        
        <div className={styles.word}>
          <Letter value="R"/>
          <Letter value="E"/>
          <Letter value="A"/>
          <Letter value="A"/>
          <Letter value="C"/>
          <Letter value="T"/>
        </div>

        <Palpite />

      </main>
    </div>
  )
}