import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../utils/verify"
import { networkConfig, developmentChains } from "../helper-hardhat-config"

const deployExpenseTracker: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
  ){
    // @ts-ignore
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number = network.config.chainId!;

    console.log(`Deploying on ${network.name} [${chainId}]...`);

    const expenseTracker = await deploy("ExpenseTracker", {
        from: deployer,
        args: [], // if constructor has arguments
        log: true,
        waitConfirmations: networkConfig[chainId].blockConfirmations || 0
    })
    console.log(`ExpenseTracker deployed at ${expenseTracker.address}`);
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      await verify(expenseTracker.address, [])
    }
  }
  export default deployExpenseTracker
  deployExpenseTracker.tags = ["all", "expenseTracker"]