/*
   WARNING: THIS WORKS AS EXPECTED ONLY IN THE CONTEXT OF NO MUTATION
   var x = 1;
   var xs = plSingleton(x); // xs = (1);
   x = 2; // xs = (2);
   If you are fine with this behavior, then go ahead, the gain in term of construction is pretty significant.
*/

/**
* plFoldL : (b -> a -> b) -> b -> List a -> b
*/
function plFoldL(@f){ return function(@b) { return function(@as) {
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
function plFoldLu(@f){ return function(@b) { return function(@as) {
	var acc = @b, x, xs = @as;
	while (xs !== null) {
		xs(x, xs);
		acc = f(acc, x);
	}
	return @acc;
};};}

/**
* plFoldR : (a -> b -> b) -> b -> List a -> b
*/
function plFoldR(@f) { return function(@b) { return function(@as) {
	return pulFoldR(f, b, as);
};};}

/**
* pulFoldR : ((a -> b -> b), b, List a) -> b
*/
function pulFoldR(@f, @b, @as) {
	if (as === null) { return @b; }
	else             {
		var x, xs;
		as(x, xs);
		return f(x)(pulFoldR(f, b, xs));
	}
}

/**
* pulFoldRu : (((a, b) -> b), b, List a) -> b
*/
function pulFoldRu(@f, @b, @as) {
	if (as === null) { return @b; }
	else             {
		var _x, _xs;
		as(_x, _xs);
		return f(_x, pulFoldRu(f, b, _xs));
	}
}

/**
* plMap : (a -> b) -> List a -> List b
*/
function plMap(@f) { return function (@xs) {
	return pulMap(f, xs);
};}

/**
* pulMap : ((a -> b), List a) -> List b
*/
function pulMap(@f, @xs) {
	if (xs === null) { return @xs; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		return pulCons(f(_x), pulMap(f, _xs));
	}
}

/**
* plConcat : List (List a) -> List a
*/
function plConcat(@xss) {
	return pulFoldRu(pulAppend, null, xss);
}

/**
* plConcatMap : (a -> List b) -> List a -> List b
*/
function plConcatMap(@f) { return function(@xs) {
	return pulFoldRu(function(@x, @acc){return pulAppend(f(x), acc);}, null, xs);
};}

/**
* plAppend : List a -> List a -> List a
*/
function plAppend(@xs) { return function(@ys) {
		return pulAppend(xs, ys);
};}

/**
* pulAppend : (List a, List a) -> List a
*/
function pulAppend(@xs, @ys) {
	return pulFoldRu(pulCons, ys, xs);
}

/**
* plFilter : (a -> Bool) -> List a -> List a
*/
function plFilter(@p) { return function (@xs) {
	return pulFilter(p, xs);
};}

/**
* pulFilter : ((a -> Bool), List a) -> List a
*/
function pulFilter(@p, @xs){
	if (xs === null) { return @xs; }
	else             {
		var _x, _xs;
		xs(_x, _xs);
		if (p(_x)) { return pulCons(_x, pulFilter(p, _xs)); }
		else      { return pulFilter(p, _xs); }
	}
}

/**
* plIter : (a -> ()) -> List a -> ()
*/
function plIter(@f) { return function(@xs) {
	pulIter(f, xs);
};}

/**
* pulIter : ((a -> ()), List a) -> ()
*/
function pulIter(@f, @xs) {
	var _x, _xs = @xs;
	while (_xs !== null) {
		_xs(_x, _xs);
		f(_x);
	}
}

/**
* plHead : List a -> a
*/
function plHead(@l) {
	if (l === null) { debugE("lHead: Empty list");}
	else            {
		var x;
		l(x, null);
		return @x;
	}
}

/**
* plTail : List a -> List a
*/
function plTail(@l) {
	if (l === null) { debugE("lTail: Empty list");}
	else            {
		var xs;
		l(null, xs);
		return @xs;
	}
}

/**
* plSingleton : a -> List a
*/
function plSingleton(@x) {return pulCons(x, null);}

/**
* paugment : ((a -> b -> b) -> b -> b) -> List a -> List a
*/
function paugment(@f) { return function(@xs) {
	return f(plCons)(xs);
};}

/**
* pbuild : ((a -> b -> b) -> b -> b) -> List a
*/
function pbuild(@f) { return f(plCons)(null);}

/**
* plCons : a -> List a -> List a
*/
function plCons(@x) {
	return function(@xs) {
		return function(@x_, @xs_) {
	x_ = @x; xs_ = @xs;
};};}

/**
* pulCons : (a, List a) -> List a
*/
function pulCons(@x, @xs) {
	return function(@x_, @xs_) { x_ = @x; xs_ = @xs; };
}

/**
* pulSnoc : (List a, a) -> List a
*/
function pulSnoc(@xs, @x) {
	return function(@x_, @xs_) { x_ = @x; xs_ = @xs; };
}

/**
* plFromArray : Array a -> List a
*/
function plFromArray(@xs){
	return arrayFoldRight(xs, pulCons, null);
}

/**
* plToArray : List a -> Array a
*/
function plToArray(@l){
	var x, xs = @l;
	var ret = [];
	while (xs !== null) {
		xs(x, xs);
		push(ret, x);
	}
	return @ret;
}
