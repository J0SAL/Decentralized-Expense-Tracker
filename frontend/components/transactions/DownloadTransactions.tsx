import React from "react";
import { Dropdown } from "react-bootstrap";
import { exportExcel } from "../../utils/exportExcel";
import { exportPdf } from "../../utils/exportPdf";
import { Transaction } from "./TransactionList";
import { BsDownload } from "react-icons/bs";

function DownloadTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const handleClick = (e: any) => {
    switch (e.target.name) {
      case "excel":
        exportExcel(transactions);
        break;
      case "pdf":
        exportPdf(transactions);
        break;
    }
  };


  return (
    <Dropdown drop="end">
      <Dropdown.Toggle><BsDownload/> Download</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item name="excel" onClick={handleClick}>Excel</Dropdown.Item>
        <Dropdown.Item name="pdf" onClick={handleClick}>Pdf</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DownloadTransactions;