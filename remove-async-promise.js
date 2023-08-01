/*
Question: How to remove the async?

async function getUser() {
	return await fetch("./demo.json");
}

async function m1() {
	const user = await getUser();
	return user;
}

async function m2() {
	const user = await m1();
	return user;
}

async function m3() {
	const user = await m2();
	return user;
}

async function main() {
	const user = await m3();
	console.log("user: ", user);
}

*/

function getUser() {
	return fetch("./demo.json");
}

function m1() {
	const user = getUser();
	return user;
}

function m2() {
	const user = m1();
	return user;
}

function m3() {
	const user = m2();
	return user;
}

function main() {
	const user = m3();
	console.log("user: ", user);
}

function run(func) {
	let cache = {
		status: "pending",
		value: null,
	};
	const oldFetch = window.fetch;
	window.fetch = function (...args) {
		if (cache.status === "fulfilled") {
			return cache.value;
		} else if (cache.status === "rejected") {
			throw cache.value;
		}

		const prom = oldFetch(...args).then(
			(res) => {
				cache.status = "fulfilled";
				cache.value = res;
			},
			(err) => {
				cache.status = "rejected";
				cache.value = err;
			}
		);

		throw prom;
	};
	try {
		func();
	} catch (err) {
		if (err instanceof Promise) {
			// 成功失败都重新call func
			err.then(func, func).finally(() => {
				window.fetch = oldFetch;
			});
		}
	}
}

run(main);
