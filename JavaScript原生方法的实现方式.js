
// 实现map方法
const selfMap = function (fn, context) {
	let arr = Array.prototype.slice.call(this); // 目的把具有length属性的类数组转化成数组
	let mappeArr = Array()
	for(let i=0; i<arr.length; i++) {
		if (!arr.hasOwnProperty(i)) {
			continue
		}
		mappedArr[i] = fn.call(context, arr[i], i, this)
	}
	return mappedArr
}
// 实现
const selfMap = function (fn, context) {
	let arr = Array.prototype.slice.call(this);
	return arr.reduce((pre,cur,index) => {
		return [...pre, fn.call(context, cur, index, this)]
	}, [])
}

// 实现数组filter方法
const selfFilter = function () {
	fn.call(context, cur,inde,this)
}