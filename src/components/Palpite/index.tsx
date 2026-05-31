import styles from "./style.module.css"

import { Input } from "../Input/index"
import { Button} from "../Button/index"

export function Palpite(){
    return (
        <div>
            <h4>Palpite</h4>
        
            <div className= {styles.guess}>
                <Input/>
                <Button title="Confirmar"/>
            </div>
        </div>
    )
}