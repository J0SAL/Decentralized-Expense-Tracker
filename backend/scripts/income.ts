import { ethers, getNamedAccounts } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()
    const expenseTracker = await ethers.getContract("ExpenseTracker", deployer)
    console.log(`Got contract ${expenseTracker.address}`)

    console.log("Adding Income...")
    const transactionResponse = await expenseTracker.addIncome(10, "internship", 13112022)
    await transactionResponse.wait(1)

    console.log("Added Income")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
