import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"

const deployFundMe: DeployFunction = async function (
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
    })
    console.log(`ExpenseTracker deployed at ${expenseTracker.address}`);
  }
  export default deployFundMe
  