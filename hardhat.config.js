// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  paths: {
    sources: "./src/contracts",
    tests: "./src/contracts/__tests__",
    cache: "./cache",
    artifacts: "./artifacts",
  }
};
