/*
给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。
*/
/*
题意解读

random是一个指针，指向链表中随意一个位置，这会导致在创建链表的过程中，它可能会指向一个还没有创建的节点，为此可以先创建一个普通链表，再来解决指针的指向问题。

*/

var copyRandomList = function(head) {
	if (!head) {
		return null
	}
	let p = head, cur = new Node(head.next,null,null), node = cur, map = new Map();
	while(p) {
		cur.next = p.next ? new Node(p.next.val, null, null) : null;
		map.set(p, cur);
		cur = cur.next;
		p = p.next
	}

	p = head;
	cur = node;
	while(cur) {
		cur.random = p.random ? map.get(p.random) : null
		cur = cur.next
		p = p.next
	}
	return node
}


// head是出发的子节点
var copyRandomList = head => {
	if (!head) return null;
	let curr = head, node = new Node(), tmp = node, map = new Map();
	while (curr) {
		tmp.val = curr.val
		tmp.next = curr.next ? new Node() : null;
		map.set(curr, tmp);
		tmp = tmp.next
	}
	tmp = node
	while (head) {
		tmp.random = head.random ? map.get(head.random) : null
		head = head.next
		tmp = tmp.next
	}
	return node
}

var copyRandomList = function (head) {
	let copy = head;
	let newHead = new Node();
	let newCopy = newHead
	while(copy) {
		newCopy.next = new Node(copy.val);
		copy = copy.next;
		newCopy = newCopy.next
	}
	copy = head
	newCopy = newCopy.next
	while(copy) {
		if (copy.random) {
			newCopy.random = getRandom(head, newHead.next, copy.random);
		}
		copy = copy.next;
		newCopy = newCopy.next;
	}
	return newHead.next
}

var getRandom = function(h1, h2, r1) {
	while(h1) {
		if (h1 == r1) {
			return h2
		}
		h1 = h1.next
		h2 = h2.next
	}
	return null;
}



/* 反转一个单链表 */
/*
示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
*/
var reverseList = function(head) {
	var p = null, n = head;
	while (n != null) {
		[tmp, n.next] = [n.next, p]
		p = n, n = tmp
	}
	return p
}






























