// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./src/contracts",
    tests: "./src/contracts/__tests__",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
