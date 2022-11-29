import { ethers, getNamedAccounts } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()
    const expenseTracker = await ethers.getContract("ExpenseTracker", deployer)
    console.log(`Got contract ${expenseTracker.address}`)

    console.log("Adding Expense...")
    const transactionResponse = await expenseTracker.addExpense(10, "party", 13112022)
    await transactionResponse.wait(1)

    console.log("Added Expense")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })