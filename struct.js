/*
* WARNING : NOT TESTED YET
*/


/**
* tuple1 : a -> Tuple a // Not really useful
*/
function tuple1(@x) { return function(@x_){ x_ =@ x; };}

/**
* stuple1 : a -> Tuple a // Not really useful but resistant to outside assignement, not structural change though, just like arrays and strings
*/
function stuple1(@x) { var _x =@ x; return function(@x_){ x_ =@ _x; };}

/**
* tuple2 : a -> b -> Tuple a b
*/
function tuple2(@x) { return function(@y){
    return function(@x_, @y_) { x_ =@ x; y_ =@ y; };
};}

/**
* stuple2 : a -> b -> Tuple a b
*/
function stuple2(@x) { var _x =@ x; return function(@y) { var _y =@ y;
    return function(@x_, @y_){ x_ =@ _x; y_ =@ _y; };
};}

/**
* utuple2 : (a, b) -> Tuple a b
*/
function utuple2(@x, @y){
    return function(@x_, @y_) { x_ =@ x; y_ =@ y; };
}

/**
* ustuple2 : (a, b) -> Tuple a b
*/
function ustuple2(@x, @y) { var _x =@ x; var _y =@ y;
    return function(@x_, @y_) { x_ =@ _x; y_ =@ _y; };
}

/**
* tuple3 : a -> b -> c -> Tuple a b c
*/
function tuple3(@x) { return function(@y){ return function(@z){
    return function(@x_, @y_, @z_) { x_ =@ x; y_ =@ y; z_ =@ z; };
};};}

/**
* stuple3 : a -> b -> c -> Tuple a b c
*/
function stuple3(@x) { var _x =@ x; return function(@y) { var _y =@ y; return function(@z) { var _z =@ z;
    return function(@x_, @y_, @z_){ x_ =@ _x; y_ =@ _y; z_ =@ _z; };
};};}

/**
* utuple3 : (a, b, c) -> Tuple a b c
*/
function utuple3(@x, @y, @z){
    return function(@x_, @y_, @z_) { x_ =@ x; y_ =@ y; z_ =@ z; };
}

/**
* ustuple3 : (a, b, c) -> Tuple a b c
*/
function ustuple3(@x, @y, @z) { var _x =@ x; var _y =@ y; var _z =@ z;
    return function(@x_, @y_, @z_) { x_ =@ _x; y_ =@ _y; z_ =@ _z; };
}

/**
* tuple4 : a -> b -> c -> d -> Tuple a b c d
*/
function tuple4(@x) { return function(@y){ return function(@z){ return function(@u){
    return function(@x_, @y_, @z_, @u_) { x_ =@ x; y_ =@ y; z_ =@ z; u_ =@ u; };
};};};}

/**
* stuple4 : a -> b -> c -> d -> Tuple a b c d
*/
function stuple4(@x) { var _x =@ x; return function(@y) { var _y =@ y; return function(@z) { var _z =@ z; return function(@u) { var _u =@ u;
    return function(@x_, @y_, @z_, @u_) { x_ =@ _x; y_ =@ _y; z_ =@ _z; u_ =@ _u; };
};};};}

/**
* utuple4 : (a, b, c, d) -> Tuple a b c d
*/
function utuple4(@x, @y, @z, @u) {
    return function(@x_, @y_, @z_, @u_) { x_ =@ x; y_ =@ y; z_ =@ z; u_ =@ u; };
}

/**
* ustuple4 : (a, b, c, d) -> Tuple a b c d
*/
function ustuple4(@x, @y, @z, @u) { var _x =@ x; var _y =@ y; var _z =@ z; var _u =@ u;
    return function(@x_, @y_, @z_, @u_) { x_ =@ _x; y_ =@ _y; z_ =@ _z; u_ =@ _u; };
}
