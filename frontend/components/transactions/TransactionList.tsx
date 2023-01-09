import React, { useContext } from "react";

import styles from "../../styles/Scrollbar.module.css";
import dataContext from "../../context/DataContext/dataContext";
import TransactionCard from "./TransactionCard";
import DownloadTransactions from "./DownloadTransactions";

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  isDeleted?: boolean;
  type: number;
};
function TransactionList() {
  const { overview, transactions, deleteContractTransaction } =
    useContext(dataContext);

  const handleDelete = (id: string) => {
    deleteContractTransaction({ id: id });
  };
  return (
    <div className="my-5 my-md-0">
      <div className="text-end">
        <DownloadTransactions transactions={transactions} />
      </div>
      <div
        style={{ maxHeight: "68vh", overflowY: "auto", overflowX: "hidden" }}
        className={styles.scrollbar}
      >
        {transactions.map((transaction: Transaction, key: React.Key) => (
          <TransactionCard
            transaction={transaction}
            handleDelete={handleDelete}
            key={key}
          />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
