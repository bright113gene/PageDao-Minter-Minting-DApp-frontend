import { generateTree, getProofFromHexLeaf, getTreeRoot, isWhitelisted } from "./MerkleTree"
import abi from "../constant/abi.json"
import config from "../constant/config.json"
import keccak256 from 'keccak256'
import { defaultWeb3 } from "./WalletConnect"

export const getContract = (web3) => {
    return new web3.eth.Contract(abi, config.CONTRACT_ADDRESS)
}

export const getTotalSupply = async (contract) => {
    return await contract.methods.totalSupply().call()
}

export const balanceOf = async (contract, account) => {
    return await contract.methods.balanceOf(account).call()
}

export const currentState = async () => {
    const contract = getContract(defaultWeb3)
    const presalets = await contract.methods.preSaleTimestamp().call()
    const publicsalets = await contract.methods.publicSaleTimestamp().call()
    console.log('timestamp:', presalets, publicsalets)
    const time = Math.round((new Date()).getTime() / 1000);
    return time < presalets ? -1 : time < publicsalets ? 0 : 1;
}

export const mint = async (contract, account) => {
    const cst = await currentState()
    if (cst === 0) {
        // const proof = getProofFromHexLeaf(account)
        // console.log('proof:', proof, account)
        // const root = getTreeRoot()
        // const leaf = keccak256(account)
        // console.log('root leaf:', root, leaf)
        const _tree = generateTree()
        console.log("_tree", _tree)
        let _root = getTreeRoot(_tree)
        console.log("_root", _root)
        // _root = _root.substring(0, _root.length - 1) + 'a'
        console.log("_root", _root)
        const _leaf = keccak256(account)
        console.log("_leaf", _leaf)
        const _proof = _tree.getHexProof(_leaf)
        console.log("_proof", _proof)
        console.log("verified: ", _tree.verify(_proof, _leaf, _root));
        console.log('calling minting:', account, config.WEI_COST)
        console.log('current presale time:', await contract.methods.preSaleTimestamp().call())
        try {
            console.log('calling from account:', account)
            await contract.methods.whitelistMint(_proof).send({
                from: account,
                value: config.WEI_COST
            })
        } catch (err) {
            console.log('error:', err)
        }
    } else if (cst === 1) {
        try {
            await contract.methods.mint().send({
                from: account,
                value: config.WEI_COST
            })
        } catch (err) {
            console.log('error:', err)
        }
    } else {
        console.log('presale not started')
    }
}