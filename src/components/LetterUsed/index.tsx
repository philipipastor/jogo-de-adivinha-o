import { Letter } from "../Letter/index"
import styles from "./style.module.css"


export function LetterUsed(){
    return (
        <div className = {styles.letterUsed}>
            <h5>Letras utilizadas</h5>

            <div>
                <span><Letter value="x" size="small" color="wrong"/></span>
                <span><Letter value="x" size="small" color="correct"/></span>

            </div>
        </div>
    )
}