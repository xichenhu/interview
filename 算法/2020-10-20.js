// https://leetcode-cn.com/circle/article/qDaN1Y/
/*
	给你一个包含n个整数的数组nums，判断nums中是否存在三个元素a,b,c,使得a+b+c=0？请你找出所有满足条件且不重复的三元组。
	注意：答案中不可以包含重复的三元组。

	示例：

	给定数组 nums = [-1, 0, 1, 2, -1, -4]，
	满足要求的三元组集合为：
	[
	  [-1, 0, 1],
	  [-1, -1, 2]
	]
*/
var threeSum = function(nums) {
	let res = [];
	let length = nums.length;
	nums.sort((a, b)=> a - b); // 排序，从小到大排序

	if (nums[0] <= 0 && nums[length - 1] >= 0) { // 整个数组同符号，则无解
		for (let i = 0; i < length - 2) {
			if (nums[i] > 0)  break; // 最左侧的值一定是小于0的
			let first = i + 1;
			let last = length - 1;
			do {
				if (first >= last || nums[i] * nums[last] > 0) break
				let result = nums[i] + nums[first] + nums[last]
				if (result === 0) {
					res.push([nums[i], nums[first], nums[last]])
				}
				if (result <= 0) {
					while (first < last && nums[first] === nums[++first]) {}
				} else {
					while (first < last && nums[last] === nums[--last]) {}
				}
			} while (first < last)
			while (nums[i] === nums[++i]) {}
		}
	}
	return res
}






































