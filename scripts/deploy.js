const hre = require('hardhat')
const axios = require('axios');
const keccak256 = require("keccak256");
const {MerkleTree} = require("merkletreejs");
const {whiteList} = require("./whitelist");

async function main() {
    await hre.run("compile");

    // const signer = await hre.reef.getSignerByName("mainnet_account")
    const signer = await hre.reef.getSignerByName("testnet_account")
    await signer.claimDefaultAccount()

    const CoralwaveContract = await hre.reef.getContractFactory("TestNFT721", signer)
    const coralwaveContract = await CoralwaveContract.deploy()
    await coralwaveContract.deployed()

    console.log({
        coralwaveContract_contract_address: coralwaveContract.address,
    })

    const ver_coralwaveContract = await hre.reef.verifyContract(coralwaveContract.address, "TestNFT721", [])
    
    console.log(ver_coralwaveContract);

    let leaves = whiteList.map(addr => keccak256(addr));
    let tree = new MerkleTree(leaves, keccak256, {sort: true});
    let root = tree.getRoot().toString("hex");
    await coralwaveContract.setMerkleRoot(tree.getHexRoot());

    await coralwaveContract.setEnableMint(true);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })