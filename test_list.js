/**
* ulFoldL : ((b -> a -> b), b, List a) -> b
*/
function ulFoldL(@f, @acc, @xs) {
	return xs == null	? acc
						: xs(function(@h, @t) { return ulFoldL(f, f(acc)(h), t); });
}

/**
* ulFoldLu : (((b, a) -> b), b, List a) -> b
*/
function ulFoldLu(@f, @acc, @xs) {
	return xs == null	? acc
						: xs(function(@h, @t) { return ulFoldLu(f, f(acc, h), t); });
}

/**
* ulFoldR : ((a -> b -> b), b, List a) -> b
*/
function ulFoldR(@f, @acc, @xs) {
	return xs == null	? acc
						: xs(function(@h, @t) { return f(h)(ulFoldLu(f, acc, t)); });
}

/**
* ulFoldRu : (((a, b) -> b), b, List a) -> b
*/
function ulFoldRu(@f, @acc, @xs) {
	return xs == null	? acc
						: xs(function(@h, @t) { return f(h, ulFoldLu(f, acc, t)); });
}

// function ulFoldRu(@f, @acc, @xs) {
// 	if (xs == null) { return acc; }
// 	var fn = function(@h, @t) {
// 		return t == null	? f(h, acc)
// 							: f(h, t(fn));
// 	};
// 	return xs(fn);
// }

/**
* ulAppend : (List a, List a) -> List a
*/
function ulAppend(@xs, @ys) {
	return xs === null	? ys
						: xs(function(@h, @t) { return ulCons(h, ulAppend(t, ys)); });
}

/**
* ulMap : ((a -> b), List a) -> List b
*/
function ulMap(@f, @xs) {
	return xs === null	? null
						: xs(function(@h, @t) { return ulCons(f(h), ulMap(f, t)); });
}

/**
* ulAppendMap : ((a -> b), List a, List b) -> List b
*/
function ulAppendMap(@f, @xs, @acc) {
	return xs === null	? acc
						: xs(function(@h, @t) { return ulCons(f(h), ulAppendMap(f, t, acc)); });
}

/**
* lConcat : List (List a) -> List a
*/
function lConcat(@xss) {
	return ulFoldRu(ulAppend, null, xss);
}

/**
* ulConcatMap : ((a -> List b), List a) -> List b
*/
function ulConcatMap(@f, @xs) {
	return xs === null	? null
						: xs(function(@h, @t) { return ulAppend(f(h), ulConcatMap(f, t)); });
}

/**
* ulFilterConcat : ((a -> Bool), List (List a)) -> List a
*/
function ulFilterConcat(@p, @xss) {
	return xss === null	? null
						: xs(function(@h, @t) { return ulAppendFilter(p, h, ulFilterConcat(p, t)); });
}

/**
* ulFilterConcatMap : ((a -> List b), (b -> Bool), List a) -> List b
*/
function ulFilterConcatMap(@f, @p, @xs) {
	return xs === null	? null
						: xs(function(@h, @t) { return ulAppendFilter(p, f(h), ulFilterConcatMap(f, p, t)); });
}

/**
* ulConcatMapFilter : ((a -> Bool), (a -> List b), List a) -> List b
*/
function ulConcatMapFilter(@p, @f, @xs) {
    return xs == null   ? null
                        : xs(function(@h, @t) { return p(h) ? ulAppend(f(h), ulConcatMapFilter(p, f, t))
                                                            : ulConcatMapFilter(p, f, t); });
}

/**
* ulApply : (List (a -> b), List a) -> List b
*/
function ulApply(@fs, @xs) {
	return fs === null	? null
						: fs(function(@h, @t) { return ulAppendMap(h, xs, ulApply(t, xs)); });
}

/**
* ulFilter : ((a -> Bool), List a) -> List a
*/
function ulFilter(@p, @xs) {
	return xs == null   ? null
                        : xs(function(@h, @t) { return p(x) ? ulCons(x, _ulFilter(p, xs))
                                                            : _ulFilter(p, xs); });
}

