//https://eth-sepolia.g.alchemy.com/v2/lodHdeYIhnSdmrfmdlmtiq9M_HqgJcYJ

//798931fcc85fb5dc96e4b5041c25b077421f5074bcd51bb86e3eebdefe8da4f4
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-sepolia.g.alchemy.com/v2/lodHdeYIhnSdmrfmdlmtiq9M_HqgJcYJ",
        accounts: ["798931fcc85fb5dc96e4b5041c25b077421f5074bcd51bb86e3eebdefe8da4f4"]
      }
    }
  }
};
