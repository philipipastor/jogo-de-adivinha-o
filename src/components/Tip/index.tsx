import dica from "../../assets/tip.svg"
import styles from "./style.module.css"

type Props = {
    textoDica: string
}

export function Tip({ textoDica }: Props){
    return (
        <div className={styles.tip}>

            <img src={dica} alt="dica" />
            
            <div>
                <h3>Dica</h3>
                <p>{textoDica}</p>
            </div>

        </div>
    )
}