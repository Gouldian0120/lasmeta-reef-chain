
# Get started

## Clone github repository

git clone https://github.com/Gouldian0120/lasmeta-reef-chain.git


## Install dependencies with yarn

yarn


## Setting config

### Define your Reef chain URL in `hardhat.config.js`

### Copy `.env.example` to `.env`

cp .env.example .env

### Update .env with your mnemonic seed


## Adding whitelist

See `scripts/whitelist.js` file or `test/whitelist.js` file

e.g. 

```
const whiteList = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
]
```


## Testing

See `test/` folder

npx hardhat test test/test.js --network reef_testnet


## Deploying and verifying

npx hardhat run scripts/deploy.js --network reef_testnet