/**
* compose : (b -> c) -> (a -> b) -> a -> c
*/
function compose(@f) { return@ function(@g) { return@ function(@a) {
  return f(g(a)); };};}

/**
* apply : a -> (a -> b) -> b
*/
function apply(@a) { return@ function(@f) { return f(a);};}

/**
* const : a -> b -> a
*/
function const(@a) { return@ function (@b) { return @a; };}

/**
* flip : (a -> b -> c) -> b -> a -> c
*/
function flip(@f) { return@ function(@b) {return@ function(@a) {
  return f(a)(b);};};}

/**
* uncurry2 : (a -> b -> c) -> (a, b) -> c
*/
function uncurry2(@f){ return@ function(@a, @b) {
	return f(a)(b);
};}

/**
* curry2 : ((a, b) -> c) -> a -> b -> c
*/
function curry2(@f) { return@ function(@a) { return@ function(@b) {
  return f(a,b) ;};};}

/**
* curry3 : ((a, b, c) -> d) -> a -> b -> c -> d
*/
function curry3(@f) { return@ function(@a) { return@ function(@b) { return@ function(@c) {
  return f(a,b,c); };};};}

/**
* curry4 : ((a, b, c, d) -> e) -> a -> b -> c -> d -> e
*/
function curry4(@f) {
  return@ function(@a) {
  return@ function(@b) {
  return@ function(@c) {
  return@ function(@d) {
    return f(a,b,c,d);};};};};};

/**
* id : a -> a
*/
function id(@x){ return @x; }

/**
* swap : (a, b) -> (b, a) -> ()
*/
function swap(@x, @y){ return@ function(@x_, @y_){x_ = @y; y_ = @x; };}

/**
* void : () -> ();
*/
function void(){}

/**
* delay0 : (() -> b) -> () -> () -> b
*/
function delay0(@f) {return@ function() { return@ function(){ return f(); };};}

/**
* delay : (a -> b) -> a -> () -> b
*/
function delay(@f) {return@ function(@a) { return@ function(){ return f(a); };};}

/**
* delay2 : ((a, b) -> d) -> (a, b) -> () -> d
*/
function delay2(@f) {return@ function(@a, @b) { return@ function(){ return f(a,b); };};}

/**
* delay3 : ((a, b, c) -> d) -> (a, b, c) -> () -> d
*/
function delay3(@f) {return@ function(@a, @b, @c) { return@ function(){ return@ f(a,b,c); };};}
