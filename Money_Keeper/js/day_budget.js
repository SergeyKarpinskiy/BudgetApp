'use strict';

let startBtn = document.getElementById("start"),
//////////
budgetvalue = document.getElementsByClassName("budget-value")[0],
daybudgetvalue = document.getElementsByClassName("daybudget-value")[0],
levelvalue = document.getElementsByClassName("level-value")[0],
expensesvalue = document.getElementsByClassName("expenses-value")[0],
optionalexpensesvalue = document.getElementsByClassName("optionalexpenses-value")[0],
incomevalue = document.getElementsByClassName("income-value")[0],
monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
///////////
expensesitems = document.getElementsByClassName("expenses-item"),
///////////
expensesBtn = document.getElementsByTagName("button")[0],
optionalexpensesbtn = document.getElementsByTagName('button')[1],
countbudgetbtn = document.getElementsByTagName('button')[2],
///////////
optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
///////////
chooseincome = document.querySelector(".choose-income"),
checksavings = document.querySelector(".checksavings"),
choosesum = document.querySelector(".choose-sum"),
choosepercent = document.querySelector(".choose-percent"),
yearvalue = document.querySelector(".year-value"),
monthvalue = document.querySelector(".month-value"),
dayvalue = document.querySelector(".day-value");
///////////
let money, time;

startBtn.style.background = "green";
expensesBtn.disabled = true;
expensesBtn.style.background = "grey";
optionalexpensesbtn.disabled = true;
optionalexpensesbtn.style.background = "grey";
countbudgetbtn.disabled = true;
countbudgetbtn.style.background = "grey";


startBtn.addEventListener('click', function()
{
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetvalue.textContent = money.toFixed();
    yearvalue.value = new Date (Date.parse(time)).getFullYear();
    monthvalue.value = new Date (Date.parse(time)).getMonth()+1;
    dayvalue.value = new Date (Date.parse(time)).getDate();
    expensesBtn.disabled = false;
    startBtn.disabled = true;
    expensesBtn.style.background = "green";
    
});

expensesBtn.addEventListener('click', function()
{
    let sum = 0;
    for (let i = 0; i < expensesitems.length; i++) {
        let a = expensesitems[i].value,
            b = expensesitems[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            console.log ("bad result");
            i--;
        }
    }
    expensesvalue.textContent = sum;
    optionalexpensesbtn.disabled = false;
    optionalexpensesbtn.style.background = "green";
});

optionalexpensesbtn.addEventListener('click', function()
{
    optionalexpensesvalue.textContent = "";
    for (let i = 0; i < optionalExpensesItem.length; i++) 
    {       
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesvalue.textContent +=  appData.optionalExpenses[i] + ' ';
    }
    countbudgetbtn.disabled = false;
    countbudgetbtn.style.background = "green";
});

countbudgetbtn.addEventListener('click', function()
{
    if (appData.budget != undefined)
    {
        appData.moneyPerDay = ((appData.budget- +expensesvalue.textContent) / 30).toFixed();
        daybudgetvalue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
           levelvalue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelvalue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelvalue.textContent = "Это высокий уровень достатка!";
        } else {
            levelvalue.textContent = "Ошибочка...!";
        }
    }
    else {
        daybudgetvalue.textContent = "Ошибочка...!";
    }
});

chooseincome.addEventListener('input', function()
{
    let items = chooseincome.value;
    appData.income = items.split(', ');
    incomevalue.textContent = appData.income;
});

checksavings.addEventListener('click', function ()
{
    if (appData.savings == true)
    {
        appData.savings = false;
    }
    else appData.savings = true;
});

choosesum.addEventListener ('input', function()
{
    if (appData.savings == true)
    {
        let sum = +choosesum.value,
        percent = +choosepercent.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent =  appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

choosepercent.addEventListener ('input', function()
{
    if (appData.savings == true)
    {
        let sum = +choosesum.value,
        percent = +choosepercent.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent =  appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
    
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};