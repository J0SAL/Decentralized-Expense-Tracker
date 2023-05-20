<div align="center"> <a href="https://standnote.netlify.app/"> <img align="center" alt="standnote" src="https://user-images.githubusercontent.com/52382282/211530770-9bb2278a-1c47-4351-9e86-306a02aa00e9.png" height='95' width='380'> </a> </div>

## :milky_way: Tracking Expenses Securely!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

<br>
<b>Jarvis</b> is A web application backed by the power of <b>Decentralization!</b> The motive of the application is to assist the user in managing and maintaining his/her transactions. A transaction can be either in form of income or expense. This application provides visualizations in form of graphs giving users the ability to track by visualizing his/her expenses over a period of time. The application provides the functionality to export the transactions in an excel file. The user can also add transactions through voice commands with a simple click of a button. In addition all data that the user generates is stored on the blockchain in a decentralized manner powered by Ethereum, which prevents the risks of illegal tampering with the data.
<br>

## :snowflake: Features:

- Data Security
- Graphical Visualization
- Top Diversifications
- Exporting Data to Excel
- Voice Recognition

## :snowflake: Demo

- **Website** https://jarvis.on.fleek.co/ or https://your-jarvis.vercel.app/

- **Video** https://youtu.be/2-cFY_AJvGU

## :hammer_and_wrench: Technology Stack

- **Website** ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
  ![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

- **Backend** ![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
  ![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
  [![Hardhat](https://img.shields.io/badge/Hardhat-ede65c?style=for-the-badge&&logoColor=white)](https://hardhat.org/)&nbsp;

- **Hosting** [![Fleek](https://img.shields.io/badge/Fleek.co-213?style=for-the-badge)](https://fleek.co/)&nbsp;
  [![Goerli Etherscan](https://img.shields.io/badge/Etherscan.io-darkblue?style=for-the-badge)](https://goerli.etherscan.io/)&nbsp;
  [![Alchemy](https://img.shields.io/badge/Alchemy-blue?style=for-the-badge)](https://dashboard.alchemy.com/)&nbsp;

## :snowflake: ScreenShots

1. ### Overview

- Input form
- Current Balance and Transaction Overview
- <img src="https://user-images.githubusercontent.com/52382282/211576143-5e7e113e-ab83-48c2-bd28-59e0cee0c991.png" alt="drawing" width="800" height="400"/>

2. ### Transactions

- List of Transaction sorted by date
- Download Transaction Option
- Graphical Analysis of Incomes & Expenses
- <img src="https://user-images.githubusercontent.com/52382282/211576420-8df471e6-788b-4517-a498-f18864770eee.png" alt="drawing" width="800" height="400"/>

3. ### Performance

- Line Graph for analysing transactions throught the year
- <img src="https://user-images.githubusercontent.com/52382282/211577394-19701031-13af-481d-987f-e1762ada8e1d.png" alt="drawing" width="800" height="400"/>

4. ### Diversification

- Graphical Analysis of Top Incomes and Expenses
- <img src="https://user-images.githubusercontent.com/52382282/211577792-98892daf-58a4-4cba-9531-bcb043b8d6c6.png" alt="drawing" width="800" height="400"/>

## :runner: Local setup - Frontend

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

```bash
# Clone this repository
$ git clone https://github.com/J0SAL/Decentralized-Expense-Tracker.git
# Go into the repository
$ cd Decentralized-Expense-Tracker
$ cd frontend
# Install Dependencies
$ npm install
# Run Application
$ npm run dev
# The server will start at <http://localhost:3000>
```

## :runner: Local setup - Backend

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/) installed.

```bash
# Clone this repository
$ git clone https://github.com/J0SAL/Decentralized-Expense-Tracker
# Go into the repository
$ cd Decentralized-Expense-Tracker
$ cd backend
# Install dependencies
yarn
# Code Compile
yarn hardhat compile
# testing (optional)
yarn hardhat test
# Run the nodes (*terminal-1*)
yarn hardhat node
# Deploy contract to localhost (*terminal-2*)
yarn hardhat deploy --network localhost
```

To run this project, you will need to add the following environment variables to your .env file inside your backend folder.

<details>
 <summary><strong>Environment Varaibles </strong></summary>

```bash
GOERLI_RPC_URL=<ALCHEMY_URL> # (https://www.alchemy.com/)

PRIVATE_KEY=<YOUR_ACCOUNT_PRIVATE_KEY> # (https://www.alchemy.com/)

ETHERSCAN_API_KEY=<YOUR_KEY> # (https://goerli.etherscan.io/)

UPDATE_FRONT_END=true # (true: dynamically update ABI and contract address frontend)
```
</details>
  
## :cowboy_hat_face: Contributors

<a href="https://github.com/J0SAL/Decentralized-Expense-Tracker/graphs/contributors"> 
    <img src="https://contrib.rocks/image?repo=J0SAL/Decentralized-Expense-Tracker" /> 
</a>
