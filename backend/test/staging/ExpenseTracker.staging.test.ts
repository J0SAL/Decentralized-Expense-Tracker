import { expect } from "chai"
import { network, deployments, ethers, getNamedAccounts  } from "hardhat"
import {ExpenseTracker} from "../../typechain-types";
const { developmentChains } = require("../../helper-hardhat-config")

// only for development chains
developmentChains.includes(network.name)
    ? describe.skip
    : describe("ExpenseTracker - staging tests", function() {
    let expenseTracker: ExpenseTracker;
    beforeEach(async () => {
        const { deployer } = await getNamedAccounts()
        await deployments.fixture(["all"]);
        expenseTracker = await ethers.getContract("ExpenseTracker", deployer)
        await expenseTracker.deployed();
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