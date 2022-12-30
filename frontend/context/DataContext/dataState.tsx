import { useEffect, useState } from "react";
import DataContext from "./dataContext";
import { contractAddresses, abi } from "../../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";
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
  type: string;
};

function DataState({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<transaction[]>([]);

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
      let localtransactions = [] as transaction[];
      for (let i = 0; i < transactionsLength; i++) {
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
    _type: string;
    _message: string;
  }) {
    dispatch({
      type: _type,
      message: _message,
      title: "Transaction Notification",
      position: "bottomR",
    });
  };

  return (
    <DataContext.Provider
      value={{
        transactions,
        getTransactions,
        updateUI,
        addIncomeToContract,
        addExpenseToContract,
        deleteContractTransaction,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
