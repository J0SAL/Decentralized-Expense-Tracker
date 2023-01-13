import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "dotenv/config";
import "./tasks/accounts";
import "@typechain/hardhat";
import "hardhat-deploy";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
  defaultNetwork: "hardhat",
    networks: {
      hardhat: {
        chainId: 31337
      },
      localhost: {
          chainId: 31337,
      },
      goerli: {
          url: GOERLI_RPC_URL,
          accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
          saveDeployments: true,
          chainId: 5,
      },
    },

    solidity: {
      compilers: [
        {
          version: "0.8.7",
        },
      ],
    },

    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },

    namedAccounts: {
      deployer: {
          default: 0, 
      }
  },
};
