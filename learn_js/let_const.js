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
  * 3：for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。
  * result:3次abc
 */
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}

/*
  * 4：不存在变量提升
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
  * 5：暂时性死区 temporal dead zone，简称 TDZ
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


/*==========================================================
    块级作用域
==========================================================*/
/*
  * ES5只有全局作用域和函数作用域 没有块级作用域，这带来很多不合理的场景
  * 由于存在变量提升,导致内部的tmp覆盖了外部的tmp
  * result : undefined
 */
var tmp = new Date();

function f() {
  console.log(tmp);
  if(false) {
    var tmp = "hello word";
  }
}
f();

/*
  * 第二种场景，用来计数的循环变量泄露为全局变量。
  * result:5
 */
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i);

/*
  * ES6的块级作用域
  * let实际上为javascript新增了块级作用域
  * 例子中一个是函数作用域和块级作用域
  * result：5
 */
function f1(){
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n);
}

/*
  * ES6允许块级作用域的任意嵌套
  * result: 报错
 */
{{{{
  {let insane = 'Hello World'}
  console.log(insane);
}}}};

/*
  * 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
 */
(function () {
  var tmp = 111;
}());

{
  let tmp = 111;
}

/*
  * 块级作用域与函数声名
  * 函数能否在块级作用域中声明？这是一个相当令人混淆的问题
  * ES5规定：函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明
  * 但是浏览器没有遵守这个规定，所以为了兼容以前的代码，ES6支持在块级作用域中声明函数
  * ES6规定，块级作用域之中，函数声明语句的行为类似于let,在块级作用域之外不可引用。
  * 在ES5中，result是 I am inside!
  *       因为if内声明的函数f会被提升到函数头部，实际运行的代码为
          function f() { console.log('I am outside!'); }
          (function () {
            function f() { console.log('I am inside!'); }
            if (false) {
            }
            f();
          }());
  *       在ES6中，result是报错 (但按照理论上是 I am outside！)，实际运行的代码为
          function f() { console.log('I am outside!'); }
          (function () {
            var f = undefined;
            if (false) {
              function f() { console.log('I am inside!'); }
            }

            f();
          }());
  * 疑问：为什么此时 ES6在浏览器环境中跟它所制定的标准不一样呢？？
    答  ：如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6在附录B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
         1:允许在块级作用域内声明函数。
         2:函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
         3:同时，函数声明还会提升到所在的块级作用域的头部。
         注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。
         根据这三条规则，在浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。
  * 兼容写法:考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
 */
function f() {
  console.log('I am outside!');
}
(function () {
  if(false){
    function f() {
      console.log('I am inside!');
    }
  }
  f();
}());

/*==========================================================
    const 命令
==========================================================*/
/*
  * const声明一个只读的常量，一旦声明，常量的值就不能改变
  * 声明的变量不得改变值，这意味着 const一旦声明变量就必须立即初始化，不能留到以后赋值
  * result1: TypeError: Assignment to constant variable
  * result2: SyntaxError: Missing initializer in const declaration
  * const的作用域与let命令相同，只在声明所在的块级作用域内有效
  * 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用
  * const声明的常量，也与let一样不可重复声明
 */
const PI = 3.1415;
PI = 3;

//const foo;

/*
  * const并不是说 变量的值不得改动，而是变量指向的那个内存地址不得改动，
  * 也就是const只能保证这个指针是固定的，至于他指向的数据结构是不是可变的，就完全不能控制了
  * 最后一句会报错 typeError: 'foo'/a  is read-only
  *
 */
const foo = {};
foo.a = 1;
foo.b = 2;
foo = {}；

const a = [];
a.push('hello');
a.length = 0;
a = ['Dave'];

/*
  * 如果想要将对象冻结，应该使用Object.freeze();
  * 常规模式时，下面一行不起作用；
  * 严格模式时，该行会报错
 */
const foo = Object.freeze({});
foo.prop = 123;

/*==========================================================
    ES6 声明变量的六种方法
==========================================================*/
/*
  * ES6声明变量的六种方法
  * 在ES5只有2种声明变量的方法：var 和 function
  * ES6新增了 let 和 const，后面还有import和class,一共有6种
 */


/*==========================================================
    顶层对象的属性
==========================================================*/
/*
  * 顶层对象在浏览器中指的是window对象，在node指的是global对象
  * ES5中，顶层对象的属性赋值与全局变量的赋值是等价的
  * 其实这是javascript语言最大的的设计败笔之一。因为这样带来了几个问题
  * 1) 程序员很容易不知不觉地就创建了全局变量（比如打字出错）
  * 2) 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
  * 3) window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的
  * 4) 没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）
  * ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的全局变量；
  * 另一方面 let命令，const命令，class命令声明的变量，不属于顶层对象的属性
  * 也就是说从ES6开始，全局变量将逐步与顶层对象的属性脱钩
 */
window.a = 1;
a //1

a = 2;
window.a //2