export interface networkConfigInfo {
    [key: string]: {
        name?: string
        blockConfirmations?: number
    }
}

export const networkConfig: networkConfigInfo = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "hardhat",
    },
    1: {
        name: "mainnet",
        blockConfirmations: 1,
    },
    5: {
        name: "goerli",
        blockConfirmations: 1,
    },
}

export const frontEndContractsFile = "../../constants/contractAddresses.json"
export const frontEndAbiFile = "../../constants/abi.json"

export const developmentChains = ["hardhat", "localhost"]
