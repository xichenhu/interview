/*
	1、堆
		堆是一种数据结构，是利用完全二叉树维护的一组数据，

*/

/*
	2、栈
		栈是仅限在表尾进行插入和删除操作的线性表。

*/

/*
	3、队列
		队列允许在表的前端进行删除操作，在表的队尾进行插入操作，先进先出。

*/

/*
	4、Event Loop
		JavaScript中的任务被分为宏任务（macrotask）和微任务（microtask）。
		
		1、宏任务：script的全部代码、setTimeout、setInterval、I/O、UI render

		2、微任务：Process.nextTick(Node独有)、Promise、MutaionObserver

*/

/*
	4、浏览器的Event Loop
		JavaScript有一个main thread 主线程 和 all-stack 调用栈（执行栈），所有的任务都会被放到调用栈等待主线程执行。
		
		1、JS调用栈：
			JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到站内被清空。

		2、同步任务和异步任务
			JavaScript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按顺序等待主程序依次执行，异步任务会在异步任务有了结果之后，
			将注册的回调函数放入任务队列中，等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。
		
		3、任务队列，即队列，是一种先进先出的一种数据结构。

*/


任务队列：主程序执行任务队列中的任务，

如果当前任务是同步任务，按顺序放入执行栈，等待主线程依次执行。
如果当前任务是异步任务，异步任务会在异步任务有了结果之后，将注册的回调函数放入 ”任务队列“ 中等待主线程空闲的时候（调用栈被清空），读取到执行栈内，等待主线程的执行。

执行栈


任务是按规则放入执行栈中，主线程从执行中取出任务执行，直到执行栈的任务为空。


执行栈在执行完同步任务之后，检查微任务队列是否为空，如果不为空，会按照先入先出的规则全部执行完微任务后，设置微任务的队列为null，然后在执行宏任务，依次循环。
























