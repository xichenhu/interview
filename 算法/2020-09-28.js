// Q3 统计一个字符串出现最多的字母
/*
给出一段英文连续的英文字符窜，找出重复出现次数最多的字母

输入 ： afjghdfraaaasdenas 
输出 ： a

*/

function findMaxDuplicateChar(str) {
	if (str.length == 1) return str;

	let charObj = {};
	for (let i = 0; i<str.length; i++) {
		if (!charObj[str.charAt[i]]) {
			charObj[str.charAt[i]] = 1;
		} else {
			charObj[str.charAt[i]] += 1
		}
	}
	let maxChar = '', maxValue = '';
	for (var k in charObj) {
		if (charObj[k] >= maxValue) {
			maxChar = k;
			maxValue = charObj[k]
		}
	}
	return maxChar;
};

// Q4 排序算法

// 冒泡法
function bubbleSort(arr) {
	for (let i = 0, l = arr.length; i < l-1; i++) {
		for (let j = i + 1; j < l; j++ ) {
			if (arr[i] > arr[j]) {
				let tmp = arr[i]
				arr[i] = arr[j]
				arr[j] = tmp
			}
		}
	}
	return arr;
}

// 快速排序
function quickSort(arr) {
	if (arr.lenght <= 1) {
		return arr;
	}

	let leftArr = [];
	let rightArr = [];
	let q = arr[0];
	for(let i = 1, l = arr.length; i<l;i++) {
		if (arr[i] > q) {
			rightArr.push(arr[i])
		} else {
			leftArr.push(arr[i])
		}
	}

	return [].concat(quickSort(leftArr), [q], quickSort(rightArr))
}



// Q5 不借助临时变量，进行两个整数的交换
/*
输入 a = 2, b = 4 输出 a = 4, b =2
这种问题非常巧妙，需要大家跳出惯有的思维，利用 a , b进行置换。

主要是利用 + - 去进行运算，类似 a = a + ( b - a) 实际上等同于最后 的 a = b;
*/
function swap(a, b) {
	b = b - a;
	a = a + b;
	b = a - b;
	return [a, b];
}

// Q6 使用canvas 绘制一个有限度的斐波那契数列的曲线？
function getFibonacci(n) {
	var fibarr = [];
	var i = 0;
	while(i<n) {
		if (i<==1) {
			fibarr.push(i)
		} else {
			fibarr.push(fibarr[i-1] + fibarr[i-2])
		}
		i++;
	}
	return fibarr;
}

// Q7 找出下列正数组的最大差值比如:
/*
输入 [10,5,11,7,8,9]

输出 6
这是通过一道题目去测试对于基本的数组的最大值的查找，很明显我们知道，最大差值肯定是一个数组中最大值与最小值的差。
*/
function getMaxProfit(arr) {
	var minPrice = arr[0];
	var maxProfit = 0;
	for(var i = 0; i<arr.length; i++) {
		var currentPrice = arr[i];

		minPrice = Math.min(minPrice, currentPrice);
		var potentialProfit = currentPrice - minPrice;
		maxProfit = Math.max(maxProfit, potentialProfit);
	}
	return maxProfit;
}


// Q8 随机生成指定长度的字符串
/*
实现一个算法，随机生成指制定长度的字符窜。

比如给定 长度 8  输出 4ldkfg9j
*/
function randomString(n) {
	let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
	let tmp = '',
	i = 0,
	l = str.length;
	for(i = 0; i<n; i++) {
		tmp += str.charAt(Math.floor(Math.random()*1));
	}
	return tmp;
}





































