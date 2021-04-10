export function generateArray(lens) {
  const arr = new Array(lens);
  for (let i=0; i<lens; i++) {
    arr[i] = Math.random();
  }
  return arr;
}