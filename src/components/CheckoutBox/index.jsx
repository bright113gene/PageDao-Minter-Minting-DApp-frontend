import React from "react"

import { getImg, useResize } from "../../utils/Helper"
import { Button } from "../Button"
// import { getTreeRoot } from "../../utils/MerkleTree"
import config from "../../constant/config.json"
import styles from "./CheckoutBox.module.scss"

export const CheckoutBox = ({ supply, account, chainId, handleClick }) => {

    const { isMobile } = useResize()
    const buttonHeight = isMobile ? 46 : 72
    let title = `Mint Price : ${config.DISPLAY_COST} ${config.NETWORK.SYMBOL}.`

    return (
        <div className={styles.div}>

            <div className={styles.text} style={{ textAlign: 'center' }}>
                {title}
            </div>
            <div className={styles.copy}>
                <img src={getImg('icon/copy.png')} alt="copy" />
                <label>Available</label>
                <p>{supply} <span>/ {config.MAX_SUPPLY}</span></p>
            </div>
            <Button onClick={handleClick}
                active
                value="Mint"
                disabled={account === null || chainId !== config.NETWORK.ID}
                style={{ width: '100%', height: buttonHeight }} />
        </div>
    )
}