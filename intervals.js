function dataAnalis(intervals) {
	let newArr = [];

	intervals.forEach(element => {
		let arr = element;
		for (let i = arr[0]; i < arr[arr.length - 1]; i++) {
			newArr.push(i);
		}
	});

	return newArr.filter((item, index) => {
		return newArr.indexOf(item) == index;
	}).length;
}
