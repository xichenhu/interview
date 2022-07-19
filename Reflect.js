// reflect 存在的目的
/*
1、存放Object的内部方法
2、修改Object方法的返回结果： Object.defineProperty(obj, name, desc)
3、让Object操作变成函数行为：Reflect.has(obj, name)；Reflect.deleteProperty(obj, name)
4、完成默认行为，作为修改行为的基础。Reflect对象的方法和Proxy对象的方法一一对应。
	有了Reflect对象以后，很多方法变得简单易读：
	// 老写法
	Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
	// 新写法
	Reflect.apply(Math.floor, undefined, [1.75]) // 1
*/