/**
* lFoldL : (b -> a -> b) -> b -> List a -> b
*/
function lFoldL(@f){ return function(@b) { return function(@as) {
	var acc = @b, x, xs = @as;
	while (xs !== null) {
		xs(x, xs);
		acc = f(acc)(x);
	}
	return @acc;
};};}

/**
* lFoldR : (a -> b -> b) -> b -> List a -> b
*/
function lFoldR(@f) { return function(@b) { return function(@as) {
	return ulFoldR(f, b, as);
};};}

/**
* ulFoldR : ((a -> b -> b), b, List a) -> b
*/
function ulFoldR(@f, @b, @as) {
	if (as === null) { return @b; }
	else             {
		var x, xs;
		as(x, xs);
		return f(x)(ulFoldR(f, b, xs));
	}
}

/**
* ulFoldRu : (((a, b) -> b), b, List a) -> b
*/
function ulFoldRu(@f, @b, @as) {
	if (as === null) { return @b; }
	else             {
		var _x, _xs;
		as(_x, _xs);
		return f(_x, ulFoldRu(f, b, _xs));
	}
}

/**
* lMap : (a -> b) -> List a -> List b
*/
function lMap(@f) { return function (@xs) {
	return ulMap(f, xs);
};}

/**
* ulMap : ((a -> b), List a) -> List b
*/
function ulMap(@f, @xs) {
	if (xs === null) { return @xs; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		return ulCons(f(_x), ulMap(f, _xs));
	}
}

/**
* lConcat : List (List a) -> List a
*/
function lConcat(@xss) {
	return ulFoldRu(ulAppend, null, xss);
}

/**
* lAppend : List a -> List a -> List a
*/
function lAppend(@xs) { return function(@ys) {
		return ulAppend(xs, ys);
};}

/**
* ulAppend : (List a, List a) -> List a
*/
function ulAppend(@xs, @ys) {
	return ulFoldRu(ulCons, ys, xs);
}

/**
* lFilter : (a -> Bool) -> List a -> List a
*/
function lFilter(@p) { return function (@xs) {
	return ulFilter(p, xs);
};}

/**
* ulFilter : ((a -> Bool), List a) -> List a
*/
function ulFilter(@p, @xs){
	if (xs === null) { return @xs; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		if (p(_x)) { return ulCons(_x, ulFilter(p, _xs)); }
		else      { return ulFilter(p, _xs); }
	}
}

/**
* lIter : (a -> ()) -> List a -> ()
*/
function lIter(@f) { return function(@xs) {
	ulIter(f, xs);
};}

/**
* ulIter : ((a -> ()), List a) -> ()
*/
function ulIter(@f, @xs) {
	var _x, _xs = xs;
	while (_xs !== null) {
		_xs(_x, _xs);
		f(_x);
	}
}

/**
* lHead : List a -> a
*/
function lHead(@l) {
	if (l === null) { debugE("lHead: Empty list");}
	var x;
	l(x, null);
	return @x;
}

/**
* lTail : List a -> List a
*/
function lTail(@l) {
	if (l === null) { debugE("lTail: Empty list");}
	var xs;
	l(null, xs);
	return @xs;
}

/**
* lSingleton : a -> List a
*/
function lSingleton(@x) {return lCons(x)(null);}

/**
* augment : ((a -> b -> b) -> b -> b) -> List a -> List a
*/
function augment(@f) { return function(@xs) {
	var _xs = @xs;
	return f(lCons)(_xs);
};}

/**
* build : ((a -> b -> b) -> b -> b) -> List a
*/
function build(@f) { return f(lCons)(null);}

/**
* lCons : a -> List a -> List a
*/
function lCons(@x){
	var _x = @x;
	return function(@xs){
		var _xs = @xs;
		return function(@x_, @xs_) {
	x_ = @_x; xs_ = @_xs;
};};}

/**
* ulCons : (a, List a) -> List a
*/
function ulCons(@x, @xs) {
	var _x = @x, _xs = @xs;
	return function(@x_, @xs_) { x_ = @_x; xs_ = @_xs; };
}

/**
* ulSnoc : (List a, a) -> List a
*/
function ulSnoc(@xs, @x) {
	var _x = @x, _xs = @xs;
	return function(@x_, @xs_) { x_ = @_x; xs_ = @_xs; };
}

/**
* lFromArray : Array a -> List a
*/
function lFromArray(@xs){
	return arrayFoldRight(xs, ulCons, null);
}

/**
* lToArray : List a -> Array a
*/
function lToArray(@l){
	var x, xs = @l;
	var ret = [];
	while (xs !== null) {
		xs(x, xs);
		push(ret, x);
	}
	return @ret;
}
