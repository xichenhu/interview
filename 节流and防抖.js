
// 节流 （图片拖动）

function throttle (func, wait) {
	let previrous = 0;
	return () => {
		var now = Date.now();
		var args = arguments;
		if (now - previrous > wait) {
			func.apply(this, args);
			previrous = now
		}
	} 
}

function throttle (func, wait) {
	var timeout;
	return function() {
		var args = arguments;
		var context = this;
		if (!timeout) {
			timeout = setTimeout(function() {
				timeout = null;
				func.apply(context, args);
			}, wait)
		}
	}
}

// const handlerChange = throttle(function() {alert("触发更新")}, 3000);
// document.querySelector('input').addEventListener('input', handlerChange);				

function debounce(fn, delay) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 防抖（输入框输入时调用API）
function debounce(fn, delay = 200) {
	let timer;
	return function () {
		timer && clearTimeout(timer);
		timer = setTimeout(fn.bind(this), delay, ...arguments)
	}

}

const handlerChange = debounce(function() {alert("触发更新")});
document.querySelector('input').addEventListener('input', handlerChange);



function throttle(fn, threshhold = 200) {
	let timer;
	let start = new Date();
	return function() {
		const current = new Date - 0
		timer && clearTimeout(timer);
		if (current - start >= threshhold) {
			fn.call(this, ...arguments);
			start = current
		} else {
			timer = setTimeout(fn.bind(this), threshhold, ...arguments);
		}
	}
}

const handleMousemove = throttle(function(){alert("触发事件")})
document.querySelector('input').addEventListener('input', handleMousemove);

// https://www.lagou.com/lgeduarticle/120749.html

// 好文档：https://www.jianshu.com/p/566c66aafa22
