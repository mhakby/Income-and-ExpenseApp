// Some elements from HTML
const nameInput = document.getElementById("name-input");
const valueInput = document.getElementById("value-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.querySelector("#list");
const incomeCheckbox = document.getElementById("income-check");
const expenseCheckbox = document.getElementById("expense-check");
const sumInfo = document.getElementById("sum-info");
const deleteBtn = document.getElementById("delete");
const userInput = document.getElementById("user-input");
const select = document.querySelector("select");

// Events
addBtn.addEventListener("click", addTransaction);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input", saveUser);
document.addEventListener("DOMContentLoaded", getUser);
select.addEventListener("change", handleFilter);
incomeCheckbox.addEventListener("change", checkSelection);
expenseCheckbox.addEventListener("change", checkSelection);
document.addEventListener("DOMContentLoaded", checkSelection);

// Control of checkboxes
function checkSelection(event) {
  if (event.target === incomeCheckbox) {
    if (incomeCheckbox.checked) {
      expenseCheckbox.checked = false;
    } else if (!expenseCheckbox.checked) {
      incomeCheckbox.checked = true;
    }
  } else if (event.target === expenseCheckbox) {
    if (expenseCheckbox.checked) {
      incomeCheckbox.checked = false;
    } else if (!incomeCheckbox.checked) {
      expenseCheckbox.checked = true;
    }
  }
}

// Sum tx
let sum = 0;

function updateSum(price) {
  if (incomeCheckbox.checked) {
    sum += Number(price);
  }

  if (expenseCheckbox.checked) {
    sum -= Number(price);
  }

  sumInfo.innerText = sum;
}

function addTransaction(event) {
  event.preventDefault();

  if (!nameInput.value || !valueInput.value) {
    alert("Please fill out the form...");
    return;
  }

  //a- creating div
  const expenseDiv = document.createElement("div");

  //b- adding class
  expenseDiv.classList.add("transaction");

  if (incomeCheckbox.checked === true) {
    expenseDiv.classList.add("income");
  } else if (expenseCheckbox.checked === true) {
    expenseDiv.classList.add("expense");
  }

  //c- creating HTML items
  expenseDiv.innerHTML = `
            <h2 class="name">${nameInput.value}</h2>
            <h2 class="price">${valueInput.value}</h2>
            <div class="btns">
              <img id="delete" src="/images/delete-icon.png" />
            </div>
    `;

  //d- sending to HTML
  listArea.appendChild(expenseDiv);

  // Updating Sum
  updateSum(valueInput.value);

  // Cleaning the form
  nameInput.value = "";
  valueInput.value = "";

  console.log(listArea);
}

function handleUpdate(event) {
  const ele = event.target;
  const parent = ele.parentElement.parentElement;

  if (ele.id === "delete") {
    parent.remove();

    // Updating sum
    const price = parent.querySelector(".price").textContent;
    if (parent.classList.contains("income")) {
      updateSum(Number(price) * -1);
    } else if (parent.classList.contains("expense")) {
      updateSum(Number(price));
      console.log(sum);
    }
  }
}

// saving user to localStorage
function saveUser(event) {
  localStorage.setItem("username", event.target.value);
}

// Getting user info from localStorage
function getUser() {
  const username = localStorage.getItem("username") || "";
  userInput.value = username;
}

// Filter
function handleFilter(event) {
  const selected = event.target.value;
  const items = list.childNodes;

  items.forEach((item) => {
    switch (selected) {
      case "all":
        item.style.display = "flex";
        break;

      case "income":
        if (item.classList.contains("income")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;

      case "expense":
        if (item.classList.contains("expense")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}
