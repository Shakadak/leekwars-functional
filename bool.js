/**
* not : Bool -> Bool
*/
function not(@p) { return !p; }

/**
* negate : (a -> Bool) -> a -> Bool
*/
function negate(@p) { return function(@a) {return !p(a); };}

/**
* equal : a -> a -> Bool
*/
function equal(@x) { return function(@y) { return x === y; };}

/**
* notEqual : a -> a -> Bool
*/
function notEqual(@x) { return function(@y) { return x !== y; };}

/**
* comparing : (a -> b) -> (b -> b -> c) -> a -> a -> c
*/
function comparing(@f) { return function(@p) { return function(@x) { return function(@y) {
	return p(f(x))(f(y));
};};};}

/**
* comparingu : (a -> b) -> ((b, b) -> c) -> (a, a) -> c
*/
function comparingu(@f) { return function(@p) { return function(@x, @y) {
	return p(f(x), f(y));
};};}

/**
* superior : a -> a -> Bool
*/
function superior(@x) { return function(@y) { return x >= y; };}

/**
* stricltySuperior : a -> a -> Bool
*/
function strictlySuperior(@x) { return function(@y) { return x > y; };}

/**
* inferior : a -> a -> Bool
*/
function inferior(@x) { return function(@y) { return x <= y; };}

/**
* stricltyInferior : a -> a -> Bool
*/
function strictlyInferior(@x) { return function(@y) { return x < y; };}
