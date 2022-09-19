require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");

const ALCHEMY_API_KEY_URL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_URL}`;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
};