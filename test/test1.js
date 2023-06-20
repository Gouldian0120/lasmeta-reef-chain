const {expect} = require("chai");
const {reef} = require("hardhat");

const {fs} = require("fs");
const keccak256 = require("keccak256");
const {MerkleTree} = require("merkletreejs");
const {whiteList} = require("./whitelist");

describe("CoralwaveReefLasMeta", function() {
    let owner, addr1, addr2, addr3;
    let CONTACT, contract;
    let deployedContractAddress = "0xfe2963b62e969Fbb754F0B4F7ddDFA0527321eD7";
    let deployer = "0x6a6CB6551EcfF9C1796CE01E4FDf00941f60086f";
    let tree;

    it("Getting contract", async function() {
        contract = await hre.reef.getContractAt("TestNFT721", deployedContractAddress);
        console.log(contract.address);
    })

    it("Set merkle tree for whitelists", async function() {
        let leaves = whiteList.map(addr => keccak256(addr));
        tree = new MerkleTree(leaves, keccak256, {sort: true});
        let root = tree.getRoot().toString("hex");

        let leaf = keccak256(deployer);
        let proof = tree.getHexProof(leaf);

        console.log(proof);
        console.log(reef);
    })

    // it("Mint public", async function() {
    //     let leaf = keccak256(deployer);
    //     let proof = tree.getHexProof(leaf);
    //     let tx = await contract.connect(deployer).mint(proof, {value: reef.utils.parseEther("30")});
        
    // })
})