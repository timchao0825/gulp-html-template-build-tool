// es5 area
$(document).ready(function(){
// con===============================================================================================
// console.log('index js. here test test');
// setTimeout(function(){ console.log('index es5 js.'); }, 3000);
console.log('test 111 33333');
// ===============================================================================================
});/* end document */



// es6 test  area
setTimeout(() => { console.log("es6 to es2015 FTW"); }, 1000);
let NewOneWithParameters = (a, b) => {
  console.log( a + b + ' == number =='); 
 }
 NewOneWithParameters(10, 50);
 
 let SumElements = (arr) => {
  console.log(arr); // [10, 20, 40, 60, 90]
  let sum = 0;
  for (let element of arr) {
   sum += element;
  }
  console.log(sum); // 220
 }
 SumElements([10, 20, 40, 60, 90]);

var map = new Map();
for (let element of map) {
 console.log(element);
}