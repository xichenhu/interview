// 比较一维数组

const array1 = [1, 30, 39, 29, 10, 13];
const array2 = [30, 1, 39, 29, 10, 13];

function isEqual(array, comparisonValue){
	if (array.length === comparisonValue.length) {
		return array.every((currentValue) => comparisonValue.includes(currentValue))
	} else {
		return false
	}
};

isEqual(array1, array2); // true


// 比较二维数组
const map1 = [
  {label: 'CREDIT_FAILURE', value: '01'},
  {label: 'DISBURSE_SUCCESS', value: '02'},
]
const map2 = [
  {label: 'CREDIT_FAILURE', value: '01'},
  {label: 'DISBURSE_SUCCESS', value: '02'},
  {label: 'CANCEL_LOAN', value: '03'},
]

function isEqualComplex(array, comparisonValue) {
	return JSON.stringify(array) === JSON.stringify(comparisonValue)
}
isEqualComplex(array1, array2);

