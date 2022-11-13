import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";
import { task, HardhatUserConfig } from "hardhat/config"
import "./tasks/accounts"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"

module.exports = {
  defaultNetwork: "hardhat",
    networks: {
      hardhat: {
        chainId: 31337,
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
};
