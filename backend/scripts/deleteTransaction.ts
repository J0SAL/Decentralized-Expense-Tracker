import { ethers, getNamedAccounts } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()
    const expenseTracker = await ethers.getContract("ExpenseTracker", deployer)
    console.log(`Got contract ${expenseTracker.address}`)

    console.log("Deleting Transaction...")
    const transactionResponse = await expenseTracker.deleteTransaction("id-e-01")
    await transactionResponse.wait(1)

    console.log("Deleted Transaction")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })