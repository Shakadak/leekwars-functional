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
