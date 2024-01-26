import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-9fe0e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const shoppingListEl = document.getElementById("shopping-list")


let addToCart = document.getElementById("add-button")
let inputEl = document.getElementById("input-field")
addToCart.addEventListener("click", function() {
    let inputValue = inputEl.value
    console.log(inputValue)
    push(shoppingListInDB, inputValue)
    addItemToShoppingListEl(inputValue)
    clearInputField()

})

function clearInputField() {
    inputEl.value = ""
}

function addItemToShoppingListEl(itemToAdd) {
    shoppingListEl.innerHTML += `<li>${itemToAdd}</li>`
}

// let toggle = document.getElementById("theme-toggle");

// let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
// if (storedTheme)
//     document.documentElement.setAttribute('data-theme', storedTheme)


// toggle.onclick = function() {
//     let currentTheme = document.documentElement.getAttribute("data-theme");
//     let targetTheme = "light";
//     toggle.innerHTML = `<i class="fa-solid fa-sun">`
    
//     if (currentTheme === "light") {
//         targetTheme = "dark";
//         toggle.innerHTML = `<i class="fa-solid fa-moon"></i>`
//     }

//     document.documentElement.setAttribute('data-theme', targetTheme)
//     localStorage.setItem('theme', targetTheme);
// };