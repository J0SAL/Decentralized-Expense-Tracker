import { expect } from "chai"
import { network, deployments, ethers, getNamedAccounts } from "hardhat"
import {ExpenseTracker} from "../../typechain-types";
const { developmentChains } = require("../../helper-hardhat-config")

// only for development chains
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("ExpenseTracker - unit tests", function() {
    let expenseTracker: ExpenseTracker;
    beforeEach(async () => {
        // let deployer = (await ethers.getSigners())[0]
        // const {deployer} = await ethers.getNamedSigners()
        const { deployer } = await getNamedAccounts()
        console.log("deployer ",deployer)
        await deployments.fixture(["all"]);
        expenseTracker = await ethers.getContract("ExpenseTracker", deployer)
        await expenseTracker.deployed();
      })

    it("Adding Expense should increment transaction length", async function() {
        const transactionResponse = await expenseTracker.addExpense("ide1", 101, "demo description", "12-Dec-2022", "party");
        await transactionResponse.wait(1);
        expect(await expenseTracker.getUserTransactionsLen()).to.equal(1);
    })

    it("Adding Income should increment transaction length", async function() {
        const transactionResponse = await expenseTracker.addIncome("idi1", 1001, "got first salaray", "01-Dec-2022", "salary");
        await transactionResponse.wait(1);
        expect(await expenseTracker.getUserTransactionsLen()).to.equal(1);
    })

    it("Adding & Deleting transaction", async function() {
        const transactionResponse = await expenseTracker.addIncome("idi1", 1001, "got first salaray", "01-Dec-2022", "salary");
        await transactionResponse.wait(1);
        expect(await expenseTracker.getUserTransactionsLen()).to.equal(1);

        const transactionResponse1 = await expenseTracker.deleteTransaction("idi1");
        await transactionResponse1.wait(1);

        expect(await expenseTracker.getUserTransactionsLen()).to.equal(0);
    })

    it("Adding Income and Expense should increment transaction length", async function() {
        const transactionResponse1 = await expenseTracker.addExpense("ide1", 101, "demo description", "12-Dec-2022", "party");
        await transactionResponse1.wait(1);
        const transactionResponse2 = await expenseTracker.addIncome("idi1", 1001, "got first salaray", "01-Dec-2022", "salary")
        await transactionResponse2.wait(1);
        expect(await expenseTracker.getUserTransactionsLen()).to.equal(2);
    })
    
    it("Add, Delete & Fetch the transaction", async function() {
        const transactionResponse1 = await expenseTracker.addExpense("ide1", 101, "demo description", "12-Dec-2022", "party");
        await transactionResponse1.wait(1);

        const transactionResponse2 = await expenseTracker.addIncome("idi1", 1001, "got first salaray", "01-Dec-2022", "salary")
        await transactionResponse2.wait(1);

        const transactionResponse3 = await expenseTracker.deleteTransaction("idi1");
        await transactionResponse3.wait(1);

        expect(await expenseTracker.getUserTransactionsLen()).to.equal(1);

        const transactions = await expenseTracker.getUserTransactions();
        expect(Number(transactions[0].amount)).to.equal(101);
        expect(transactions[0].category).to.equal("party");
        expect(transactions[0].date).to.equal("12-Dec-2022");
        expect(transactions[0].ttype).to.equal(1);
    })
});