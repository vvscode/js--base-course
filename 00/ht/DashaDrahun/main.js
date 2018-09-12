while (!(name = prompt('Enter your name:')))
{	
}

while (!(years = prompt('Enter your years:')) || Number.isNaN(Number.parseInt(years)) || years<=0)
{
}

if (years < 18) alert ('Здарова,' + name+ '. Как твои ' + years + '?');
else alert ('Привествую, ' + name+ '. Уж ' + years + ' лет прошло');