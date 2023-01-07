import { useEffect, useState } from "react";
import DataContext from "./dataContext";
import { contractAddresses, abi } from "../../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { notifyType, useNotification } from "web3uikit";
import { ContractTransaction } from "ethers";

interface contractAddressesInterface {
  [key: string]: string[];
}
type transactionparam = {
  _id: string;
  _amount: number;
  _date: string;
  _description: string;
  _category: string;
};

type transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  isDeleted?: boolean;
  type: number;
};

var initYearData = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
};
var demo_transactions = [
  {
    amount: 100,
    category: "Salary",
    date: "2021-09-01",
    description: "Salary",
    id: "0x5B38Da6a701c568545dCfcB03FcB875f56bedd12",
    type: 0,
  },
  {
    amount: 100,
    category: "Clothes",
    date: "2021-09-01",
    description: "Salary",
    id: "0x5B38Da6a701c568545dCfcB03FcB875f56bedd13",
    type: 1,
  },
  {
    amount: 100,
    category: "Business",
    date: "2021-09-01",
    description: "Salary",
    id: "0x5B38Da6a701c568545dCfcB03FcB875f56bedd14",
    type: 0,
  },
  {
    amount: 100,
    category: "Gifts",
    date: "2021-09-01",
    description: "Salary",
    id: "0x5B38Da6a701c568545dCfcB03FcB875f56bedd15",
    type: 0,
  },
  {
    amount: 100,
    category: "Lottery",
    date: "2021-09-01",
    description: "Salary",
    id: "0x5B38Da6a701c568545dCfcB03FcB875f56bedd16",
    type: 0,
  },
  {
    amount: 100,
    category: "Car",
    date: "2021-09-01",
    description: "Salary",
    id: "0x5B38Da6a701c568545dCfcB03FcB875f56bedd17",
    type: 1,
  },
  {
    amount: 50,
    category: "Food",
    date: "2021-09-01",
    description: "Salary",
    id: "0x5B38Da6a701c568545dCfcB03FcB875f56bedd18",
    type: 1,
  },
];
function DataState({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<transaction[]>([]);

  const [incomes, setIncomes] = useState<{ [id: string]: number }>({});
  const [expenses, setExpenses] = useState<{ [id: string]: number }>({});

  const [yearExpenses, setYearExpenses] = useState<{ [id: string]: number }>(
    initYearData
  );
  const [yearIncomes, setYearIncomes] = useState<{ [id: string]: number }>(
    initYearData
  );

  const [overview, setOverview] = useState<{ income: number; expense: number }>(
    { income: 0, expense: 0 }
  );

  const addresses: contractAddressesInterface = contractAddresses;
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId: string = parseInt(chainIdHex!).toString();
  const raffleAddress = chainId in addresses ? addresses[chainId][0] : null;

  const dispatch = useNotification();

  const {
    runContractFunction: getTransactions,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress!, // specify the networkId
    functionName: "getUserTransactions",
    params: {},
  });

  const { runContractFunction: getTransactionsLength } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress!, // specify the networkId
    functionName: "getUserTransactionsLen",
    params: {},
  });

  const updateUI = async () => {
    if (isWeb3Enabled) {
      const transactionsLength = Number(
        (await getTransactionsLength()) as number
      );
      console.log("Transaction Length", transactionsLength);
      let arr = (await getTransactions()) as [];
      console.log("raw transactions ", arr);
      let localtransactions = [] as transaction[];
      for (let i = 0; i < transactionsLength; i++) {
        if (!arr[i][0]) continue;
        localtransactions.push({
          id: arr[i][0],
          amount: Number(arr[i][4]),
          date: arr[i][5],
          description: arr[i][3],
          category: arr[i][2],
          // isDeleted: arr[i].isDeleted,
          type: arr[i][1],
        });
      }
      console.log("Transactions", localtransactions);
      setTransactions(localtransactions);
    }
  };

  const { runContractFunction: addIncome } = useWeb3Contract();
  const addIncomeToContract = async (_params: transactionparam) => {
    console.log("income params: ", _params);
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "addIncome",
        params: _params,
      };
      await addIncome({
        params: options,
        onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
        onError: (error) => handleError(error),
      });
      updateUI();
    }
  };

  const { runContractFunction: addExpense } = useWeb3Contract();
  const addExpenseToContract = async (_params: transactionparam) => {
    console.log("expense params: ", _params);

    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "addExpense",
        params: _params,
      };
      await addExpense({
        params: options,
        onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
        onError: (error) => handleError(error),
      });
      updateUI();
    }
  };

  const { runContractFunction: deleteTransaction } = useWeb3Contract();
  const deleteContractTransaction = async (_params: { id: string }) => {
    if (isWeb3Enabled) {
      let options = {
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "deleteTransaction",
        params: _params,
      };
      await deleteTransaction({
        params: options,
        onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
        onError: (error) => handleError(error),
      });
      updateUI();
    }
  };

  const getOverview = async () => {
    let income = 0,
      expense = 0;
    transactions.map((tx) => {
      if (tx.type == 0) income += tx.amount;
      else expense += tx.amount;
    });
    setOverview({ income, expense });
  };

  const getIncomes = async () => {
    let t: { [id: string]: number } = {};
    transactions.map((tx) => {
      if (tx.type === 0)
        t[tx.category] = t[tx.category]
          ? t[tx.category] + tx.amount
          : tx.amount;
    });
    setIncomes(t);
  };
  const getExpenses = async () => {
    let t: { [id: string]: number } = {};
    transactions.map((tx) => {
      if (tx.type === 1)
        t[tx.category] = t[tx.category]
          ? t[tx.category] + tx.amount
          : tx.amount;
    });
    setExpenses(t);
  };

  const getMonth = (monthid: string) => {
    if (monthid === "01") return "January";
    else if (monthid === "02") return "February";
    else if (monthid === "03") return "March";
    else if (monthid === "04") return "April";
    else if (monthid === "05") return "May";
    else if (monthid === "06") return "June";
    else if (monthid === "07") return "July";
    else if (monthid === "08") return "August";
    else if (monthid === "09") return "September";
    else if (monthid === "10") return "October";
    else if (monthid === "11") return "November";
    return "December";
  };
  const getYearPerformance = async () => {
    let tempIncomes: { [id: string]: number } = { ...initYearData };
    let tempExpenses: { [id: string]: number } = { ...initYearData };
    transactions.map((tx) => {
      let month = getMonth(tx.date.split("-")[1]);
      if (tx.type === 0) {
        tempIncomes[month] = tempIncomes[month]
          ? tempIncomes[month] + tx.amount
          : tx.amount;
      } else if (tx.type === 1) {
        tempExpenses[month] = tempExpenses[month]
          ? tempExpenses[month] + tx.amount
          : tx.amount;
      }
    });
    setYearExpenses(tempExpenses);
    setYearIncomes(tempIncomes);
  };

  const handleSuccess = async function (tx: ContractTransaction) {
    await tx.wait(1);
    handleNewNotification({
      _type: "info",
      _message: "Transaction Complete!",
    });
    updateUI();
  };

  const handleError = function (error: any) {
    console.log(error);
    handleNewNotification({ _type: "error", _message: "Transaction Failed!" });
  };

  const handleNewNotification = function ({
    _type,
    _message,
  }: {
    _type: notifyType;
    _message: string;
  }) {
    dispatch({
      type: _type,
      message: _message,
      title: "Transaction Notification",
      position: "bottomR",
    });
  };

  useEffect(() => {
    getOverview();
    getIncomes();
    getExpenses();
    getYearPerformance();
  }, [transactions]);

  return (
    <DataContext.Provider
      value={{
        transactions,
        overview,
        incomes,
        expenses,
        getTransactions,
        updateUI,
        addIncomeToContract,
        addExpenseToContract,
        deleteContractTransaction,
        yearExpenses,
        yearIncomes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
