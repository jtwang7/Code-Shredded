function flat(arr) {
  return arr.toString().split(',').map(ch => parseInt(ch));
}




// test
console.log(flat([1,2,3,[4,5,[6,7,8]]]));