/**
* ulAppendFilter : ((a -> Bool), List a, List a) -> List a
*/
function ulAppendFilter(@p, @xs, @acc) {
	return xs == null   ? acc
                        : xs(function(@h, @t) { return p(h) ? ulCons(h, ulAppendFilter(p, t, acc))
                                                            : ulAppendFilter(p, t, acc); });
}

/**
* lLength : List a -> Int
*/
function lLength(@xs) {
	return xs == null   ? 0
                        : xs(function(@h, @t) { return 1 + lLength(t); });
}

/**
* lEmpty : List a -> Bool
*/
function lEmpty(@xs) {
	return xs === null;
}

/**
* lRepeat : a -> List a
*/
function lRepeat(@x) {
	var _x =@ x;
	return function(f) { return f(_x, lRepeat(_x)); };
}

/**
* ulReplicate : (Int, a) -> List a
*/
function ulReplicate(@n, @x) {
	return ulTake(n, lRepeat(x));
}

/**
* ulTake : (Int, List a) -> List a
*/
function ulTake(@n, @xs) {
	return n === 0 || xs === null	? null
									: xs(function(@h, @t) { return ulCons(h, ulTake(n - 1, t)); });
}

/**
* ulDrop : (Int, List a) -> List a
*/
function ulDrop(@n, @xs) {
	return n === 0 || xs === null   ? xs
                                    : xs(function(@h, @t) { return ulDrop(n - 1, t); });
}

/**
* ulAll : ((a -> Bool), List a) -> Bool
*/
function ulAll(@p, @xs) {
	return xs === null	? true
						: xs(function(@h, @t) { return p(h) && ulAll(p, t); });
}

/**
* ulAny : ((a -> Bool), List a) -> Bool
*/
function ulAny(@p, @xs) {
	return xs === null	? false
						: xs(function(@h, @t) { return p(h) || ulAny(p, t); });
}

/**
* ulIter : ((a -> ()), List a) -> ()
*/
function ulIter(@f, @xs) {
	var _xs =@ xs;
	var fn = function(@h, @t) { f(h); _xs =@ t; };
	while (_xs !== null) {
		f(_xs);
	}
}

/**
* lHead : List a -> a
*/
function lHead(@h, @t) {
	return h;
}

