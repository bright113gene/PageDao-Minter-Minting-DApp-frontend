import React from "react";

import styles from './Button.module.scss'

export const Button = (props) => {
    return (
        <>
            {props.white && <button
                className={styles.white}
                style={props.style}
                onClick={props.onClick}>
                {props.value}
                {props.src && <img src={props.src} alt="icon"/>}
            </button>}
            {props.pink && <button
                className={styles.pink}
                style={props.style}
                onClick={props.onClick}>
                {props.value}
            </button>}
            {props.active && <button
                className={styles.active}
                style={props.style}
                disabled={props.disabled}
                onClick={props.onClick}>
                {props.value}
            </button>}
        </>
    )
}