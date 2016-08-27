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
		var x_, xs_;
		as(x_, xs_);
		return f(x_, ulFoldRu(f, b, xs_));
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
		var x_, xs_;
		xs(x_, xs_);
		return ulCons(f(x_), ulMap(f, xs_));
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
		var x_, xs_;
		xs(x_, xs_);
		if (p(x_)) { return ulCons(x_, ulFilter(p, xs_)); }
		else      { return ulFilter(p, xs_); }
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
	if (xs !== null) {
		var x_, xs_;
		xs(x_, xs_);
		f(x_);
		ulIter(f, xs_);
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
	var xs_ = @xs;
	return f(lCons)(xs_);
};}

/**
* build : ((a -> b -> b) -> b -> b) -> List a
*/
function build(@f) { return f(lCons)(null);}

/**
* lCons : a -> List a -> List a
*/
function lCons(@x){
	var x_ = @x;
	return function(@xs){
		var xs_ = @xs;
		return function(@_x, @_xs) {
	_x = @x_; _xs = @xs_;
};};}

/**
* ulCons : (a, List a) -> List a
*/
function ulCons(@x, @xs) {
	var x_ = @x, xs_ = @xs;
	return function(@_x, @_xs) { _x = @x_; _xs = @xs_; };
}

/**
* ulSnoc : (List a, a) -> List a
*/
function ulSnoc(@xs, @x) {
	var x_ = @x, xs_ = @xs;
	return function(@_x, @_xs) { _x = @x_; _xs = @xs_; };
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
