// 一、typeof 直接返回数据类型字段，但是对于null、array、object来说，使用typeof都会统一返回object字符串。

typeof 1			// "number"
typeof NaN			// "number"
typeof "1"			// "string"
typeof true			// "boolean"
typeof undefined	// "undefined"
typeof null			// "object"
typeof []			// "object"
typeof {}			// "object"
typeof console.log	// "function"
// 其中 null, [], {}, function都返回 "object"




/*/ 二、instanceof 判断某个实例是不是属于原型
 instanceof用于判断“引用类型”属于哪个构造函数的方法
 在这里需要特别注意的是：instanceof 检测的是原型
 注意，instanceof可以准确的判断复杂数据类型，但是不能正确判断基本数据类型
*/ 
// 构造函数
function Fruit(name, color) {
    this.name = name;
    this.color = color;
}
var apple = new Fruit("apple", "red");

// (apple != null)
apple instanceof Object  					// true
apple instanceof Array   					// false
2 instanceof Number 						// false
true instanceof Boolean 					// false
'str' instanceof String 					// false
[] instanceof Array 						// true
function(){} instanceof Function 			// true
{} instanceof Object 						// true





// 三、使用 Object.prototype.toString.call()判断
//call()方法可以改变this的指向，那么把Object.prototype.toString()方法指向不同的数据类型上面，返回不同的结果
// 从深入到通俗：Object.prototype.toString.call(): https://zhuanlan.zhihu.com/p/118793721

// 缺点：很明显这种方法不能准确判断person是Person类的实例，而只能用instanceof 操作符来进行判断
// 方法疑问解答：https://blog.csdn.net/weixin_39927080/article/details/79203002

Object.prototype.toString.call(1)					// "[object Number]"
Object.prototype.toString.call(NaN);				// "[object Number]"
Object.prototype.toString.call("1");				// "[object String]"
Object.prototype.toString.call(true)				// "[object Boolean]"
Object.prototype.toString.call(null)				// "[object Null]"
Object.prototype.toString.call(undefined)			// "[object Undefined]"
Object.prototype.toString.call(function a() {});	// "[object Function]"
Object.prototype.toString.call([]);					// "[object Array]"
Object.prototype.toString.call({});					// "[object Object]"




// 最后我们可以定义一个完美的判断数据类型的方法 _typeof()

function _typeof(obj){
  var s = Object.prototype.toString.call(obj);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

_typeof([12,3,343]);				// "array"
_typeof({name: 'zxc', age: 18});	// "object"
_typeof(1);							// "number"
_typeof("1");						// "string"
_typeof(null);						// "null"
_typeof(undefined);					// "undefined"
_typeof(NaN);						// "number"
_typeof(Date);						// "function"
_typeof(new Date());				// "date"
_typeof(new RegExp());				// "regexp"


// 方法四：
// constructor属性，可以得知某个实例对象，到底是哪一个构造函数产生的。
// constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，
// 一般会同时修改constructor属性，防止引用的时候出错。所以，修改原型对象时，一般要同时修改constructor属性的指向。
// 注意：
// 1、null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。
// 2、函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object
console.log('22'.constructor === String)             // true
console.log(true.constructor === Boolean)            // true
console.log([].constructor === Array)                // true
console.log(document.constructor === HTMLDocument)   // true
console.log(window.constructor === Window)           // true
console.log(new Number(22).constructor === Number)   // true
console.log(new Function().constructor === Function) // true
console.log((new Date()).constructor === Date)       // true
console.log(new RegExp().constructor === RegExp)     // true
console.log(new Error().constructor === Error)       // true



// 方法五：
// "纯对象"的判断
// 所谓"纯对象"，指通过 "{}" 或 "new Object"创建的对象（没有原型的对象也是一个"纯对象"）。
// 由于 "纯对象"与其他对象如null，数组等，使用 typeof 检测时都会返回 object，因此为了把 "纯对象"区分出来，
// 我们可以学习一下jQuery的 isPlainObject 方法
// Object.prototype 属性表示 Object 的原型对象。
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

























