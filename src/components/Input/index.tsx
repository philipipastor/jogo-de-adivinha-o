import styles from "./style.module.css"

type Props = React.ComponentProps<"input"> &{
    value?: string
}

export function Input({value, ...rest}: Props){
    return (
        <input type="text" className={styles.input} value={value}{...rest}/>
    )
}