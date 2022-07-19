/*
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
*/

/*
1、两个链表都是逆序，可以按位相加;
2、逐位计算它们的和，并与当前位置的进位carry相加。和为n1 + n2 + carry，当前为链表处的数字为（n1 + n2 + carry）% 10，而新的进位为（n1+n2+carry）/ 10;
3、如果两个链表的长度不同，则可以认为长度短的链表的后面有若干个0；
4、如果链表结束后，有carry > 0，还需要在答案链表的后面附加一个节点，节点的值为carry。
*/
var addTwoNumbers = function(l1, l2) {
	let head = null, tail = null;
	let carry = 0;
	while(l1 || l2) {
		const n1 = l1 ? l1.val : 0;
		const n2 = l2 ? l2.val : 0;
		const sum = n1 + n2 + carry;
		if (!head) {
			head = tail = new ListNode(sum % 10);
		} else {
			tail.next = new ListNode(sum % 10);
			tail = tail.next;
		}
		carry = Math.floor(sum/10);
		if (l1) {
			l1 = l1.next;
		}
		if (l2) {
			l2 = l2.next;
		}
		if (carry > 0) {
			tail.next = new ListNode(carry);
		}
	}
	return head;
};















