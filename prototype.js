function a() {}
const b = new a();

// {}
console.log(a.prototype);

// true
console.log(b.__proto__ === a.prototype);

var obj1 = {};
var obj2 = new Object();

// [Object: null prototype] {}
console.log(obj2.__proto__);

// Function is a object
function sum(a, b) {
	return a + b;
}
const sum2 = new Function("a", "b", "return a + b");
console.log(sum2(1, 2));

// {}
console.log(Function.prototype);

// {}
console.log(sum2.__proto__);

// [Function: bind]
console.log(Function.bind);
console.log(Object.bind);

// Function.toString
// => Function.prototype.toString
// => Object.toString

// true
console.log(Function.__proto__ === Function.prototype);

// null
console.log(Object.prototype.__proto__);
