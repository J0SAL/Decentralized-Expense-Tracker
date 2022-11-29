import { frontEndContractsFile, frontEndAbiFile } from "../helper-hardhat-config"
import { network, ethers } from "hardhat"
import { readFileSync, writeFileSync } from "fs"

//this is const async arrow function
const main = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

// update api
async function updateAbi() {
    const expenseTracker: any = await ethers.getContract("ExpenseTracker")
    writeFileSync(frontEndAbiFile, expenseTracker.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const expenseTracker = await ethers.getContract("ExpenseTracker")
    const contractAddresses = JSON.parse(readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId!.toString() in contractAddresses) {
        if (
            !contractAddresses[network.config.chainId!.toString()].includes(expenseTracker.address)
        ) {
            contractAddresses[network.config.chainId!.toString()].push(expenseTracker.address)
        }
    } else {
        contractAddresses[network.config.chainId!.toString()] = [expenseTracker.address]
    }
    writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

export default main
main.tags = ["storage"]