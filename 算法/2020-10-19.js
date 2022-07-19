/*
給你n个非负整数a1,a2,……,an,每个数代表坐标中的一个点（i, ai）。在坐标内画n条垂直线，
垂直线i的两端点分别为（i,ai）和（i, o)。找出其中的两条线，使得它们与x轴共同构成的容器可以容纳最多的水。

说明： 你不能倾斜容器，且n的值至少为2。
图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

示例：

输入：[1,8,6,2,5,4,8,3,7]
输出：49
*/

/*
容纳的水量 = 两个指针指向的数字中较小值min(x,y) * 指针之间的距离t
*/

var maxArea = function (height) {
	var i = 0, j = height.length - 1, max = 0;
	while (i < j) {
		max = Math.max(max, (j - i) * (height[i] > height[j] ? height[j--] : height[i++]))
	}
	return max
}

























