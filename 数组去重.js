// https://juejin.im/post/6844903608467587085

/**
双重循环去重
*/

// 实现一
Array.prototype.unique = function() {
	const newArray = []
	let isRepeat;
	for (let i = 0; i < this.length; i++) {
		isRepeat = false;
		for (for j = 0; j < newArray.length; j++) {
			if (this[i] === newArray[j]) {
				isRepeat = true;
				break
			}
		}
		if (!isRepeat) {
			newArray.push(this[i])
		}
	}
	return newArray
}

// 实现二
Array.prototype.unique = function() {
	const newArray = []
	let isRepeat;
	for (let i = 0; i < this.length; i++) {
		isRepeat = false;
		for (let j = i +1; j < this.length; j++) {
			if (this[i] === this[j]) {
				isRepeat = true;
				break
			}
		}
		if (!isRepeat) {
			newArray.push(this[i])
		}
	}
	return newArray
}

// 改进版
Array.prototype.unique = function () {
	const newArray = [];

	for (let i = 0; i < this.length; i ++) {
		for (let j = i +1 ; j < this.length; j++) {
			if (this[i] === this[j]) {
				j = ++i
			}
		}
		newArray.push(this[i])
	}

	return newArray
}

/*
Array.prototype.indexOf()

*/

/*
实现一：

利用Array.prototype.filter()过滤功能
Array.prototype.indexOf()返回的是第一个索引值
只将数组中元素第一次出现的返回
之后出现的将被过滤掉
*/ 

Array.protoptye.unique = function () {
	return this.filter((item, index)=>{
		reutrn this.indexOf(item) === index
	})
}

/*
实现二：
*/
Array.prototype.unique = function () {
	const newArray = []
	this.forEach(item => {
		if (newArray.indexOf(item) === -1) {
			newArray.push(item)
		}
	})
	return newArray;
}

/*
Array.prototype.includes()

*/
Array.prototype.unique = function () {
	const newArray = [];
	this.forEach(item => {
		if (!newArray.includes(item)) {
			newArray.push(item)
		}
	})
	return newArray;
}

/*
Array.prototype.reduce()

*/
Array.prototype.unique = function () {
	return this.sort().reduce((init, current) => {
		if (init.length === 0 || init[init.length -1] !== current) {
			init.push(current)
		}
		return init
	}, [])
}

/*
对象键值对
基本思路：利用了对象的key不可以重复的特性来进行去重。
但需要注意：

无法区分隐式类型转换成字符串后一样的值，比如 1 和 '1'
无法处理复杂数据类型，比如对象（因为对象作为 key 会变成 [object Object]）
特殊数据，比如 'proto'，因为对象的 proto 属性无法被重写
*/

// 解决第一、第三点问题，实现一：
Array.prototype.unique = function () {
	const newArray = [];
	const tmp = {}
	for (let i = 0; i<this.length; i++) {
		if (!tmp[typeof this[i] + this[i]]) {
			tmp[typeof this[i] + this[i]] = 1;
			newArray.push(this[i])
		}
	}
	return newArray;
}

// 解决第二点问题，实现二：
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    // 使用JSON.stringify()进行序列化
    if (!tmp[typeof this[i] + JSON.stringify(this[i])]) {
      // 将对象序列化之后作为key来使用
      tmp[typeof this[i] + JSON.stringify(this[i])] = 1;
      newArray.push(this[i]);
    }
  }
  return newArray;
}


/*
Map

*/ 
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = new Map();
  for(let i = 0; i < this.length; i++){
        if(!tmp.get(this[i])){
            tmp.set(this[i], 1);
            newArray.push(this[i]);
        }
    }
    return newArray;
}


Array.prototype.unique = function () {
  const tmp = new Map();
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1);
  })
}

/*
Set
*/ 
Array.prototype.unique = function () {
  const set = new Set(this);
  return Array.from(set);
}


Array.prototype.unique = function () {
  return [...new Set(this)];
}

// 除了考虑时间复杂度外、性能之外，还要考虑数组元素的数据类型（例如下面的例子）等问题权衡选择出采用哪种算法
const arr = [1, 1, '1', '1', 0, 0, '0', '0', undefined, undefined, null, null, NaN, NaN, {}, {}, [], [], /a/, /a/];

// 经过综合考虑，最优的数组去重算法是采用Map数据结构实现的算法

















































