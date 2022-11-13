import { ethers, run, network } from "hardhat"

async function main() {
    const ExpenseTrackerFactory = await ethers.getContractFactory("ExpenseTracker")
    console.log("Deploying contract...")
    const expenseStorage = await ExpenseTrackerFactory.deploy()
    await expenseStorage.deployed()
    console.log("Contract deployed to:", expenseStorage.address)


    // verifying the contract on test net
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await expenseStorage.deployTransaction.wait(6)
        await verify(expenseStorage.address, [])
    }
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
