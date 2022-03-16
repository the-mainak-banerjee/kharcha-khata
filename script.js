let expenseForm = document.querySelector("#expenseForm")
let expenseDesc = document.querySelector("#expenseDesc")
let expenseAmount = document.querySelector("#expenseAmount")
let addExpense = document.querySelector("#addExpense")
let updateItem = document.querySelector("#updateItem")
let showExpense = document.querySelector("#showExpense")
let saveIndex = document.querySelector("#saveIndex")
let noItem = document.querySelector("#noItem")

showItem();


expenseForm.addEventListener("submit",submitForm)

expenseAmount.addEventListener("input", () => {
    if(expenseAmount.validity.rangeUnderflow){
        expenseAmount.setCustomValidity("Yeah Keya Kar Raha Hain Bhai Tu, Positive Value Add Kar Bhai!!!")
    }
    else{
        expenseAmount.setCustomValidity("")
    }
})

function storeLocally() {
    expenseDetails = {
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
    expenseObj.push(expenseDetails)
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
    if(showExpense.innerHTML === "" || expenseItem === null){
        noItem.classList.remove("hideElement")
    }else{
        noItem.classList.add("hideElement")

    }
    
}


function editItem(index) {
    let expenseItem = localStorage.getItem("expense")
    let expenseObj = JSON.parse(expenseItem);
    saveIndex.value = index;
    expenseDesc.value = expenseObj[index].topic;
    expenseAmount.value = expenseObj[index].amount;
    addExpense.classList.add("hideElement");
    updateItem.classList.remove("hideElement");
}


function updateItemList(){
    let expenseItem = localStorage.getItem("expense")
    let expenseObj = JSON.parse(expenseItem);
    expenseObj[saveIndex.value].topic = expenseDesc.value;
    expenseObj[saveIndex.value].amount = expenseAmount.value;
    localStorage.setItem("expense", JSON.stringify(expenseObj))
    showItem();
    addExpense.classList.remove("hideElement");
    updateItem.classList.add("hideElement");
    expenseDesc.value=""
    expenseAmount.value=""
    saveIndex.value= null;
}

function deleteItem(index){
    let expenseItem = localStorage.getItem("expense")
    let expenseObj = JSON.parse(expenseItem)
    expenseObj.splice(index,1)
    localStorage.setItem("expense", JSON.stringify(expenseObj))
    showItem();
}


function submitForm(evt){
    evt.preventDefault();
    if(saveIndex.value){
        updateItemList()
    }
    else{
        storeLocally();
        showItem();
    }
    expenseDesc.value=""
    expenseAmount.value=""
}

