let expenseForm = document.querySelector("#expenseForm")
let expenseDesc = document.querySelector("#expenseDesc")
let expenseAmount = document.querySelector("#expenseAmount")
let addExpense = document.querySelector("#addExpense")
let showExpense = document.querySelector("#showExpense")

let expenseDetailsArr = []

showItem();
expenseForm.addEventListener("submit",submitForm)

function storeLocally() {
    expenseDetailsArr = {
        topic: `${expenseDesc.value}`,
        amount: `${expenseAmount.value}`
    }
    let expenseItem = localStorage.getItem("expense")

    if(expenseItem === null){
        expenseObj = []
    }
    else{
        expenseObj = JSON.parse(expenseItem)
    }
    expenseObj.push(expenseDetailsArr)
    localStorage.setItem("expense", JSON.stringify(expenseObj))
}

function showItem() {
    let expenseItem = localStorage.getItem("expense")

    if(expenseItem === null){
        expenseObj =[]
    }
    else{
        expenseObj = JSON.parse(expenseItem)
    }
    let allExpenseItem = expenseObj.map((element,index) => {
        return ` <tr>
        <td>${index+1}</td>
        <td>${element.topic}</td>
        <td>${element.amount}</td>
        <td>Edit</td>
        <td>Delete</td>
    </tr>`
    })
    showExpense.innerHTML = allExpenseItem.join("")
    
}

function submitForm(evt){
    evt.preventDefault();
    storeLocally();
    showItem();
}