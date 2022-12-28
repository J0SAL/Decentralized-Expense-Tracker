import { ethers, getNamedAccounts } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()
    const expenseTracker = await ethers.getContract("ExpenseTracker", deployer)
    console.log(`Got contract ${expenseTracker.address}`)

    console.log("Adding Expense...")
    const transactionResponse = await expenseTracker.addExpense("id-e-01",10020, "shoes shoping", "12-Dec-2022", "shopping")
    await transactionResponse.wait(1)

    console.log("Added Expense")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })