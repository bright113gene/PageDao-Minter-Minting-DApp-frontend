import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import config from "../constant/config.json"
import { setConnection, setAccountChanged, setChainChanged } from "../redux/wallet/wallet.slice"
import {getTreeRoot} from "../utils/MerkleTree"

const cID = config.NETWORK.ID;

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            chainId: cID,
            rpc: {
                cID: config.NETWORK.URL,
            },
            network: config.NETWORK.NAME,
        },
    },
    injected: {
        package: null
    },
}

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions
})

export const defaultWeb3 = new Web3(new Web3.providers.HttpProvider(config.NETWORK.URL))

export const onConnect = async (dispatch) => {
    try {
        console.log(getTreeRoot())
        const _provider = await web3Modal.connect()
        const _web3 = new Web3(_provider)
        let _account = _provider.selectedAddress
        let _chainId = Number(_provider.chainId)
        dispatch(setConnection({ _web3, _provider, _account, _chainId }))
        _provider.on("accountsChanged", (accounts) => {
            dispatch(setAccountChanged(accounts[0]))
        });

        _provider.on("chainChanged", (chainId) => {
            dispatch(setChainChanged(Number(chainId)))
        });
    } catch(err) {
        console.log(err)
    }
}