
function addChain(){
    ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{ 
            chainId: web3.utils.toHex('137'),
            chainName: 'Polygon',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://www.polygonscan.com']
        }],
    })
    .then(() => console.log('network added'))
    .catch(() => console.log('could not add network'))
}

function switchChain() {
    ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex('137') }],
        })
        .then(() => console.log('network has been set'))
        .catch((e) => {
            if (e.code === 4902) {
               console.log('network is not available, add it')
            } else {
               console.log('could not set network')
            }
        })
}