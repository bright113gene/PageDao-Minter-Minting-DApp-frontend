import React, { useEffect } from "react";

import { getImg, useResize } from "../../utils/Helper";
import { Button } from "../Button";
import config from "../../constant/config.json"
import styles from './Header.module.scss';

export const Header = (props) => {

    const { isMobile } = useResize()

    const filterAddress = (address) => {
        return address.slice(0, 5) + '...' + address.slice(38, 42)
    }

    useEffect(() => {
        if (props.chainId !== config.NETWORK.ID && props.chainId !== null) {
            props.setNotice({ type: "warning", msg: `Please connect to ${config.NETWORK.NAME} network`, show: true })
        }
    }, [props.chainId])

    return (
        <header>
            <div className="container">
                <div className={styles.div}>
                    <div>
                        <img src={getImg('home/ethlogo.png')} alt="logo" />
                        {/* <h6>NFTBOOK BAZAAR</h6> */}
                    </div>
                    {!isMobile && <Button
                        value={props.account ? filterAddress(props.account) : "Connect"}
                        style={{ width: 170, height: 56 }} white
                        onClick={props.handleClick} ></Button>}
                    {isMobile &&
                        <img src={getImg('icon/wallet.png')} onClick={props.handleClick} alt="wallet" />}
                </div>
            </div>
        </header>
    )
}