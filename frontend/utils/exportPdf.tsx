// @ts-expect-error
import { saveAs } from "file-saver";
import {Document, Page, pdf, Text, View, StyleSheet, Image, Font} from "@react-pdf/renderer"
import { Transaction } from "../components/transactions/TransactionList";
export async function exportPdf(data: Transaction[]) {
    const blob = await pdf(<StatementPDF data={data}/>).toBlob()
    saveAs(blob, "Expense_Tracker_Statment.pdf")
}

const StatementPDF = ({data}:{data: Transaction[]}) => {
  const currency: string = "RS";
  let expense: number = 0, income: number = 0;
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={{fontSize: 25, textAlign: 'center', marginBottom: 10}}>Expense Tracker Statement</Text>
          <View style={styles.table}>
            <View style={[styles.tablerow, {backgroundColor: '#F4B084'}]}>
              <View style={[styles.tablecol, {width: '8%'}]}>
                <Text style={[styles.tablecell, styles.tableheading]}></Text>
              </View>
              <View style={[styles.tablecol, {width: '40%'}]}>
                <Text style={[styles.tablecell, styles.tableheading]}>ID</Text>
              </View>
              <View style={styles.tablecol}>
                <Text style={[styles.tablecell, styles.tableheading]}>Date</Text>
              </View>
              <View style={styles.tablecol}>
                <Text style={[styles.tablecell, styles.tableheading]}>Amount</Text>
              </View>
              <View style={styles.tablecol}>
                <Text style={[styles.tablecell, styles.tableheading]}>Category</Text>
              </View>
              <View style={styles.tablecol}>
                <Text style={[styles.tablecell, styles.tableheading]}>Type</Text>
              </View>
            </View>
          {data.map((value, index)=>{
            value.type == 0 ? income += value.amount : expense += value.amount;
            return (
              <View style={styles.tablerow} key={value.id}>
                <View style={[styles.tablecol,{ width: '8%'}]}>
                  <Text style={styles.tablecell}>{index+1}.</Text>
                </View>
                <View style={[styles.tablecol, {width: '40%'}]}>
                  <Text style={styles.tablecell}>{value.id}</Text>
                </View>
                <View style={styles.tablecol}>
                  <Text style={styles.tablecell}>{value.date}</Text>
                </View>
                <View style={styles.tablecol}>
                  <Text style={styles.tablecell}><Text style={{fontSize: 5}}>{currency}</Text> {value.amount}</Text>
                </View>
                <View style={styles.tablecol}>
                  <Text style={styles.tablecell}>{value.category}</Text>
                </View>
                <View style={styles.tablecol}>
                  <Text style={styles.tablecell}>{value.type == 0 ? "Income" : "Expense"}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{textAlign: "right", display:'flex', marginTop: 10}}>
          <Text style={styles.tableheading}>Total Income: <Text style={{fontSize: 7}}> {currency}</Text> {income}</Text>
          <Text style={styles.tableheading}>Total Expense: <Text style={{fontSize: 7}}> {currency}</Text> {expense}</Text>
          <Text style={styles.tableheading}>Balance: <Text style={{fontSize: 7}}> {currency}</Text> {income - expense}</Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create(
  {
    body:{
      paddingVertical: 35,
      paddingHorizontal: 20
    },
    table: {
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0 
    },
    tablerow: {
      flexDirection: "row"
    },
    tablecol: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      width: '13%',
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0
    },
    tablecell: {
      margin: 'auto',
      fontSize: 10
    },
    tableheading: {
      fontSize: 13,
    }
  }
)
