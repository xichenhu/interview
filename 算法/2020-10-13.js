/*
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：

给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.
*/

/*
使用2个指针：
	fast快指针提前走n+1步；
	slow指针指向当前距离 fast 倒数第 n 个节点，初始化 head；

然后，fast、slow同步向前走，直到fast.next 为 null
此时，fast为最后一个节点，slow就是倒数第n+1个节点，此时问题就变更为删除链表中的slow的后继节点，
但存在一个问题，当链表长度为n时，fast是前进不到n+1个节点位置的，所以此时有两种解决思路：

	创建一个头结点preHead，设置preHead.next = head，这样就可以解决以上问题，删除倒数第n个节点但存在一个问题，删除倒数第n个节点后，返回的preHead.next即可。
	另一种是，fast快指针提前走n步后，判断fast.next是否为null
*/

var removeNthFormEnd = function (head, n) {
	let preHead = new ListNode(0)
	preHead.next = head;
	let fast = preHead, slow = preHead;
	while(n--) {
		fast = fast.next
	}
	while(fast && fast.next) {
		fast = fast.next
		slow = slow.next
	}

	slow.next = slow.next.next
	return preHead.next
}




var removeNthFormEnd = function(head, n) {
	let fast = head, slow = head;
	while(--n) {
		fast = fast.next
	}
	if (!fast.next) {
		return head.next
	}
	fast = fast.next
	while(fast && fast.next) {
		fast = fast.next
		slow = slow.next
	}
	slow.next = slow.next.next
	return head;
}







/*
给定一个链表，旋转链表，将链表每个节点向右移动k个位置，其中k是非负数。
*/

/*
示例 1:

输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
*/

/*
1、将链表闭合：找到旧的尾部并将其与链表头相连old_tail.next = head，整个链表闭合成环，计算出链表的长度n。
2、找到新的链表尾部，第（n - k % n -1）节点，新的链表头是第（n - k % n）个节点。
3、断开环new_tail.next = None，并返回新的链表头 new_head
*/

const rotateRight = (head, k) => {
	if (!head || !head.next) {
		return head
	}
	let curr = head, n=0;
	// 遍历链表计算其长度
	while(++n && curr.next) {
		curr = curr.next
	}
	k = k % n // 去重
	// 链表右移
	while(k--) {
		curr = head
		while (curr.next.next) {
			curr = curr.next
		}
		// 这里curr是链表的打断位置，即倒数第二项
		curr.next.next = head; // 链表最后一项指向头部形成环
		head = curr.next; // 定位新的头结点
		curr.next = null // 打断链表环
	}
}


const rotateRight = () => {
	if (!head || !head.next) {
		return head
	}
	let curr = head, n = 0
	let hash = new Map()
	while (curr && ++n) {
		hash.set(n, curr)
		curr = curr.next
	}
	k = k % n
	hash.get(n).next = head
	head = hash.get(n-k).next
	hash.get(n-k).next = null
	return head
}


const rotateRight = function (head, k) {
	let fast = head, slow = head
	while (k--) {
		if (fast && fast.next) {
			fast = fast.next
		} else {
			fast = head
		}
	}
	if (slow === fast) {
		return head
	}

	while (fast.next) {
		slow = slow.next
		fast = fast.next
	}

	fast.next = head
	head = slow.next
	slow.next = null
	return head
}


const rotateRight = (head, k) => {
	if (!head) {
		return null
	}
	let curr = head, n = 0
	while (++n && curr.next) {
		curr = curr.next
	}
	curr.next = head
	k = k % n
	while (++k < n) {
		head = head.next
	}
	let tmp = head
	head = head.next
	tmp.next = null
	return head
}




























