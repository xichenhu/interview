// Array中reduce的使用方法
/*
	total: 初始值或计算后返回的值
	currentValue: 当前元素
	currentIndex: 当前元素的索引
	arr: 当前元素所属的数组对象
	initialValue: 传入total的初始值
*/
array.reduce(function(total, currentValue, currentIndex, arr), initialValue);




/*

输入：
var str = "{{name}}很厉害，才{{info.age}}岁，他才华横溢,这是第{{info.ll.cc}}首歌了。";
var obj = {name: '周杰伦', info: { age: 30, ll: { cc: '337' } }};

输出：周杰伦很厉害，才30岁，他才华横溢，这是第337首歌了。

*/

var str = "{{name}}很厉害，才{{info.age}}岁，他才华横溢,这是第{{info.ll.cc}}首歌了。";
var obj = {name: '周杰伦', info: { age: 30, ll: { cc: '337' } }};
var lableO = [];
var deep = 0;

// 方法一：
function replaceFn(objInit) {
	for(let key in objInit) {
		lableO.push(key);
		if (objInit[key] instanceof Object) {
			deep++;
			replaceFn(objInit[key]);
		} else {
			str = str.replace(/[\{,\}]/g, "").replace(lableO.join('.'), objInit[key]);
			lableO = lableO.slice(0, deep);
		}	
	}
};
replaceFn(obj);
console.log(str);


// 方法二：
str.replace(/\{\{(.*?)\}\}/g, (m, $1) => $1.split('.').reduce((acc, current) => acc[current], obj));

