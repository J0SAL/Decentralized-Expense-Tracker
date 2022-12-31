const incomeColors = [
  "#123123",
  "#154731",
  "#165f40",
  "#16784f",
  "#14915f",
  "#10ac6e",
  "#0bc77e",
  "#04e38d",
  "#00ff9d",
];
const expenseColors = [
  "#b50d12",
  "#bf2f1f",
  "#c9452c",
  "#d3583a",
  "#dc6a48",
  "#e57c58",
  "#ee8d68",
  "#f79d79",
  "#ffae8a",
  "#cc474b",
  "#f55b5f",
];

export const incomeColor = {
  Business: incomeColors[0],
  Investments: incomeColors[1],
  "Extra income": incomeColors[2],
  Deposits: incomeColors[3],
  Lottery: incomeColors[4],
  Gifts: incomeColors[5],
  Salary: incomeColors[6],
  Savings: incomeColors[7],
  "Rental income": incomeColors[8],
};

export const expenseColor = {
  Bills: expenseColors[0],
  Car: expenseColors[1],
  Clothes: expenseColors[2],
  Travel: expenseColors[3],
  Food: expenseColors[4],
  Shopping: expenseColors[5],
  House: expenseColors[6],
  Entertainment: expenseColors[7],
  Phone: expenseColors[8],
  Pets: expenseColors[9],
  Other: expenseColors[10],
};

export const incomeCategories = [
  { type: "Business", color: incomeColors[0] },
  { type: "Investments", color: incomeColors[1] },
  { type: "Extra income", color: incomeColors[2] },
  { type: "Deposits", color: incomeColors[3] },
  { type: "Lottery", color: incomeColors[4] },
  { type: "Gifts", color: incomeColors[5] },
  { type: "Salary", color: incomeColors[6] },
  { type: "Savings", color: incomeColors[7] },
  { type: "Rental income", color: incomeColors[8] },
];

export const expenseCategories = [
  { type: "Bills", color: expenseColors[0] },
  { type: "Car", color: expenseColors[1] },
  { type: "Clothes", color: expenseColors[2] },
  { type: "Travel", color: expenseColors[3] },
  { type: "Food", color: expenseColors[4] },
  { type: "Shopping", color: expenseColors[5] },
  { type: "House", color: expenseColors[6] },
  { type: "Entertainment", color: expenseColors[7] },
  { type: "Phone", color: expenseColors[8] },
  { type: "Pets", color: expenseColors[9] },
  { type: "Other", color: expenseColors[10] },
];
