// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ExpenseTracker{
    enum TransactionType{ INCOME, EXPENSE }
    struct Transaction{
        TransactionType t_type;
        string t_disc;
        uint256 t_amount;
    }
    mapping(address => Transaction[]) private transactions;

    function addExpense(uint amount, string memory desc) public {
        transactions[msg.sender].push(Transaction(
            TransactionType.EXPENSE,
            desc,
            amount
        ));
    }
    function addIncome(uint amount, string memory desc) public {
        transactions[msg.sender].push(Transaction(
            TransactionType.INCOME,
            desc,
            amount
        ));
    }
    function getUserTransactions() public view returns (Transaction[] memory){
        return transactions[msg.sender];
    }
    function getUserTransactionsLen() public view returns (uint){
        return transactions[msg.sender].length;
    }

    // get total user income 
    // get total user expense
    // reset income and expense after end of the month
    // monthly total transactions
    // monthly get total user income 
    // monthly get total user expense
}