import React, { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { First } from "./First"
import CustomizedSnackbars from "../../components/SnackBar"
import styles from './Home.module.scss'
import { useSelector } from "react-redux"
import { onConnect } from "../../utils/WalletConnect"
import { useDispatch } from "react-redux"
import { getTreeRoot } from "../../utils/MerkleTree"

const Home = () => {
    const wallet = useSelector((state) => state.wallet)
    const dispatch = useDispatch()
    const [notice, setNotice] = useState({ type: "", msg: "", show: false })

    useEffect(() => {
        console.log('root:', getTreeRoot())
    }, [])

    return (
        <div className={styles.home}>
            <CustomizedSnackbars notice={notice} setNotice={setNotice} />
            <Header account={wallet.account}
                chainId={wallet.chainId}
                setNotice={setNotice}
                handleClick={() => onConnect(dispatch)} />
            <First web3={wallet.web3}
                account={wallet.account}
                chainId={wallet.chainId}
                setNotice={setNotice} />
        </div>
    )
}

export default Home;