import styles from "./style.module.css"

export function Input(){
    return (
        <input type="text" className={styles.input} autoFocus maxLength={1} placeholder="?"/>
    )
}