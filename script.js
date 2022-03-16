let expenseForm = document.querySelector("#expenseForm")
let expenseDesc = document.querySelector("#expenseDesc")
let expenseAmount = document.querySelector("#expenseAmount")
let addExpense = document.querySelector("#addExpense")

let expenseDetailsArr = []

expenseForm.addEventListener("submit",submitForm)

function storeLocally() {
    expenseDetailsArr = {
        topic: `${expenseDesc.value}`,
        amount: `${expenseAmount.value}`
    }
    let expenseItem = localStorage.getItem("expense")
    let expenseObj = [];

    if(expenseItem === null){
        expenseObj = []
    }
    else{
        expenseObj = JSON.parse(expenseItem)
    }
    expenseObj.push(expenseDetailsArr)
    localStorage.setItem("expense", JSON.stringify(expenseObj))
}

function submitForm(evt){
    evt.preventDefault();
    console.log(expenseDesc.value)
    storeLocally()
}