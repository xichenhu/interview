// Q1 判断一个单词是否是回文？
/*
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
例如：
输入: 121
输出: true


输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。


输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
*/

/*
提示：
reverse() 方法用于颠倒数组中元素的顺序。
*/

function checkPalindrom(str) {
	return str == str.split('').reverse().join('');
}




// Q2 去掉一组整型数组重复的值
/*
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

例如：
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
*/

/*
提示：
Set构造函数: ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。[...new Set(array)]
Map构造函数: 对象只接受字符串作为键名，为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
*/
function unique(arr) {
    const tmp = new Map();
    return arr.filter(item => {
        return !tmp.has(item) && tmp.set(item, 1)
    })
}


function removeDuplicates(arr) {
	if (arr.length === 0) return 0;
	let newArray = []
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				j = ++i
			}
		}
		newArray.push(arr[i])
	}
	return newArray
}


function circleFbi(n) {
	if (n<3)  return 1;
	var a=1, b=1, c=0;
	for (let i = 0; i<n.length; i++) {
		if (i>1) {
			c = a + b ;
			a = b;
			b = c;
		}
	}
	return c;
}



















