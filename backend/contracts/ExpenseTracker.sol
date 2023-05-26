// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ExpenseTracker {
    struct Transaction {
        bytes32 id;
        uint32 ttype; // 0 for INCOME, 1 for EXPENSE
        string category;
        string description;
        uint256 amount;
        string date;
    }

    struct Tracker {
        uint256 total;
        uint256 deleted;
        bytes32[] transactions;
    }

    mapping(address => mapping(bytes32 => Transaction)) private transactions;
    mapping(address => Tracker) private tracker;

    function addExpense(
        bytes32 _id,
        uint256 _amount,
        string memory _description,
        string memory _date,
        string memory _category
    ) public {
        require(transactions[msg.sender][_id].amount == 0, "Invalid ID");
        
        transactions[msg.sender][_id] = Transaction(
            _id,
            1, // EXPENSE
            _category,
            _description,
            _amount,
            _date
        );
        
        tracker[msg.sender].total += 1;
        tracker[msg.sender].transactions.push(_id);
    }

    function addIncome(
        bytes32 _id,
        uint256 _amount,
        string memory _description,
        string memory _date,
        string memory _category
    ) public {
        require(transactions[msg.sender][_id].amount == 0, "Invalid ID");
        
        transactions[msg.sender][_id] = Transaction(
            _id,
            0, // INCOME
            _category,
            _description,
            _amount,
            _date
        );
        
        tracker[msg.sender].total += 1;
        tracker[msg.sender].transactions.push(_id);
    }

    function deleteTransaction(bytes32 id) public {
        require(transactions[msg.sender][id].amount > 0, "Transaction does not exist");
        require(tracker[msg.sender].deleted < tracker[msg.sender].total, "All transactions already deleted");
        
        if (transactions[msg.sender][id].amount > 0) {
            delete transactions[msg.sender][id];
            tracker[msg.sender].deleted += 1;
        }
    }

    function getUserTransactions() public view returns (Transaction[] memory) {
        uint256 n = tracker[msg.sender].total - tracker[msg.sender].deleted;
        Transaction[] memory res = new Transaction[](n);
        uint256 count = 0;
        
        for (uint256 i = 0; i < tracker[msg.sender].transactions.length; ++i) {
            bytes32 id = tracker[msg.sender].transactions[i];
            if (transactions[msg.sender][id].amount > 0) {
                res[count] = transactions[msg.sender][id];
                count += 1;
            }
        }
        
        return res;
    }

    function getUserTransactionsLen() public view returns (uint256) {
        return tracker[msg.sender].total - tracker[msg.sender].deleted;
    }
}
