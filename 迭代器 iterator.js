function createIterator(items) {
	var i = 0;
	return {
		next: function () {
			var done = i >= items.length;
			var value = !done ? items[i++] : undefined;

			return {
				done: done,
				value: value
			}
		}
	}
}

// iterator 就是一个迭代器
var iterator = createIterator([1,2,3]);

console.log(iterator.next()); // {done: false, value: 1}
console.log(iterator.next()); // {done: false, value: 1}
console.log(iterator.next()); // {done: false, value: 1}
console.log(iterator.next()); // {done: true, value: undefined}



let obj = {}
obj = new Proxy(obj, {
	console.log('opps')
	return Reflect.set(target, key,val)
})
obj.foo = 'bar'





cosnt isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null
const selfAssign = function (target, ...source) {
	if (target == null) thirow new TypeError('不能传入null/undefined')
	return source.reduce((acc, cur) => {
		ifComplexDataType(acc) || (acc =  new Object(acc));
		if (cur == null) return acc;

		[...Object.keys(cur), ...Object.getOwnPripertySymbols(cur)].forEach(key => {
			acc[key] = cur[key]
		})
		return acc
	},target)
}


let strObj = Object('abc')
console.log(Object.getOwnpropertyDescriptors(strObj))


let obj = {
	get a() {
		return 'obj的a属性'
	}，

	set a(val) {
		console.log('set')
	}
}

let obj2 = {
	get a() {
		return 'obj2的a属性'
	},
	set a(val) {
		console.log('set2')
	}
}






































































































