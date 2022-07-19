var util = {}


/*.  jsonp*/

util.getName = function (prefix) {
	return prefix + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

util.createScript = function (url, script) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	charset && script.setAttribute('charset', charset);
	script.setAttribute('src', url);
	script.async = true;
	return script;
}

util.jsonp = function (url, onsuccess, onerror, charset) {
	var callbackName = util.getName('tt_player');
	window[callbackName] = function () {
		if (onsuccess && util.isFunction(onsuccess)) {
			onsuccess(arguments[0])
		}
	}

	var script = util.createScript(url + '&callback=' + callbackName, charset);
	script.onload = script.onreadystatechange = function () {
		if (!script.readyState || /loaded|complete/.test(script.readyState)) {
			script.onload = script.onreadystatechange= null;
			if (script.parentNode) {
				script.parentNode.removeChild(script)
			}
			window[callbackName] = null;
		}
	};
	script.onerror = function () {
		if (onerror && util.isFunction(onerror)) {
			onerror()
		}
	};
	document.getElementsByTagName('head')[0].appendChild(script);
}




// 简版 jsonp
function removeScript(scriptId) {
    const script = document.getElementById(scriptId);
    document.getElementsByTagName('head')[0].removeChild(script);
}

function clearFunction(functionName) {
    try {
        delete window[functionName];
    } catch (e) {
        window[functionName] = undefined;
    }
}

function call(url) {
    return new Promise(function(resolve, reject) {
        var callbackFunction = 'callbackFunc' + Math.ceil(Math.random() * 100000000000000000);
        url += (url.indexOf('?') === -1) ? '?' : '&';
        const jsonpScript = document.createElement('script');
        jsonpScript.setAttribute('src', `${url}callback=${callbackFunction}`);
        scriptId = callbackFunction;
        jsonpScript.id = scriptId;
        document.getElementsByTagName('head')[0].appendChild(jsonpScript);

        window[callbackFunction] = function(data) {
            console.log('--------------------------------');
            removeScript(scriptId);
            clearFunction(callbackFunction);
            resolve(data);
        }
    });
}

//这里我后台用的sails,返回的类似于这样子：callbackFunc20461582336288720({"a":'aa','b':'bb'})
call("http://localhost:1337/test/test1").then(function(data) {
    console.log(data);
}).catch(function(error) {
    console.log(error);
})




/*.  hash*/

// 利用hash，场景是当前页面A， 通过iframe或iframe嵌入了跨域的页面B
// 在A 中伪代码如下
var B = document.getElementsByTagName('iframe')[0];
B.src = B.src + '#' + 'data';
// 在B中的伪代码如下
window.onhashChange = function () {
	var data = window.location.hash
}



/*.  postMessage*/

// 窗口A（http://A.com）向跨域窗口B（http://B.com）发送信息
// Bwindow：选中B窗口下的window对象
Bwindow.postMessage('data字符串数据', 'http://B.com');
// 在窗口B中监听
window.addEventListener('message', function (event) {
	console.log(event.origin); // http://A.com
	console.log(event.source); // Bwindow
	console.log(event.data); // data!
}, false)


/*.  webSocket*/

var ws = new webSocket('wss://echo.webSocket.org');

ws.onopen = function (evt) {
	console.log('Connection open……')
	ws.send('Hello webSocket')
}

ws.onmessage = function (evt) {
	console.log('Received Message:' evt.data);
	ws.close()
}

ws.onclose = function (evt) {
	console.log('Connection close……')
}


// CORS 参考阮一峰的跨域配置
/*.  CORS*/
fetch('some/url', {
	method: 'get',
	origin: '*' // 设置跨域
}).then(function(response){

}).catch(function(err){

})






























