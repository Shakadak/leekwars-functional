/**
* add : Summable a => a -> a -> a
*/
function add(@x) { return function(@y) { return x + y; };}

/**
* subTo : Num a => a -> a -> a
*/
function subTo(@x) { return function(@y) { return y - x; };}

/**
* defaultDiv : Num a => a -> a -> a -> a
*/
function defaultDiv(@default) { return function(@x) { return function(@y) {
	return y !== 0	? x / y
					: default;
};};}
