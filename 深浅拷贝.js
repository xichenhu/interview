// 对于基本类型不存在深浅拷贝之分，深浅拷贝是针对引用类型的

// 浅拷贝：只是复制引用，而没有复制真正的值

// 深拷贝：对目标的完全拷贝，复制的是对象的值。深拷贝之后对象之间互不影响。
/*
	深拷贝的方法：
	1、利用JSON对象中的parse和stringify
		1>、JSON.stringify ：undefined、function、symbol 会在转换过程中被忽略。。。。

	2、利用递归来实现每一层都重新创建对象并赋值
		1>、递归的思想是对数据的每一层都实现一次 ”创建对象--->对象赋值“ 
*/

function deepclone (source) {
	const targetObj = source.constructor === Array ? [] : {}
	for (let keys in source) {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = source[keys].constructor === 'Array' ? [] : {}
			targetObj[keys] = deepclone(source[keys])
		} else {
			targetObj[keys] = source[keys]
		}
	}
	return targetObj
}

// JavaScript中的拷贝方法
// concat：只是对对象的第一层进行深拷贝
// slice：只是对对象的第一层进行深拷贝
// Object.assgn：拷贝的是属性值，假如原对象的值是一个指向对象的引用，它也只拷贝那个引用值。
// ...展开运算符：实现的是第一层拷贝，后面拷贝的是引用的值。

/*
	首层浅拷贝
*/
function shawllowClone(source) {
	const targetObj = source.constructor === Array ? [] : {}
	for(let keys in source) {
		if (source.hasOwnProperty(keys)) {
			targetObj[keys] = source[keys]
		}
	}
	return targetObj;
}

/*
	总结：
		1、赋值运算符= 实现的是浅拷贝，只拷贝对象的引用值。
		2、JavaScript中数组和对象自带的拷贝方法都是”首层浅拷贝“。
		3、JSON.stringify 实现的是深拷贝，但对目标对象有要求。
		4、若想实现真正意义上的深拷贝，请使用递归。
*/



















