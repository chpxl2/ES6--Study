/*==========================================================
    let命令
==========================================================*/

/* let命令的变量仅在该代码块之中有效
  * for循环的计数器，很适合使用let命令
  * result： ReferenceError: i is not defined
  */
for(let i=0; i<10; i++){
}
console.log(i);

/*
  *for使用var时，还是ES5的写法，for代码块没有形成作用域，
  * 所以里面的function不构成闭包，
  * 所以在每一次执行a[i] = function () { console.log(i);}时，
  * 并不会保存当时i的值，所以只有当a[i]()这个函数执行时，才会使i值变现，
  * 这时，function沿着作用域链查找i的值，父作用域就是window，i的值经过十次i++，
  * 已经是10，所以a[6]()会输出10
 */
var a = [];
for (var i = 0; i <10; i++){
  a[i] = function(){
    console.log(i);
  }
}
a[6]();

/*
  * 变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6
  * 用let是ES6语法，for循环代码块构成一个作用域，里面的function形成闭包，
  * function里面可以引用父作用域的变量，引用的是function被定义时的父作用域变量值，所以在每一次执行a[i] = function () { console.log(i);}时，function都保存了当时的i
  * 记住：JavaScript中的函数运行在它们被定义的作用域里，而不是它们被执行的作用域里
  * 所以a[6]()会输出6
 */
var a = [];
for (let i = 0; i < 10; i++){
  a[i] = function(){
    console.log(i);
  }
}
a[6]();

/*
  * for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。
  * result:3次abc
 */
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}

/*
  * 不存在变量提升
  * 之前变量可以在声明之前使用，值为undefined 这种现象多少有些奇怪
  * let改变了语法，所声名的变量一定要在声明后使用，否则报错
  * result1：undefined
  * result2: 报错ReferenceError (应用错误)
 */
console.log(foo);
var foo = 2;
console.log(bar);
let bar = 2;

/*
  * 暂时性死区 temporal dead zone，简称 TDZ
  * 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
  * 下面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。
  * ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错
  * 这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。
  * 总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
 */
var tmp = 123;
if (true) {
    tmp = 'abc';
    let tmp
}
function bar(x = y, y = 2) {
  return [x, y];
}

bar();

/*
  * 6：不允许重复声明
  * let不允许在相同的作用域内，重复声明同一个变量
  * result:都报错 Uncaught SyntaxError: Identifier 'a' has already been declared
 */
/* function a() {
  let a = 10;
  let a = 1;
}
function b(){
  let a = 10;
  var a = 1;
} */




