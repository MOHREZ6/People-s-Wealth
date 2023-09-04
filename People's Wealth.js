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
  wealthEl.innerHTML = ` <h3>Total:<strong>${formatMoney(wealth)}
    </strong></h3>`;

  main.appendChild(wealthEl);
}

function millionaires() {
  data = data.filter(function (user) {
    return user.money > 1000000;
  });
  console.log(data);

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

function addData(x) {
  data.push(x);

  updateDOM();
}
function updateDOM(provideDta = data) {
  main.innerHTML = " <h2><strong>Person</strong>wealth</h2>";
  provideDta.forEach(function (item) {
    let element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>
            ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
