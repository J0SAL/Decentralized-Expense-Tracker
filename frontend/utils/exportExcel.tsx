// @ts-expect-error
import XlsxPopulate from "xlsx-populate";
// @ts-expect-error
import { saveAs } from "file-saver";
import { Transaction } from "../components/transactions/TransactionList";
import { sentenceCase } from "./common";

function getSheetData(data: Transaction[]) {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row: any) {
    return fields.map(function (fieldName) {
      if (fieldName == "type") {
        return row[fieldName] === 0 ? "Income" : "Expense";
      }
      return row[fieldName] ? row[fieldName] : "";
    });
  });
  sheetData.unshift(fields.map((fields) => sentenceCase(fields)));
  return sheetData;
}

export async function exportExcel(data: Transaction[]) {
  XlsxPopulate.fromBlankAsync().then(
    async (workbook: {
      sheet: (arg0: number) => any;
      outputAsync: () => Promise<any>;
    }) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(data);
      const totalColumns = sheetData[0].length;

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "file.xlsx");
      });
    }
  );
}
