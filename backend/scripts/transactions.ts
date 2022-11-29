import { ethers, getNamedAccounts, deployments } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()
    const expenseTracker = await ethers.getContract("ExpenseTracker", deployer)
    console.log(`Got contract ${expenseTracker.address}`)

    console.log("All transactions...")
    console.log(`Total Transactions: ${await expenseTracker.getUserTransactionsLen()}`);
    console.log(await expenseTracker.getUserTransactions());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })