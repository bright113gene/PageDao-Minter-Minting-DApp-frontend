import React, { useState, useEffect } from "react";

import { getImg, useResize } from "../../../utils/Helper";
import styles from "./First.module.scss";
import config from "../../../constant/config.json";
import { TextBox } from "../../../components/TextBox";
import { CheckoutBox } from "../../../components/CheckoutBox";
import { defaultWeb3 } from "../../../utils/WalletConnect";
import { currentState, balanceOf, getContract, getTotalSupply, mint } from "../../../utils/CallContract";
import { isWhitelisted } from "../../../utils/MerkleTree";
import { generateTree, getTreeRoot } from "../../../utils/MerkleTree";
import keccak256 from "keccak256";

const text = {
  "title": "ETHOMES",
  "content": "ETHomes is one of the first NFTs based on virtual real estate. Our collection will have 8,000 NFTs - each home will have unique qualities. Our goal is to bring something fresh and distinctive to the NFT space. ETHomes designs and concepts are able to fit a wide range of styles and tastes.",
  "content_mob": "ETHomes is one of the first NFTs based on virtual real estate. Our collection will have ..."
}

const contract = getContract(defaultWeb3)

export const First = ({ web3, account, chainId, setNotice }) => {
  const { isMobile } = useResize()
  const [supply, setSupply] = useState(0)

  const handleClick = async () => {
    console.log('clicked')
    if (supply >= config.MAX_SUPPLY) {
      setNotice({ type: "warning", msg: "All tokens have been minted", show: true })
    }
    const balance = await balanceOf(contract, account)
    if (await currentState() === -1) {
      console.log('presale not started in index.js')
      setNotice({ type: "warning", msg: "Presale not live", show: true })
      return
    } else if (await currentState() === 0) {
      console.log('presale started')
      if (!isWhitelisted(account)) {
        setNotice({ type: "warning", msg: "Not on whitelist", show: true })
        return
      }
      else if (balance >= 3) {
        setNotice({ type: "warning", msg: "Maximum of 3 per address allowed at pre sale", show: true })
        return
      }
      else if (supply >= config.MAX_PRESALE) {
        setNotice({ type: "warning", msg: "Minting would exceed total pre sale mint allocation", show: true })
        return
      }
    } else if (currentState() === 1) {
      if (balance >= 8) {
        setNotice({ type: "warning", msg: "Maximum of 8 tokens per wallet", show: true })
        return
      }
    }
    try {
      await mint(getContract(web3), account)
    } catch (err) {
      console.log('error:', err)
    }
    getTotalSupply(contract, account).then(res => {
      setSupply(res)
    })
  }

  useEffect(() => {
    getTotalSupply(contract, account).then(res => {
      setSupply(res)
    })
  }, [account])

  return (
    <div className={styles.home}>
      <div className={styles.first}>
        {/* {!isMobile && <img style={{ height: height1 + 'px', width: width1 + 'px' }} className={styles.bg} src={getImg('home/bg.png')} alt="press" />} */}

        <div className="container">
          <div className={styles.container}>
            <div className={styles.text} >
              <TextBox text={text} />
            </div>
            <img className={styles.eagle} src={getImg('home/Container_Home1.jpg')} alt="eagle" />
            <div className={styles.checkout}>
              <CheckoutBox supply={supply} account={account} chainId={chainId} handleClick={handleClick} />
            </div>
            <div className={styles.pdf}>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}