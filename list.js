/*
   WARNING: THIS WORKS AS EXPECTED ONLY IN THE CONTEXT OF NO MUTATION
   var x = 1;
   var xs = lSingleton(x); // xs = (1);
   x = 2; // xs = (2);
   If you are fine with this behavior, then go ahead, the gain in term of construction is pretty significant. (2op per element.) Otherwise, use the others constructors (lSafe[Tail]Cons and ulSafe[Tail]Cons) when constructing by hand.
   You can even go and dirty your hand by direclty defining an anonymous function: `function(@x_, @xs_) {x_ = @value; xs_ = @list;}` value and list being provided by yourself. I think I'm going to try that for the manipulation functions.
*/

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
* plFoldLu : ((b, a) -> b) -> b -> List a -> b
*/
function lFoldLu(@f){ return function(@b) { return function(@as) {
	var acc = @b, x, xs = @as;
	while (xs !== null) {
		xs(x, xs);
		acc = f(acc, x);
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
		var _x, _xs = @xs;
		_xs(_x, _xs);
		return ulCons(f(_x), ulMap(f, _xs));
	}
}

/**
* ulAppendMap : ((a -> b), List a, List b) -> List b
*/
function ulAppendMap(@f, @xs, @acc) {
	if (xs === null) { return @acc; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		return ulCons(f(_x), ulAppendMap(f, _xs, acc));
	}
}

/**
* lConcat : List (List a) -> List a
*/
function lConcat(@xss) {
	return ulFoldRu(ulAppend, null, xss);
}

/**
* lConcatMap : (a -> List b) -> List a -> List b
*/
function lConcatMap(@f) { return function(@xs) {
	return ulFoldRu(function(@x, @acc){return ulAppend(f(x), acc);}, null, xs);
};}

/**
* ulConcatFilter : ((a -> Bool), List (List a)) -> List a
*/
function ulConcatFilter(@p, @xss) {
	if (xss === null) { return null; }
	else              {
		var _xs, _xss;
		xss(_xs, _xss);
		return ulAppendFilter(p, _xs, ulConcatFilter(p, _xss));
	}
}

/**
* ulConcatFilterMap : ((a -> List b), (b -> Bool), List a) -> List b
*/
function ulConcatFilterMap(@f, @p, @xs) {
	if (xs === null) { return null; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		return ulAppendFilter(p, f(_x), ulConcatFilterMap(f, p, _xs));
	}
}

/**
* ulConcatMapFilter : ((b -> Bool), (a -> List b), List a) -> List b
*/
function ulConcatMapFilter(@p, @f, @xs) {
	if (xs === null) { return null; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		if (p(_x)) { return ulAppendMap(p, f(_x), ulConcatMapFilter(f, p, _xs)); }
		else       { return ulConcatMapFilter(p, f, _xs); }
	}
}

/**
* lApply : List (a -> b) -> List a -> List b
*/
function lApply(@fs) { return function(@xs) {
	return ulApply(fs, xs);
};}

/**
* ulApply : (List (a -> b), List a) -> List b
*/
function ulApply(@fs, @xs) {
	if (fs === null) { return null; }
	else             {
		var _f, _fs;
		fs(_f, _fs);
		return ulAppendMap(_f, xs, ulApply(_fs, xs));
	}
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
		else       { return ulFilter(p, _xs); }
	}
}

/**
* lAppendFilter : (a -> Bool) -> List a -> List a -> List a
*/
function lAppendFilter(@p) { return function(@xs) {return function(@acc){
	return ulAppendFilter(p, xs, acc);
};};}

/**
* ulAppendFilter : ((a -> Bool), List a, List a) -> List a
*/
function ulAppendFilter(@p, @xs, @acc) {
	if (xs === null) { return @acc; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		if (p(_x)) { return ulCons(_x, ulAppendFilter(p, _xs, acc)); }
		else       { return ulAppendFilter(p, _xs, acc); }
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
	var _x, _xs = @xs;
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
	else            {
		var x;
		l(x, null);
		return @x;
	}
}

/**
* lTail : List a -> List a
*/
function lTail(@l) {
	if (l === null) { debugE("lTail: Empty list");}
	else            {
		var xs;
		l(null, xs);
		return @xs;
	}
}

/**
* augment : ((a -> b -> b) -> b -> b) -> List a -> List a
*/
function augment(@f) { return function(@xs) {
	return f(lCons)(xs);
};}

/**
* build : ((a -> b -> b) -> b -> b) -> List a
*/
function build(@f) { return f(lCons)(null);}

/**
* lSingleton : a -> List a
*/
function lSingleton(@x) {
	return function(@x_, @xs_) { x_ = @x; xs_ = @null; };}

/**
* lSafeSingleton : a -> List a
*/
function lSafeSingleton(@x) {
	var _x =@ x;
	return function(@x_, @xs_) {
	x_ = @_x; xs_ = @null;
};}

/**
* lCons : a -> List a -> List a
*/
function lCons(@x) {
	return function(@xs) {
		return function(@x_, @xs_) {
	x_ = @x; xs_ = @xs;
};};}

/**
* ulCons : (a, List a) -> List a
*/
function ulCons(@x, @xs) {
	return function(@x_, @xs_) { x_ = @x; xs_ = @xs; };
}

/**
* ulSnoc : (List a, a) -> List a
*/
function ulSnoc(@xs, @x) {
	return function(@x_, @xs_) { x_ = @x; xs_ = @xs; };
}

/**
* lSafeCons : a -> List a -> List a
*/
function lSafeCons(@x){
	var _x = @x;
	return function(@xs){
		var _xs = @xs;
		return function(@x_, @xs_) {
	x_ = @_x; xs_ = @_xs;
};};}

/**
* ulSafeCons : (a, List a) -> List a
*/
function ulSafeCons(@x, @xs) {
	var _x = @x, _xs = @xs;
	return function(@x_, @xs_) {
	x_ = @_x; xs_ = @_xs;
};}

/**
* ulSafeSnoc : (List a, a) -> List a
*/
function ulSafeSnoc(@xs, @x) {
	var _x = @x, _xs = @xs;
	return function(@x_, @xs_) { x_ = @_x; xs_ = @_xs; };
}

/**
* lSafeTailCons : a -> List a -> List a
*/
function lSafeTailCons(@x){
	return function(@xs){
		var _xs =@ xs;
		return function(@x_, @xs_) {
	x_ =@ x; xs_ =@ _xs;
};};}

/**
* ulSafeTailCons : (a, List a) -> List a
*/
function ulSafeTailCons(@x, @xs) {
	var _xs =@ xs;
	return function(@x_, @xs_) {
	x_ =@ x; xs_ =@ _xs;
};}

/**
* ulSafeTailSnoc : (List a, a) -> List a
*/
function ulSafeTailSnoc(@xs, @x) {
	var _xs = @xs;
	return function(@x_, @xs_) { x_ = @x; xs_ = @_xs; };
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

/**
* lToString : List a -> String
*/
function lToString(@l) {
	var toString = function(@x, @xs) { return "ulCons(" + x + ", " + xs + ")"; };
	return ulFoldRu(toString, null, l);
}
