const billInput = document.querySelector("#bill-amount");
const tipBtns = document.querySelectorAll(".tip-btn");
const customTipInput = document.querySelector(".tip-input");
const numberPeopleInput = document.querySelector(".number-people input");
const perPersonValue = document.querySelector(".per-person__value");
const totalPersonValue = document.querySelector(".total-person__value");
const resetBtn = document.querySelector("#reset-btn");
const errMsg = document.querySelector("#err-msg");

let billAmount;
let tipPercentage;
let numberPeople;

const calculate = () => {
  const tipPerPerson = (billAmount * (tipPercentage / 100)) / numberPeople || 0;
  const totalPerPerson = billAmount / numberPeople + tipPerPerson || 0;
  perPersonValue.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPersonValue.textContent = `$${totalPerPerson.toFixed(2)}`;
};

billInput.addEventListener("input", () => {
  if (billInput.value.startsWith("0")) {
    billInput.value = parseFloat(billInput.value);
  }
  billAmount = parseFloat(billInput.value);
  if (numberPeople === 0) return;
  calculate();
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (numberPeople === 0) return;
    tipBtns.forEach((btn) => {
      btn.classList.remove("clicked");
    });
    btn.classList.add("clicked");
    tipPercentage = parseInt(btn.value);
    calculate();
  });
});

customTipInput.addEventListener("input", () => {
  tipPercentage = parseFloat(customTipInput.value);
  if (numberPeople === 0) return;
  calculate();
});

customTipInput.addEventListener("click", () => {
  tipBtns.forEach((btn) => {
    btn.classList.remove("clicked");
  });
});

numberPeopleInput.addEventListener("input", () => {
  numberPeople = parseInt(numberPeopleInput.value);
  if (numberPeopleInput.value.startsWith("0"))
    numberPeopleInput.value = parseInt(numberPeopleInput.value);
  if (numberPeople === 0) {
    errMsg.classList.add("show");
    numberPeopleInput.classList.add("invalid");
    return;
  } else {
    numberPeopleInput.classList.remove("invalid");
    errMsg.classList.remove("show");
  }
  calculate();
});

resetBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");
  const btns = document.querySelectorAll("button");

  inputs.forEach((input) => {
    input.value = "";
  });

  btns.forEach((btn) => {
    btn.classList.remove("clicked");
  });

  numberPeopleInput.classList.remove("invalid");
  errMsg.classList.remove("show");
  perPersonValue.textContent = "$0.00";
  totalPersonValue.textContent = "$0.00";
  billAmount = undefined;
  tipPercentage = undefined;
  numberPeople = undefined;
});
