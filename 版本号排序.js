var arr = ['0.1.1', '2.3.3', '0.3002.1', '4.2', '4.3.5', '4.3.4.5']

arr.sort((a,b)=>{
    var items1 = a.split('.')
    var items2 = b.split('.')
    var k = 0
    for (let i in items1) {
      let a1 = items1[i]
      let b1 = items2[i]
      if (typeof a1 === undefined) {
        k = -1
        break
      } else if (typeof b1 === undefined) {
        k = 1
        break
      } else {
        if (a1 === b1) {
          continue
        }
        k = Number(a1) - Number(b1)
        break
      }
    }
    return k
})

console.log(arr)