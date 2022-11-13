import { ethers, run, network } from "hardhat"

async function main() {
    const ExpenseTrackerFactory = await ethers.getContractFactory("ExpenseTracker")
    console.log("Deploying contract...")
    const expenseStorage = await ExpenseTrackerFactory.deploy()
    await expenseStorage.deployed()
    console.log("Contract deployed to:", expenseStorage.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
