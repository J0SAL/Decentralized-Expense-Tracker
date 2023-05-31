// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ExpenseTracker {
    enum TransactionType {
        INCOME,
        EXPENSE
    }
    
    struct Transaction {
        uint256 id;
        TransactionType ttype;
        string category;
        string description;
        uint256 amount;
        string date;
        bool is_deleted;
    }

    struct Tracker {
        uint256 total;
        uint256 deleted;
        uint256 counter;
        mapping(uint256 => string) transactions;
    }

    mapping(address => Tracker) private tracker;
    mapping(string => bool) private all_ids;

    function addExpense(
        uint256 _amount,
        string memory _description,
        string memory _date,
        string memory _category
    ) public {
        require(bytes(_category).length > 0, "category is required");
        require(bytes(_date).length > 0, "date is required");

        uint256 id = tracker[msg.sender].counter;
        tracker[msg.sender].counter += 1;

        Transaction memory expense = Transaction(
            id,
            TransactionType.EXPENSE,
            _category,
            _description,
            _amount,
            _date,
            false
        );
        
        tracker[msg.sender].transactions[id] = _getTransactionId(id);
        all_ids[_getTransactionId(id)] = true;

        tracker[msg.sender].total += 1;
    }

    function addIncome(
        uint256 _amount,
        string memory _description,
        string memory _date,
        string memory _category
    ) public {
        require(bytes(_category).length > 0, "category is required");
        require(bytes(_date).length > 0, "date is required");

        uint256 id = tracker[msg.sender].counter;
        tracker[msg.sender].counter += 1;

        Transaction memory income = Transaction(
            id,
            TransactionType.INCOME,
            _category,
            _description,
            _amount,
            _date,
            false
        );
        
        tracker[msg.sender].transactions[id] = _getTransactionId(id);
        all_ids[_getTransactionId(id)] = true;

        tracker[msg.sender].total += 1;
    }

    function deleteTransaction(uint256 id) public {
        require(tracker[msg.sender].transactions[id] != "", "transaction not found");
        require(!transactions[msg.sender][id].is_deleted, "transaction already deleted");

        transactions[msg.sender][id].is_deleted = true;
        tracker[msg.sender].deleted += 1;
    }

    function getUserTransactions() public view returns (Transaction[] memory) {
        uint256 total = tracker[msg.sender].total;
        uint256 deleted = tracker[msg.sender].deleted;
        uint256 n = total - deleted;

        Transaction[] memory res = new Transaction[](n);
        uint256 count = 0;
        for (uint256 i = 0; i < tracker[msg.sender].counter; i++) {
            if (bytes(tracker[msg.sender].transactions[i]).length > 0 && !transactions[msg.sender][i].is_deleted) {
                res[count] = transactions[msg.sender][i];
                count++;
            }
        }
        return res;
    }

    function getUserTransactionsLen() public view returns (uint256) {
        return tracker[msg.sender].total - tracker[msg.sender].deleted;
    }
    
    function _getTransactionId(uint256 id) private pure returns (string memory) {
        return string(abi.encodePacked("TX-", uintToString(id)));
    }

    function uintToString(uint256 value) private pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
