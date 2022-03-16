let expenseForm = document.querySelector("#expenseForm")
let expenseDesc = document.querySelector("#expenseDesc")
let expenseAmount = document.querySelector("#expenseAmount")
let addExpense = document.querySelector("#addExpense")
let updateItem = document.querySelector("#updateItem")
let showExpense = document.querySelector("#showExpense")
let saveIndex = document.querySelector("#saveIndex")

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
        <td class="expenseDescCol">${element.topic}</td>
        <td>${element.amount}</td>
        <td><button class="editButton" id="editButton" onclick="editItem(${index})"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="deleteButton" id="deleteButton" onclick="deleteItem(${index})"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>`
    })
    showExpense.innerHTML = allExpenseItem.join("")
    
}

function submitForm(evt){
    evt.preventDefault();
    storeLocally();
    showItem();
}


expenseAmount.addEventListener("input", () => {
    if(expenseAmount.validity.rangeUnderflow){
        expenseAmount.setCustomValidity("Yeah Sab Doglapan Hain, Positive Value Add Karo")
    }
    else{
        expenseAmount.setCustomValidity("")
    }
})

function editItem(index) {
    let expenseItem = localStorage.getItem("expense")
    let expenseObj = JSON.parse(expenseItem);
    saveIndex.value = index;
    expenseDesc.value = expenseObj[index].topic;
    expenseAmount.value = expenseObj[index].amount;
    addExpense.classList.add("hideElement");
    updateItem.classList.remove("hideElement");
}

updateItem.addEventListener("click", () => {
    let expenseItem = localStorage.getItem("expense")
    let expenseObj = JSON.parse(expenseItem);
    expenseObj[saveIndex.value].topic = expenseDesc.value;
    expenseObj[saveIndex.value].amount = expenseAmount.value;
    localStorage.setItem("expense", JSON.stringify(expenseObj))
    showItem();
    addExpense.classList.remove("hideElement");
    updateItem.classList.add("hideElement");

})