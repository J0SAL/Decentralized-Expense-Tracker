export interface networkConfigInfo {
    [key: string]: {
        name?: string
        blockConfirmations?: number
    }
}

export const networkConfig: networkConfigInfo = {
    default: {
        name: "hardhat",
        blockConfirmations: 0,
    },
    31337: {
        name: "localhost",
        blockConfirmations: 0,
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

export const frontEndContractsFile = "../frontend/constants/contractAddresses.json"
export const frontEndAbiFile = "../frontend/constants/abi.json"

export const developmentChains = ["hardhat", "localhost"]
