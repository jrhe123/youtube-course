Object.prototype[Symbol.iterator] = function() {
	return Object.values(this)[Symbol.iterator]()
}

var [a, b] = {
	a: 3,
  b: 4
}

console.log(a, b)
