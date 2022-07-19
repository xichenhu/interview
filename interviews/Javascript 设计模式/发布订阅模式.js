class MyEventEmmiter {
    constructor() {
        this.event = {}
    }
    // 监听
    on(type, listener) {
        if (this.event[type]) {
            this.event[type].push(listener)
        } else {
            this.event[type] = [listener]
        }
    }
    // 发送监听
    emit(type, ...rest) {
        if (this.event[type]) {
            this.event[type].map(fn=>fn.apply(this,rest))
        }
    }
    // 移除监听器
    removeListener(type) {
        if (this.event[type]) {
            delete this.event[type]
            console.log(this.event)
        }
    }
    // 移除所有监听器
    removeAllListener() {
        this.event = {}
    }
}

var MyEvent = new MyEventEmitter();
MyEvent.$emit(事件名, 数据);