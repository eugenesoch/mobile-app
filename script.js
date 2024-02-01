import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-9fe0e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if (inputValue != "") {
        push(shoppingListInDB, inputValue)
    
        clearInputFieldEl()
    } else {
        alert("Don't forget to add an item to a shopping list!")
    }
})

const input = document.getElementById("input-field")
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});

onValue(shoppingListInDB, function(snapshot) {
    // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
    
        for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        appendItemToShoppingListEl(currentItem)
    }
    } else {
        shoppingListEl.innerHTML = `<p>No items in the list yet. Start adding them now 🪄</p>`
    }
    
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        console.log(exactLocationOfItemInDB)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}

let checkBoxEl = document.getElementById("check-box")
let toggle = document.getElementById("theme-toggle")

let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme)

checkBoxEl.addEventListener("change", (event) => {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";
    if (event.currentTarget.checked) {
        if (currentTheme === "light") {
            targetTheme = "dark";
        }
        document.documentElement.setAttribute('data-theme', targetTheme)
        localStorage.setItem('theme', targetTheme);
      } else {
        if (currentTheme === "light") {
            targetTheme = "dark";
        }
        document.documentElement.setAttribute('data-theme', targetTheme)
        localStorage.setItem('theme', targetTheme);
      }
}) 
