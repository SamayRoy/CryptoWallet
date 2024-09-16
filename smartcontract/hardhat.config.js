//https://eth-sepolia.g.alchemy.com/v2/lodHdeYIhnSdmrfmdlmtiq9M_HqgJcYJ

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-sepolia.g.alchemy.com/v2/lodHdeYIhnSdmrfmdlmtiq9M_HqgJcYJ",
        accounts: ["614419d499c632e273461263ca48f395602d9eb5a4e33c825a2e85f0f892e622"]
      }
    }
  }
};
