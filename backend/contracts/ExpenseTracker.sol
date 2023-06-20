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
        mapping(uint256 => Transaction) transactions;
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
        require(isValidDateFormat(_date), "invalid date format");
        require(isValidDate(_date), "invalid date");

        uint256 id = tracker[msg.sender].total;

        Transaction memory expense = Transaction(
            id,
            TransactionType.EXPENSE,
            _category,
            _description,
            _amount,
            _date,
            false
        );

        tracker[msg.sender].transactions[id] = expense;
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
        require(isValidDateFormat(_date), "invalid date format");
        require(isValidDate(_date), "invalid date");

        uint256 id = tracker[msg.sender].total;

        Transaction memory income = Transaction(
            id,
            TransactionType.INCOME,
            _category,
            _description,
            _amount,
            _date,
            false
        );

        tracker[msg.sender].transactions[id] = income;
        all_ids[_getTransactionId(id)] = true;

        tracker[msg.sender].total += 1;
    }

    function deleteTransaction(uint256 id) public {
        require(bytes(_getTransactionId(id)).length > 0, "transaction not found");
        require(!tracker[msg.sender].transactions[id].is_deleted, "transaction already deleted");

        tracker[msg.sender].transactions[id].is_deleted = true;
        tracker[msg.sender].deleted += 1;
    }

    function getUserTransactions() public view returns (string[] memory) {
        uint256 total = tracker[msg.sender].total;
        uint256 deleted = tracker[msg.sender].deleted;
        uint256 n = total - deleted;

        string[] memory res = new string[](n);
        uint256 count = 0;
        for (uint256 i = 0; i < total; i++) {
            if (!tracker[msg.sender].transactions[i].is_deleted) {
                res[count] = _getTransactionId(i);
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

    function isValidDateFormat(string memory _date) private pure returns (bool) {
        bytes memory dateBytes = bytes(_date);
        if (dateBytes.length != 10) {
            return false;
        }
        if (dateBytes[4] != "-" || dateBytes[7] != "-") {
            return false;
        }
        for (uint256 i = 0; i < dateBytes.length; i++) {
            if (i == 4 || i == 7) {
                continue;
            }
            if (dateBytes[i] < 48 || dateBytes[i] > 57) {
                return false;
            }
        }
        return true;
    }

    function isValidDate(string memory _date) private view returns (bool) {
        uint256 year = parseYear(_date);
        uint256 month = parseMonth(_date);
        uint256 day = parseDay(_date);
        return isDateValid(year, month, day);
    }

    function parseYear(string memory _date) private pure returns (uint256) {
        bytes memory dateBytes = bytes(_date);
        uint256 year = (uint256(dateBytes[0]) - 48) * 1000 +
            (uint256(dateBytes[1]) - 48) * 100 +
            (uint256(dateBytes[2]) - 48) * 10 +
            (uint256(dateBytes[3]) - 48);
        return year;
    }

    function parseMonth(string memory _date) private pure returns (uint256) {
        bytes memory dateBytes = bytes(_date);
        uint256 month = (uint256(dateBytes[5]) - 48) * 10 + (uint256(dateBytes[6]) - 48);
        return month;
    }

    function parseDay(string memory _date) private pure returns (uint256) {
        bytes memory dateBytes = bytes(_date);
        uint256 day = (uint256(dateBytes[8]) - 48) * 10 + (uint256(dateBytes[9]) - 48);
        return day;
    }

    function isDateValid(uint256 year, uint256 month, uint256 day) private pure returns (bool) {
        if (year < 1970 || year > 2105) {
            return false;
        }
        if (month < 1 || month > 12) {
            return false;
        }
        if (day < 1 || day > daysInMonth(year, month)) {
            return false;
        }
        return true;
    }

    function daysInMonth(uint256 year, uint256 month) private pure returns (uint256) {
        if (month == 2) {
            return isLeapYear(year) ? 29 : 28;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        return 31;
    }

    function isLeapYear(uint256 year) private pure returns (bool) {
        if (year % 400 == 0) {
            return true;
        }
        if (year % 100 == 0) {
            return false;
        }
        if (year % 4 == 0) {
            return true;
        }
        return false;
    }
}
