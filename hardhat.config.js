require("dotenv").config()
require("@reef-defi/hardhat-reef")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "reef",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      forking: {
        url: "wss://rpc.reefscan.com/ws",
      }
    },
    reef: {
      url: "ws://substrate-node:9944",
      scanUrl: "<http://api:8000>",
    },
    reef_testnet: {
      url: "wss://rpc-testnet.reefscan.info/ws",
      scanUrl: "https://api-testnet.reefscan.info", 
      // url: "wss://rpc-testnet.reefscan.info/ws",
      // scanUrl: "https://testnet.reefscan.info",
      seeds: {
        testnet_account: `${process.env.MNEMONIC_SEEDS}`, // SEED GOES HERE
      },
      timeout: 200000,
    },
    reef_mainnet: {
      // url: "wss://rpc.reefscan.info/ws",
      // scanUrl: "wss://api.reefscan.info",
      url: "wss://rpc.reefscan.com/ws",
      scanUrl: "https://reefscan.com",
      seeds: {
        mainnet_account: `${process.env.MNEMONIC_SEEDS}`, // SEED GOES HERE
      },
    }
  }
};
