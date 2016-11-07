function memo1(f) {
	var cache = [];
	return function(@x) {
		var ret =@ cache["" + x];
		return ret !== null	? ret
							: cache[x] = f(x);
	};
}

function bmemo(f) {
	var cache = [];
	return function(@x) {
		var ret =@ cache[x];
		return ret !== null	? ret
							: cache[x] = f(x);
	};
}

function umemou2(f) {
	var cache = [];
	return function(@x, @y) {
		var params = x + "|" + y;
		var ret =@ cache[params];
		return ret !== null	? ret
							: cache[params] = f(x, y);
	};
}

function memou2(f) {
	var cache = [];
	return function(@x) {
	return function(@y) {
		var params = x + "|" + y;
		var ret =@ cache[params];
		return ret !== null	? ret
							: cache[params] = f(x, y);
	};};
}

function bmemo2(f) {
	var cache = [];
	return function(@x) {
		var ret =@ cache[x];
		return ret !== null ? ret
							: cache[x] = bmemo(f(x));
	};
}

function memo2(f) {
	var cache = [];
	return function(@x) {
	return function(@y) {
		var params = x + "|" + y;
		var ret =@ cache[params];
		return ret !== null	? ret
							: cache[params] = f(x)(y);
	};};
}
