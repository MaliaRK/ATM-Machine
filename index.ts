#! /usr/bin/env node

import inquirer from "inquirer";

let balance = 30000;
let pinCode = 2196;

console.log(`Your pin code is: ${pinCode}`);

let pinAnswer = await inquirer.prompt([
  {
    message: "Please Enter your Pin code: ",
    type: "number",
    name: "pin",
  },
]);

if (pinAnswer.pin === pinCode) {
  console.log("Valid pin.");

  let operationAns = await inquirer.prompt([
    {
      message: "Please select operation:",
      type: "list",
      name: "opeartion",
      choices: [
        "Withdraw",
        "Check Balance",
        "Fast Cash",
        "Fund Transfer",
        "Bills Payment",
      ],
    },
  ]);

  if (operationAns.opeartion === "Withdraw") {
    let amountAns = await inquirer.prompt([
      {
        message: "Please Enter your amount: ",
        type: "number",
        name: "withdraw",
      },
    ]);
    if (amountAns.withdraw <= balance) {
      balance -= amountAns.withdraw;
      console.log("Your remaining balance is: " + balance);
    } else {
      console.log("Insufficient balance.");
    }
  
} else if (operationAns.opeartion === "Check Balance") {
    console.log(`Your current balance is: ${balance}.`);
  
} else if (operationAns.opeartion === "Fast Cash") {
    let fastCashAns = await inquirer.prompt([
      {
        message: "Please select your amount",
        type: "list",
        name: "fastcash",
        choices: [500, 1000, 1500, 3000, 5000, 40000, 50000],
      },
    ]);

    let selectedAmount = parseInt(fastCashAns.fastcash);

    if (selectedAmount <= balance) {
      balance -= selectedAmount;
      console.log("Your remaining balance is: " + balance);
    } else {
      console.log("Insufficient balance.");
    }

  } else if (operationAns.opeartion === "Fund Transfer") {
    let fundAns = await inquirer.prompt([
      {
        message: "Select Beneficiary Bank",
        type: "list",
        name: "bankname",
        choices: ["HBL", "MEEZAN BANK", "UBL", "HML", "FBL", "Other"],
      },
      {
        message: "Enter Beneficiary Account Number: ",
        type: "number",
        name: "account number",
      },
      { message: "Enter your amount to transfer", type: "number", name: "FT" },
      {
        message: "Please Re-Enter your pin: ",
        type: "number",
        name: "pin",
      }
    ]);

    if (fundAns.FT <= balance) {
        balance -= fundAns.FT;
        if (fundAns.pin === pinCode){
        console.log("Transfer successfully!");
        console.log(`\nYour remaining balance is: ${balance}`);
        } else {
        console.log("Invalid pin");
        }
    } else {
        console.log("Transfer failed.");
        console.log("\nInsufficient amount");
    }

  } else if (operationAns.opeartion === "Bills Payment"){
    let billAns = await inquirer.prompt([
    {message: "Please select company", type: "list", name: "company", choices: ["K-Electric","SSGC","Water","Telephone bill"]},
    {message: "Please Enter consumer number: ", type: "number", name: "consumer"},
    {message: "Please Enter your amount: ", type: "number", name: "billamount"},
]);

  if (billAns.billamount <= balance){
    balance -= billAns.billamount;
    console.log("payment successful!");
    console.log(`\nYour remaining balance is: ${balance}`);
 } else {
    console.log("Payment failed due to insufficient balance");
 }
}

} else {
  console.log("Invalid pin");
}
