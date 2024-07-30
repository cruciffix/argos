class Person {
	constructor() {
		this.lvl = 1;
		this.xp = 0;
		this.arrRanks = [
			'Новичок',
			'Вникающий',
			'Заинтересованный',
			'Предлагающий',
			'Просвещенный',
			'Идейный',
			'Вовлекающий',
			'Решающий',
			'Создающий',
			'Корректирующий',
			'Критикующий',
		];
		this.rankWorker = this.arrRanks[0];
		this.frases = [
			'К сожалению, я не справился',
			'Было очень легко',
			'Было не плохо',
			'Это было напряженно',
		];
		this.arrAchievements = [];
	}

	// Функция Обновляет lvl
	level() {
		return this.lvl; // number
	} // return number

	// Функция Обновляет XP
	experience() {
		if (this.lvl == 100) {
			return (this.xp = 10000);
		}
		// if (this.lvl > 1) {
		// 	// Если текущий уровень больше 1, то
		// 	return this.lvl * 100 + this.xp;
		// }
		return this.xp;
	} // return number

	// Функция Обновляет ранг
	rank() {
		return this.rankWorker;
	} // return string

	// Функция реализующая обучение и задания
	trainingAndBattleFunc(prevXp) {
		let sumTestXp = this.xp - prevXp;

		// Если sumTestXp больше 100
		if (sumTestXp >= 100) {
			// Вычитаем из sumTestXp какой lvl заработали
			let addLevel = Math.floor(sumTestXp / 100);

			// Добавляем к текущему this.lvl полученный addLevel
			if (this.lvl <= addLevel) {
				this.lvl += addLevel;
			}

			// Проверка на максимальный уровень
			if (this.xp >= 10000) {
				this.xp = 10000;
				this.rankWorker = this.arrRanks[this.arrRanks.length - 1];
				this.lvl = 100;
			}
			if (this.lvl >= 100) {
				this.rankWorker = this.arrRanks[this.arrRanks.length - 1];
				this.lvl = 100;
			}

			// Вычитаем оставшиеся xp после всех махинаций:
			// Сумма всех xp за одино задание (вызов learn(n)) - кол-во уровений * 100
			let remainsXP = sumTestXp;
			this.xp = remainsXP;

			// Проверка: каждый 10 lvl вручать ранг
			let indexFromRank = Math.floor(this.lvl / 10);

			// Присваиваем индекс массива в переменную this.rank
			this.rankWorker = this.arrRanks[indexFromRank];
		}
	}
	// Принимает массив, включающий три значения:
	// [описание; очки опыта; минимальный ранг, который допускается к этому обучению]
	// ["Капец какя сложная задача", 9000, 1]
	// Должна вернуть описание
	training(arr) {
		//['Капец какя сложная задача', 9000, 1]
		// возвращает 1 аргумент массива arr[0]
		if (this.lvl >= arr[2]) {
			let prevXp = this.xp;
			this.xp += arr[1];
			this.trainingAndLearnFunc(prevXp);
			this.arrAchievements.push(arr[0]);
			// debugger;
			return arr[0];
		}
		return 'Не подрос пока';
	} // return string

	// Функция, реализующая задания
	learn(n) {
		// Правила задания

		// Lvl задания n находится в пределах от 1 до 100
		// иначе недопустимый уровень return Invalid level
		if (!(n >= 1 && n <= 100) == true) return 'Invalid level';

		let returnFrase = '';

		// Вычисляем какой уровень у задания
		let lvlLearn = n;

		let xpFight = 0;
		let prevXp = this.xp;

		// Если задание больше нас на 5 уровней -- проигрыш. функция прерывается :(
		if (lvlLearn - this.lvl >= 5) {
			return this.frases[0];
		} else if (this.lvl - lvlLearn >= 2) {
			return this.frases[1];
		} else if (this.lvl - lvlLearn == 1) {
			xpFight = 5;
			this.xp += xpFight;
			returnFrase = this.frases[2];
		} else if (lvlLearn === this.lvl) {
			xpFight = 10;
			this.xp += xpFight;
			returnFrase = this.frases[2];
		} else {
			let diff = lvlLearn - this.lvl;
			xpFight = 20 * diff * diff;
			this.xp += xpFight;
			returnFrase = this.frases[3];
		}
		// Тут происходит реализация остатка xp, и ранга

		// Сумма xp за бой + уже имеющегося xp
		this.trainingAndLearnFunc(xpFight, prevXp);
		return returnFrase;
	} // return string

	// Функция, возвращающая достижения из функции training:
	// ["Капец какя сложная задача"]
	achievements() {
		return this.arrAchievements;
	} // return arr
}
