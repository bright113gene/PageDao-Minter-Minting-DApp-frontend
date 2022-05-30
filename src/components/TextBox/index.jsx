import React, { useState } from "react";

import { useResize } from "../../utils/Helper";
import styles from './TextBox.module.scss'

export const TextBox = (props) => {

    const { isMobile } = useResize()
    const [more, setMore] = useState(false)

    return (
        <div className={styles.div}>
            <div className={styles.box}>
                <h2>{props.text.title}</h2>
                {!isMobile && <p>{props.text.content}</p>}
                {isMobile && <p>{more ? props.text.content : props.text.content_mob}
                    <span onClick={() => { setMore(!more) }}>{more ? "(Less)" : "(View more)"}</span></p>}
            </div>
        </div>
    )
}