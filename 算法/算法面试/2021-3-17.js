一、问题

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

示例 1：


输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：


输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。



var a = [[1,3],[7,9],[2,6]]

var merge = function(intervals) {
  let arrays = intervals.sort(function(a, b) { return a[0] - b[0]})
  let merge = [arrays.shift()]
  arrays.forEach(i => {
    let last = merge[merge.length - 1]
    if (i[0] > last[1]) {
      merge.push(i)
    } else {
      last[1] = last[1] > i[1] ? last[1] : i[1]
    }
  });
  return merge
};

merge(a)