/**
* lTail : List a -> List a
*/
function lTail(@h, @t) {
	return t;
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
* buildu : ((((a, b) -> b), b) -> b) -> List a
*/
function buildu(@f) { return f(ulCons, null); }

/**
* lSingleton : a -> List a
*/
function lSingleton(@x) {
	return function(@f) { return f(x, null); };
}

/**
* lSafeSingleton : a -> List a
*/
function lSafeSingleton(@x) {
	var _x =@ x;
	return function(@f) {
		return f(_x, null);
};}

/**
* lCons : a -> List a -> List a
*/
function lCons(@x) {
	return function(@xs) {
		return function(@f) {
			return f(x, xs);
};};}

/**
* ulCons : (a, List a) -> List a
*/
function ulCons(@x, @xs) {
	return function(@f) { return f(x, xs); };
}

/**
* ulSnoc : (List a, a) -> List a
*/
function ulSnoc(@xs, @x) {
	return function(@f) { return f(x, xs); };
}

/**
* lSafeCons : a -> List a -> List a
*/
function lSafeCons(@x){
	var _x =@ x;
	return function(@xs){
		var _xs =@ xs;
		return function(@f) {
			return f(_x, _xs);
};};}

/**
* ulSafeCons : (a, List a) -> List a
*/
function ulSafeCons(@x, @xs) {
	var _x =@ x, _xs =@ xs;
	return function(@f) {
		return f(_x, _xs);
};}

/**
* ulSafeSnoc : (List a, a) -> List a
*/
function ulSafeSnoc(@xs, @x) {
	var _x =@ x, _xs =@ xs;
	return function(@f) { return f(_x, _xs); };
}

/**
* lSafeTailCons : a -> List a -> List a
*/
function lSafeTailCons(@x){
	return function(@xs){
		var _xs =@ xs;
		return function(@xs_) {
	xs_ =@ _xs; return x;
};};}

/**
* ulSafeTailCons : (a, List a) -> List a
*/
function ulSafeTailCons(@x, @xs) {
	var _xs =@ xs;
	return function(@f) {
		return f(x, _xs);
};}

/**
* ulSafeTailSnoc : (List a, a) -> List a
*/
function ulSafeTailSnoc(@xs, @x) {
	var _xs =@ xs;
	return function(@f) { return f(x, _xs); };
}

/**
* lFromArray : Array a -> List a
*/
function lFromArray(@xs){
	return arrayFoldRight(xs, ulCons, null);
}

/**
* lFromKeys : Assoc a b -> List a
*/
function lFromKeys(@xs) {
	var ret = null;
	for (var k : var _ in xs) {
		ret =@ ulSafeCons(k, ret);
	}
	return ret;
}

/**
* lToArray : List a -> Array a
*/
function lToArray(@l){
	return ulFoldLu(function(@acc, @x) { push(acc, x); return acc; }, [], l);
}

/**
* lToString : List a -> String
*/
function lToString(@l) {
	var toString = function(@x, @xs) { return@ ("ulCons(" + x + ", " + xs + ")"); };
	return ulFoldRu(toString, null, l);
}

/**
* lFoldL : (b -> a -> b) -> b -> List a -> b
*/
function lFoldL(@f){ return function(@acc) { return function(@xs) {
	return ulFoldL(f, acc, xs);
};};}

/**
* lFoldLu : ((b, a) -> b) -> b -> List a -> b
*/
function lFoldLu(@f){ return function(@acc) { return function(@xs) {
	return ulFoldLu(f, acc, xs);
};};}

/**
* lFoldR : (a -> b -> b) -> b -> List a -> b
*/
function lFoldR(@f) { return function(@acc) { return function(@xs) {
	return ulFoldR(f, acc, xs);
};};}

/**
* lFoldRu : ((a, b) -> b) -> b -> List a -> b
*/
function lFoldRu(@f) { return function(@acc) { return function(@xs) {
	return ulFoldRu(f, acc, xs);
};};}

/**
* lMap : (a -> b) -> List a -> List b
*/
function lMap(@f) { return function (@xs) {
	return ulMap(f, xs);
};}

/**
* lFilterConcatMap : (a -> List b) -> (b -> Bool) -> List a -> List b
*/
function lFilterConcatMap(@f) { return function(@p) { return function(@xs) {
    return ulFilterConcatMap(f, p, xs);
};};}

/**
* lAppend : List a -> List a -> List a
*/
function lAppend(@xs) { return function(@ys) {
		return ulAppend(xs, ys);
};}

/**
* lFilter : (a -> Bool) -> List a -> List a
*/
function lFilter(@p) { return function (@xs) {
	return ulFilter(p, xs);
};}

/**
* lAppendFilter : (a -> Bool) -> List a -> List a -> List a
*/
function lAppendFilter(@p) { return function(@xs) {return function(@acc){
	return ulAppendFilter(p, xs, acc);
};};}

/**
* lIter : (a -> ()) -> List a -> ()
*/
function lIter(@f) { return function(@xs) {
	ulIter(f, xs);
};}

/**
* lApply : List (a -> b) -> List a -> List b
*/
function lApply(@fs) { return function(@xs) {
	return ulApply(fs, xs);
};}

/**
* lConcatMap : (a -> List b) -> List a -> List b
*/
function lConcatMap(@f) { return function(@xs) {
	return ulConcatMap(f, xs);
};}

/**
* lReplicate : Int -> a -> List a
*/
function lReplicate(@n) { return function(@x) {
	return ulReplicate(n, x);
};}

/**
* lTake : Int -> List a -> List a
*/
function lTake(@n) { return function(@xs) {
	return ulTake(n, xs);
};}

/**
* lDrop : Int -> List a -> List a
*/
function lDrop(@n) { return function(@xs) {
	return ulDrop(n, xs);
};}

/**
* lAll : (a -> Bool) -> List a -> Bool
*/
function lAll(@p) { return function(@xs) {
	return ulAll(p, xs);
};}

/**
* lAny : (a -> Bool) -> List a -> Bool
*/
function lAny(@p) { return function(@xs) {
	return ulAny(p, xs);
};}
