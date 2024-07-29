let main = document.getElementById("main");
let addUserBtn = document.getElementById("add-user");
let doubleBtn = document.getElementById("double");
let showMillionairesBtn = document.getElementById("show-millionaires");
let sortBtn = document.getElementById("sort-richest");
let calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
doubleMoney();
millionaires();
calculateWealth();

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", millionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
sortBtn.addEventListener("click", sortRichest);

function sortRichest() {
  data.sort(function (a, b) {
    return b.money - a.money;
  });
  updateDOM();
}

function calculateWealth() {
  let wealth = data.reduce((x, z) => (x += z.money), 0);

  let wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<div class="sm:mt-6	sm:border-t-2	sm:border-red-500	sm:pt-1.5 sm:pl-1.5"> <h3 class="text-xl sm:text-fuchsia-800">Total:<strong >${formatMoney(
    wealth
  )}
    </strong></h3></div>`;

  main.appendChild(wealthEl);
}

function millionaires() {
  data = data.filter(function (user) {
    return user.money > 1000000;
  });

  updateDOM();
}

async function getRandomUser() {
  let res = await fetch("https://randomuser.me/api/");
  let data = await res.json();

  let user = data.results[0];

  let newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function doubleMoney() {
  data = data.map((A) => {
    return { ...A, money: A.money * 2 };
  });

  updateDOM();
}

function addData(user) {
  data.push(user);

  updateDOM();
}

function updateDOM(provideDta = data) {
  main.innerHTML = "";
  provideDta.forEach(function (item) {
    let element = document.createElement("div");
    element.classList.add("person", "sm:flex", "sm:justify-between", "sm:pt-5");
    element.innerHTML = `<strong class="sm:flex sm:text-lg sm:font-normal sm:text-sm ">${
      item.name
    }</strong>
            ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
