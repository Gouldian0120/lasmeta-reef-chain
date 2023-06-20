const {expect} = require("chai");
const {ethers} = require("hardhat");

const {fs} = require("fs");
const keccak256 = require("keccak256");
const {MerkleTree} = require("merkletreejs");
const {whiteList} = require("./whitelist");

describe("CoralwaveReefLasMeta", function() {
    let owner, addr1, addr2, addr3;
    let CONTACT, contract;
    let tree;

    it("Deploy contract", async function() {
        CONTACT = await ethers.getContractFactory("CoralwaveReefLasMeta");
        contract = await CONTACT.deploy();
        await contract.deployed();
    })
    it("Setting address", async function() {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
    })
    it("Set merkle tree for whitelists", async function() {
        let leaves = whiteList.map(addr => keccak256(addr));
        tree = new MerkleTree(leaves, keccak256, {sort: true});
        let root = tree.getRoot().toString("hex");
        await contract.setMerkleRoot(tree.getHexRoot());
    })
    it("Set config for minting", async function() {
        await contract.setEnableMint(true);
    })
    it("Mint(free mint) by a member(addr1) of the whitelist)", async function() {
        let leaf = keccak256(addr1.address);
        let proof = tree.getHexProof(leaf);
        let tx = await contract.connect(addr1).mint(proof);
        let txx = await tx.wait();
    })
    it("Mint(whitelist mint) by a member(addr2) of the whitelist)", async function() {
        let leaf = keccak256(addr1.address);
        let proof = tree.getHexProof(leaf);
        let tx = await contract.connect(addr1).mint(proof, {value: ethers.utils.parseEther("20")});
        let txx = await tx.wait();
    })
    it("Mint(free mint) by a member(addr2) of the whitelist)", async function() {
        let leaf = keccak256(addr2.address);
        let proof = tree.getHexProof(leaf);
        let tx = await contract.connect(addr2).mint(proof);
        let txx = await tx.wait();
    })
    it("Mint public by addr3", async function() {
        let leaf = keccak256(addr3.address);
        let proof = tree.getHexProof(leaf);
        let tx = await contract.connect(addr3).mint(proof, {value: ethers.utils.parseEther("30")});
    })
    it("Balance", async function() {
        console.log("Contract balance (addr1):", await contract.balanceOf(addr1.address));
        console.log("Contract balance (addr2):", await contract.balanceOf(addr2.address));
        console.log("Contract balance (addr3):", await contract.balanceOf(addr3.address));
    })
})