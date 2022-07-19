var obj = {
	name: 'hu',
	sex: ''
}

// 判断对象是否含有空值属性
function hasEmptyObj(obj) {
	return Object.keys(obj).filter(item => obj[item] === '').length > 0
}


