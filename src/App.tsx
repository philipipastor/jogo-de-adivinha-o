import { Header } from "./components/Header/index"
import { Tip } from "./components/Tip/index"

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
      </main>
    </div>
  )
}