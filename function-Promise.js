/*
	自定义Promise函数模块
*/
(function (window) {
	/*
		excutor:执行器函数（同步）
	*/
	function Promise (executor) {
		const _this = this
		_this.status = 'pending'
		_this.data = undefined
		_this.callbacks = []


		function resolve (value) {
			if (_this.status === 'pending') {
				_this.status = 'resolved'
				_this.data = value
				if (_this.callbacks.length > 0) {
					setTimeout(()=>{
						_this.callbacks.forEach(callbacksObj => {
							callbacksObj.onResolved()
						})
					}, 0)
				}
			}
		};

		function reject (reason) {   
			if (_this.status === 'pending') {
				_this.status = 'rejected'
				_this.data = reason
				if (_this.callbacks.length > 0) {
					setTimeout(()=>{
						_this.callbacks.forEach(callbacksObj => {
							callbacksObj.onRejected()
						})
					}, 0)
				}
			}
		};

		// 
		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}

	};

	/*
		Promise原型对象的then()
	*/
	Promise.prototype.then = function (onResolved, onRejected) {

		// 指定默认失败的回调（实现错误、异常穿透）
		onResolved = typeof onResolved === 'function' ? onResolved : value => value;
		// 指定默认失败的回调（实现错误、异常穿透）
		onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

		const _this = this

		// 返回一一一个新的promise对象
		return new Promise((resolve, reject) => {

			function handle (callback) {
				/**
					1、如果抛出异常，
					2、如果返回的不是一个promise
					3、如果回调函数返回的是promise
				*/
				try {
					const result = callback(_this.data)
					if (result instanceof Promise) {
						result.then(resolve, reject)
					} else {
						resolve(result)
					}
				}catch (error) {
					reject(error)
				}
			};

			if (_this.status === 'pending') {
				_this.callbacks.push({
					onResolved() {
						handle(onResolved)
					},
					onRejected() {
						handle(onRejected)
					}
				})
			} else if (_this.status === 'resolved') {
				setTimeout(()=>{
					handle(onResolved)
				}, 0)
			} else if (_this.status === 'rejected') {
				setTimeout(()=>{
					handle(onRejected)
				}, 0)
			}
		});
	};


	/*
		promise函数对象的catch()
	*/
	Promise.prototype.catch = function (onRejected) {
		return this.then(undefined, onRejected)
	};


	/*
		promise函数对象的resolve()
	*/
	Promise.resolve = function (value) {
		return new Promise((resolve, reject)=>{
			if (value instanceof Promise) {
				value.then(resolve, reject)
			} else {
				resolve(value)
			}
		})
	};


	/*
		promise函数对象的reject()
	*/
	Promise.reject = function (reason) {
		return new Promise((resolve, reject)=>{
			reject(reason)
		})
	};


	/*
		promise函数对象的catch()
	*/
	Promise.all = function (promises) {
		const values = new Array(promises.length)
		let resolveCount = 0

		return new Promise((resolve, reject) => {
			promises.forEach((p, index) => {
				Promise.resolve(p).then(value => {
					resolveCount++
					values[index] = value
					if (resolveCount === promises.length) {
						resolve(values)
					}
				}, reason => {
					reject(reason)
				})
			})
		})
	};


	/*
		promise函数对象的race()
	*/
	Promise.race = function (promises) {
		return new Promise((resolve, reject)=>{
			promises.forEach((p, index) => {
				Promise.resolve(p).then(
					value => {
						resolve(value);
					},
					reason => {
						reject(reason);
					}
				)
			})
		})
	};

	Promise.resolveDelay = function(value, time) {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				if (value instanceof Promise) {
					value.then(resolve, reject)
				} else {
					resolve(value)
				}
			}, time)
		})
	};

	Promise.rejectDelay = function(reason, time) {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				reject(reason)
			}, time)
		})
	}

	// 向外暴露Promise函数
	window.Promise = Promise
})(window)




