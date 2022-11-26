import { ethers, run, network } from "hardhat"

async function main() {
    const ExpenseTrackerFactory = await ethers.getContractFactory("ExpenseTracker")
    console.log("Deploying contract...")
    const expenseTracker = await ExpenseTrackerFactory.deploy()
    await expenseTracker.deployed()
    console.log("Contract deployed to:", expenseTracker.address)


    // verifying the contract on test net
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await expenseTracker.deployTransaction.wait(6)
        await verify(expenseTracker.address, [])
    }

    console.log(`Current transactions: ${Number(await expenseTracker.getUserTransactionsLen())}`);

    // adding expense
    const transactionResponse1 = await expenseTracker.addExpense(10, "party", 13112022);
    // waiting for 1 block confirmation
    await transactionResponse1.wait(1);
    
    // adding salary
    const transactionResponse2 = await expenseTracker.addIncome(10, "salary", 14112022);
    // waiting for 1 block confirmation
    await transactionResponse2.wait(1);

    // getting all transaction length
    console.log(`Updated transactions: ${await expenseTracker.getUserTransactionsLen()}`);
    
    // getting all transactions
    console.log(await expenseTracker.getUserTransactions());
}

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...")
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      })
    } catch (e: any) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!")
      } else {
        console.log(e)
      }
    }
  }

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
