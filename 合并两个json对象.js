// 浅层——只能合并一层对象属性
// a = {name: 'hu', age: '18', sex: 'nv',family: {didi:'hu'}
// b = {school: 'hebei', family: {mum: 'dai',bab: 'hu'}}

const isObject = value => toString(value) === '[object Object]'

const merage = (a, b) => {
  for (let item in b) {
    if (isObject(b[item])) {
      a[item]=merage(a[item],b[item])
    }else{
      a[item]=b[item]
    }
  }
  return a
}

// 深层合并
function deepMerge(obj1, obj2) {
  let key;
  for (key in obj2) {
    obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]"
      ? this.deepMerge(obj1[key], obj2[key])
      : (obj1[key] = obj2[key]);
  }
  return obj1;
};




// 浅拷贝
var obj = {
	a: 1,
	b: 2,
	c: 3
};

// 方法一：
// 缺点：如果是多层对象，第二层拷贝的依然是对象的引用，只适用于一层拷贝
var obj2 = Object.assign({}, obj);


// 深拷贝
var obj = {
	a: 1,
	b: 2,
	c: 3
};

// 方法一：
// 缺点：使用JSON.stringify()以及JSON.parse()它是不可以拷贝 undefined ， function， RegExp 等等类型的
var objString = JSON.stringify(obj1);
var obj2 = JSON.parse(objString);

// 方法二
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}


//方法三：兼容性好
function deepClone(obj) {
    var o = obj instanceof Array ? [] : {};
    for(var k in obj) {
        //有bug（属性的值为null时）
        //o[k] = typeof obj[k] === 'object'?deepClone(obj[k]):obj[k];
        if(typeof obj[k] === 'object' && obj[k] != undefined) {
            o[k] = deepClone(obj[k]);
        } else if(typeof obj[k] === 'object' && obj[k] == undefined) {
            o[k] = null;
        } else {
            o[k] = obj[k];
        }
    }
    return o;
}


// 写法四：
const isObject=obj=>Object.prototype.toString.call(obj) === '[object Object]'
const deepClone = (obj) => {
  //基础数据类型是值传递
  let arr = ['string', 'number', 'boolean', 'undefined']
  if (arr.some(val => typeof obj == val)) {
    return obj
  }
  //数组
  let cobj;
  if (Array.isArray(obj)) {
    cobj = obj.map(val => deepClone(val))
  }else{
    if (isObject(obj)) {
      let ret={};
      for (let item in obj) {
          ret[item]=deepClone(obj[item])
      }
      return ret
    }
  }
  return cobj
}
console.log(deepClone({a:1,b:{a:1},c:3}))


function cloneObj(obj) {
  var result = Object.create(null);
  for (var i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      result[i] = obj[i];
    }
  }
  return result;
}


