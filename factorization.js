function primeNum(x) {
	let n = x;

	nextPrime: for (let i = 2; i <= n; i++) {
		// Для всех i...

		for (let j = 2; j < i; j++) {
			// проверить, делится ли число..
			if (i % j == 0) continue nextPrime; // не подходит, берём следующее
		}

		if (n % i == 0) set.add(i);
	}
}

function findDivider(arr, lsts) {
	for (let i = 0; i < lsts.length; i++) {
		let item = lsts[i];
		let divider = [];

		arr.forEach(element => {
			if (item % element === 0) {
				divider.push(element);
			}
		});

		obj[`${item}`] = divider;
	}
}

function sacnObj(arr, obj) {
	let arrTest = [];

	arr.forEach(element => {
		let sum = 0;

		// Счетчик
		let count = 0;
		for (let i in obj) {
			// массив из ключей: [2, 3]
			let valuesArr = obj[i];
			if (valuesArr.includes(element)) {
				count++;
			} else {
				count = 0;
				continue;
			}

			if (count == 1) {
				sum += Number(i);
			} else if (count > 1) {
				sum += Number(i);
			}
			arrTest.push([element, sum]);
		}
	});
	return arrTest;
}

function filterAndReturnArr(arr) {
	let i = 0;
	let prev = 0;

	while (i < arr.length) {
		let element = arr[i][0];
		if (i === 0) {
			prev = element;
			i++;
			continue;
		}

		let currnet = element;

		if (currnet !== prev) {
			prev = currnet;
			i++;
			continue;
		} else {
			arr.splice(i - 1, 1);

			i--;

			if (i == 0) {
				prev = arr[i][0];
				continue;
			}

			prev = arr[i - 1][0];
		}
	}

	return arr;
}

let arr = [15, 21, 24, 30, 45];
let set = new Set();

// the result of findDivider(primeArr, lst) work
let obj = {};

// Тут будет scanf
let p = [];

function factorization(lst) {
	for (let i = 0; i < lst.length; i++) {
		item = lst[i]; // 12

		// Выдает простые числа делители (в переменной primeArr)
		primeNum(item);
	}
	// the result of primeNum(x) work
	let primeArr = [...set].sort();

	// Выдает объект с заданным числом и всеми простыми делителями к нему и сохраняет в перменную obj
	findDivider(primeArr, lst);

	let arrPrimeNumAndValues = sacnObj(primeArr, obj);
	return filterAndReturnArr(arrPrimeNumAndValues);
}
