// 快速排序
var quickSort = function(arr) {
	if (arr.length <= 1) return arr;
	var compIndex = Math.floor(arr.length/2);
	var comData = arr.splice(compIndex,1)[0];
	var left = [];
	var right = [];

	for(let i = 0; i < arr.length; i++) {
		if (arr[i] < comData) {
			left.push(arr[i])
		} else {
			rigth.push(arr[i])
		}
	}
	return quickSort(left).concat([comData],quickSort(right))
}

// 插入排序
var sort = function (arr) {
	for (let i = 1; arr < arr.length; i++) {
		var insertValue = array[i]
		var j = i - 1;
		for (; j >=0 && insertValue < array[j]; j--) {
			array[j+1] = array[j]
		}
		array[j+1] = insertValue
	}
}