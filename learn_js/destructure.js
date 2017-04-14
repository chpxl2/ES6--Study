/*==========================================================
    1: 数组的解构赋值
==========================================================*/
/*
  * 基本用法
  * 只要等号两边的模式相同，左边的变量就会被赋予对应的值，
  * 也可以使用Set 结构，对数组的解构赋值
  * foo:1 bar:2 baz:3
  * 如果解构不成功，变量的值等于undefined
  * hhh,pneg:undefined
 */
let [a,b,c] = [1,2,3];
let [foo,[[bar],baz]] = [1,[[2],3]];

let [x, y, z] = new Set(['a', 'b', 'c']);

let [hhh] = [];
let [chen,pneg] = [a];

/*
  * 不完全解构：当左边的模式，只能匹配一部分的等号右边的数组，这种情况下，解构依然可以成功
  * a:1    b:2     d:4
 */
let [a,[b],d] = [1,[2,3],4];
let [x,y] = [1,2,3];

/*
  * 如果等号的右边不是数组（或严格的说，不是可遍历的解构，参见（iterator））,那么将报错
  * 全部报错
 */
let [foo] = 1;
let [foot] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {}

/*
  * 默认值，解构赋值允许指定默认值
  * 并且只有当赋值值严格等于undefined的时候，该变量才会等于默认值
  * 如果默认值是一个表达式，那么表达式是惰性求值的，既只有在用到的时候，才会求值
  * 所以函数f根本就不会被执行
  * 默认值可以引用结构赋值的其他变量，但该变量必须已经声明
  *
 */
let [foo = true] = [];      // foo = true
let [x,y = 'b'] = ['a'];    // x = a  y=b


let [x,y='b']   = ['a',undefined]; // x = a y = b

let [x = 1] = [null]; // x = null

function f() {
  console.log('aaa');
};

let [x = f()] = [1];

let [x = 1,y = x] = []; // x = 1; y = 1;
let [x = 1,y = x] = [2]; // x = 2; y = 2;
let [x = 1,y = x] = [1,2]; // x = 1; y = 2;
let [x = y,y = 1] = []; // referenceError

/*==========================================================
    2: 对象的解构赋值
==========================================================*/
/*
  * 对象的解析原理:先找到同名属性，然后在赋值给对应的变量，真正被赋值的是后者，而不是前者，
  * 没有对应的同名的属性，导致取不到值，最后等于undefined
  * x是匹配的模式，y才是变量。真正被赋值的是变量y，而不是模式x。
  * result: foo: aaa; bar: bbb;
 */
let { foo,bar } = { foo: 'aaa',bar: 'bbb' };
let { x: y } = { x: 'hhh' };

/*
  * 注意 采用这种写法时，变量的声明和赋值是一体的，
  * 对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过了，就会报错
  *
 */
let foo;
let {foo} = {foo: 1};
// syntaxError:Duplicate declaration "foo"

let baz;
let {bar: baz} = {bar: 1};
// syntaxError:Duplicate declaration "baz"

let foo;
({foo} = {foo: 1});
// 成功

let baz;
({bar: baz} = {bar: 1});
// 成功

/*
  * 圆括号和解构赋值的关系
  * 如下demo是错误的写法 synatxError:synatx error
  * 必须加入圆括号，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。
  * 上述解释不明白？
 */
let x;
{x} = {x: 1};

/*
  * ?????????有个疑问????????
  * 在浏览器中执行
  * let foo；回车然后输入{foo} = {foo:1}是成功的
  * 但是如果输入 let foo；{foo} = {foo:1}回车 就会报错
  * 这2个有什么区别吗？不能够明白
*/


/*
  * 数组是可以嵌套的，对象的解构也是可以嵌套的
  * result: line // 1
            loc  // error: loc is undefined
            start // error: start is undefined
 */
var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

var { loc: { start: { line }} } = node;

/*function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
  * 同数组一样，对象的解构也可以指定默认值
  * 默认生效的条件是，对象的属性值严格等于undefined
  * result:
  *     1, x = 3
  *     2: x = 1 y = 5
  *     3: y = 3
  *     4: y = 5
  *     5: msg = 'Something went wrong'
  * 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错
 */
var {x = 3} = {};

var {x, y = 5} = {x: 1};

var {x:y = 3} = {};

var {x:y = 3} = {x: 5};
var { message: msg = 'something went wrong' } = {};

let {foo: {bar}} = {baz: 'baz'};

/*
 * 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
 * 赋值到对应的变量上，使用起来就会方便很多
 * 数组本身是特殊的对象，因此可以对数组进行对象属性的解构
 * demo2: frst： 1，last:3
 */
let {log,sin,cos} = Math;

let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;


/*==========================================================
    3: 字符串的解构赋值
==========================================================*/
/*
  * 字符串也可以解构赋值，这是因为此时，字符串被转换成了一个类似数组的对象
  * 类似数组的对象都有一个length属性 因此还可以对这属性解构赋值
  * a //h
  * b //e ...
  * len //5
 */
const [a,b,c,d,e] = 'hello';

let {length: len} = 'hello';

/*==========================================================
    4: 数值和布尔值的解构赋值
==========================================================*/
/*
  * 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
  * demo1: s === Number.prototype.toString  //true
  * demo2: s === Boolean.prototype.toString // true
 */
let {toString: s} = 123;

let {toString: s} = true;

/*==========================================================
    5: 函数参数的解构赋值
==========================================================*/
/*
  * 函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y
  * 对于函数内部的 代码来说，他们能感受到的参数就是x和y
  * result:
  *  1: 3
  *  ？？？？？2: [3,7]
 */
function add([x, y]){
  return x + y;
}
add([1, 2]);

[[1, 2], [3, 4]].map(([a, b]) => a + b);

/*
  * 参数的解构也可以使用默认值
  * result
  *  1: [3, 8]
  *  2: [3, 0]
  *  3: [0, 0]
  *  4: [0, 0]
  *  不同的写法会得到不一样的结果
  *  1: [3, 8]
  *  2: [3, undefined]
  *  3: [undefined, undefined]
  *  4: [0, 0]
  *  ？？？最后一个demo 不懂  [ 1, 'yes', 3 ]
 */
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8});
move({x: 3});
move({});
move();

function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move({x: 3, y: 8});
move({x: 3});
move();

[1, undefined, 3].map((x = 'yes') => x);