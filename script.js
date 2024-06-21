let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const changeDue = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn");
const currencies = [  
    {"Currency Unit":"PENNY", Amount: 0.01},
    {"Currency Unit":"NICKEL", Amount:0.05},
    {"Currency Unit":"DIME", Amount: 0.1},
    {"Currency Unit":"QUARTER", Amount: 0.25},
    {"Currency Unit":"ONE", Amount: 1},
    {"Currency Unit":"FIVE", Amount: 5},
    {"Currency Unit":"TEN", Amount: 10},
    {"Currency Unit":"TWENTY", Amount: 20},
    {"Currency Unit":"ONE HUNDRED", Amount:100}
];

const evaluate = () => {
    console.log("Purchase button clicked");
    let cash = parseFloat(document.getElementById("cash").value);

    console.log("Cash: ", cash, "Price: ", price);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    } else {
        let changeAmounts = [];
        let change = cash - price;

        for (let i = cid.length - 1; i >= 0; i--) {
            let currencyName = currencies[i]["Currency Unit"];
            let currencyValue = currencies[i].Amount;
            let currencyAvailable = cid[i][1];

            if (change >= currencyValue && currencyAvailable > 0) {
                let amountFromCurrency = Math.min(Math.floor(change / currencyValue) * currencyValue, currencyAvailable);
                change -= amountFromCurrency;
                change = Math.round(change * 100) / 100; // Fix potential floating point precision issues
                cid[i][1] -= amountFromCurrency;

                if (amountFromCurrency > 0) {
                    changeAmounts.push([currencyName, amountFromCurrency]);
                }
            }
        }

        let cidStatus;
        let changeDueText;
        let cidRemainingAmount = cid.reduce((sum,current)=>sum+current[1],0)

        if (change > 0 ) {
            cidStatus = "INSUFFICIENT_FUNDS";
             changeDueText = "Status: "+ cidStatus
        } else if( change === 0 && cidRemainingAmount === 0){
            cidStatus = "CLOSED"; 

            changeAmounts = JSON.stringify(changeAmounts);

            // remove outer brackets
            changeAmounts = changeAmounts.slice(1,-1);

            // remove inner brackets and quotes
            changeAmounts = changeAmounts.replace(/\["|"\]/g, '');

            // replace commas before numbers with a colon and whitespace
            changeAmounts = changeAmounts.replace(/",/g, ': $');

            //replace remaining commas with whitespace
            changeAmounts = changeAmounts.replace(/,|\[|\]/g, ' ');

            changeDueText = "Status: " + cidStatus + " " + changeAmounts;
            
            } else {
                cidStatus = "OPEN";
                
                changeAmounts = JSON.stringify(changeAmounts);
            
                // remove outer brackets
                changeAmounts = changeAmounts.slice(1,-1);

                // remove inner brackets and quotes
                changeAmounts = changeAmounts.replace(/\["|"\]/g, '');

                // replace commas before numbers with a colon and whitespace
                changeAmounts = changeAmounts.replace(/",/g, ': $');

                //replace remaining commas with whitespace
                changeAmounts = changeAmounts.replace(/,|\[|\]/g, ' ');


                changeDueText = "Status: "+cidStatus+" "+changeAmounts;
            
        }
        changeDue.textContent = changeDueText;
    }
};

purchaseButton.addEventListener("click", evaluate);
