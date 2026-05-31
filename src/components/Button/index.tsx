import style from "./style.module.css"

type Props = {
    title: string
}

export function Button({title}: Props){
    return(
        <button type="button" className={style.button}>{title}</button>
    )
}