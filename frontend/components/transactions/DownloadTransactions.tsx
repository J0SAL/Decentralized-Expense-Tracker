import React from "react";
import { Button } from "react-bootstrap";
import { exportExcel } from "../../utils/exportExcel";
import { Transaction } from "./TransactionList";
import { BsDownload } from "react-icons/bs";

function DownloadTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const handleClick = () => {
    exportExcel(transactions);
  };
  return (
    <Button onClick={handleClick} className="btn-sm btn-primary">
      Download <BsDownload />
    </Button>
  );
}

export default DownloadTransactions;
