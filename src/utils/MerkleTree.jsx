import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import whitelistMember from '../constant/whitelist.json'

export const generateTree = () => {
    const tree = new MerkleTree(whitelistMember, keccak256, {
        hashLeaves: true,
        sortPairs: true,
    })
    return tree
};

export const getTreeRoot = () => {
    return generateTree().getRoot().toString('hex')
}

export const getProofFromHexLeaf = (address) => {
    const tree = generateTree()
    const hash = keccak256(address)
    const proof = tree.getHexProof(hash)
    return proof
};

export const isWhitelisted = (address) => {
    console.log("checking:", address)
    const tree = generateTree()
    const root = getTreeRoot()
    const leaf = keccak256(address)
    const proof = tree.getProof(leaf)
    console.log('proof:', proof)
    console.log('leaf:', leaf)
    console.log('root:', root)
    console.log('verifying:', tree.verify(proof, leaf, root))
    return tree.verify(proof, leaf, root)
}