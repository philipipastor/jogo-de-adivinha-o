import { Letter } from "../Letter/index"
import styles from "./style.module.css"

export type LetterUsedProps = {
    value: string
    correct: boolean
}

type Props = {
    data: LetterUsedProps[] 
}

export function LetterUsed({data}: Props){
    return (
        <div className = {styles.letterUsed}>
            <h5>Letras utilizadas</h5>

            <div>
                {
                    data.map(({value, correct}) => (
                        <Letter key={value}value={value} size="small" color= {correct ? "correct" : "wrong"}/>
                    ))
                }
            </div>
        </div>
    )
}