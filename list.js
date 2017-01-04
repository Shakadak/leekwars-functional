/*
   WARNING: THIS WORKS AS EXPECTED ONLY IN THE CONTEXT OF NO MUTATION
   var x = 1;
   var xs = lSingleton(x); // xs = (1);
   x = 2; // xs = (2);
   If you are fine with this behavior, then go ahead, the gain in term of construction is pretty significant. (2op per element.) Otherwise, use the others constructors (lSafe[Tail]Cons and ulSafe[Tail]Cons) when constructing by hand.
   You can even go and dirty your hand by direclty defining an anonymous function: `function(@xs_) {xs_ =@ list; return value;}` value and list being provided by yourself.
*/

function _ulFoldL(@f, @acc, @xs) {
	return xs === null	? acc
						: _ulFoldL(f, f(acc)(xs(xs)), xs);
}

function _ulFoldLu(@f, @acc, @xs) {
	return xs === null	? acc
						: _ulFoldLu(f, f(acc, xs(xs)), xs);
}

function _ulFoldR(@f, @acc, @xs) {
	return xs === null	? acc
						: f(xs(xs))(_ulFoldR(f, acc, xs));
}

function _ulFoldRu(@f, @acc, @xs) {
	return xs === null	? acc
						: f(xs(xs), _ulFoldRu(f, acc, xs));
}

function _ulMap(@f, @xs) {
	return xs === null	? null
						: ulCons(f(xs(xs)), _ulMap(f, xs));
}

function _ulAppendMap(@f, @xs, @acc) {
	return xs === null	? acc
						: ulCons(f(xs(xs)), _ulAppendMap(f, xs, acc));
}

/**
* lConcat : List (List a) -> List a
*/
function lConcat(@xss) {
	return ulFoldRu(ulAppend, null, xss);
}

function _ulConcatMap(@f, @xs) {
	return xs === null	? null
						: _ulAppend(f(xs(xs)), _ulConcatMap(f, xs));
}

function _ulFilterConcat(@p, @xss) {
	return xss === null	? null
						: ulAppendFilter(p, xss(xss), _ulFilterConcat(p, xss));
}

function _ulFilterConcatMap(@f, @p, @xs) {
	return xs === null	? null
						: _ulAppendFilter(p, @f(xs(xs)), _ulFilterConcatMap(f, p, xs));
}

function _ulConcatMapFilter(@p, @f, @xs) {
	if (xs === null) { return null; }
	else             {
        var x = xs(xs);
		return p(x) ? ulAppend(f(x), _ulConcatMapFilter(p, f, xs))
                    :                _ulConcatMapFilter(p, f, xs);
	}
}

function _ulApply(@fs, @xs) {
	return fs === null	? null
						: _ulAppendMap(fs(fs), @xs, _ulApply(fs, xs));
}

function _ulAppend(@xs, @ys) {
	return xs === null	? ys
						: ulCons(xs(xs), _ulAppend(xs, ys));
}

function _ulFilter(@p, @xs) {
	if (xs === null)	{ return null; }
	else				{
        var x = xs(xs);
		return p(x) ? ulCons(x, _ulFilter(p, xs))
                    :           _ulFilter(p, xs);
	}
}

function _ulAppendFilter(@p, @xs, @acc) {
	if (xs === null)	{ return acc; }
	else				{
        var x = xs(xs);
		return p(x) ? ulCons(x, _ulAppendFilter(p, xs, acc))
                    :           _ulAppendFilter(p, xs, acc);
	}
}

function _lLength(@xs) {
	if (xs === null)	{ return 0; }
	else				{
		xs(xs);
		return 1 + _lLength(xs);
	}
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
	return function(@xs_) { xs_ =@ lRepeat(_x); return _x; };
}

/**
* ulReplicate : (Int, a) -> List a
*/
function ulReplicate(@n, @x) {
	return _ulTake(n, lRepeat(x));
}

function _ulTake(@n, @xs) {
	return n === 0 || xs === null	? null
									: ulCons(xs(xs), _ulTake(n - 1, xs));
}

function _ulDrop(@n, @xs) {
	if (n === 0 || xs === null)	{ return xs; }
	else						{
		xs(xs);
		return _ulDrop(n - 1, xs);
	}
}

function _ulAll(@p, @xs) {
	return xs === null	? true
						: p(xs(xs)) && _ulAll(p, xs);
}

function _ulAny(@p, @xs) {
	return xs === null	? false
						: p(xs(xs)) || _ulAny(p, xs);
}

/**
* ulIter : ((a -> ()), List a) -> ()
*/
function ulIter(@f, @xs) {
	var _xs =@ xs;
	while (_xs !== null) {
		f(_xs(_xs));
	}
}

/**
* lHead : List a -> a
*/
function lHead(@l) {
	if (l === null) { debugE("lHead: Empty list");}
	else            {
		return l(null);
	}
}

/**
* lTail : List a -> List a
*/
function lTail(@l) {
	if (l === null) { debugE("lTail: Empty list");}
	else            {
		var xs;
		l(xs);
		return xs;
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
* buildu : ((((a, b) -> b), b) -> b) -> List a
*/
function buildu(@f) { return f(ulCons, null); }

/**
* lSingleton : a -> List a
*/
function lSingleton(@x) {
	return function(@xs_) { xs_ =@ null; return x; };}

/**
* lSafeSingleton : a -> List a
*/
function lSafeSingleton(@x) {
	var _x =@ x;
	return function(@xs_) {
	xs_ =@ null;
    return x;
};}

/**
* lCons : a -> List a -> List a
*/
function lCons(@x) {
	return function(@xs) {
		return function(@xs_) {
	xs_ =@ xs; return x;
};};}

/**
* ulCons : (a, List a) -> List a
*/
function ulCons(@x, @xs) {
	return function(@xs_) { xs_ =@ xs; return x; };
}

/**
* ulSnoc : (List a, a) -> List a
*/
function ulSnoc(@xs, @x) {
	return function(@xs_) { xs_ =@ xs; return x; };
}

/**
* lSafeCons : a -> List a -> List a
*/
function lSafeCons(@x){
	var _x =@ x;
	return function(@xs){
		var _xs =@ xs;
		return function(@xs_) {
	xs_ =@ _xs; return _x;
};};}

/**
* ulSafeCons : (a, List a) -> List a
*/
function ulSafeCons(@x, @xs) {
	var _x =@ x, _xs =@ xs;
	return function(@xs_) {
	xs_ =@ _xs; return _x;
};}

/**
* ulSafeSnoc : (List a, a) -> List a
*/
function ulSafeSnoc(@xs, @x) {
	var _x =@ x, _xs =@ xs;
	return function(@xs_) { xs_ =@ _xs; return _x; };
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
	return function(@xs_) {
	xs_ =@ _xs; return x;
};}

/**
* ulSafeTailSnoc : (List a, a) -> List a
*/
function ulSafeTailSnoc(@xs, @x) {
	var _xs =@ xs;
	return function(@xs_) { xs_ =@ _xs; return x; };
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
	return ulFoldLu(function(@acc, @x) { push(acc, x); return acc; }, [], @l);
}

/**
* lToString : List a -> String
*/
function lToString(@l) {
	var toString = function(@x, @xs) { return@ ("ulCons(" + x + ", " + xs + ")"); };
	return ulFoldRu(toString, null, @l);
}

/**
* lFoldL : (b -> a -> b) -> b -> List a -> b
*/
function lFoldL(@f){ return function(@acc) { return function(@xs) {
	return _ulFoldL(f, acc, @xs);
};};}

/**
* ulFoldL : ((b -> a -> b), b, List a) -> b
*/
function ulFoldL(@f, @acc, @xs) {
	return _ulFoldL(f, acc, @xs);
}

/**
* lFoldLu : ((b, a) -> b) -> b -> List a -> b
*/
function lFoldLu(@f){ return function(@acc) { return function(@xs) {
	return _ulFoldLu(f, acc, @xs);
};};}

/**
* ulFoldLu : ((b -> a -> b), b, List a) -> b
*/
function ulFoldLu(@f, @acc, @xs) {
	return _ulFoldLu(f, acc, @xs);
}

/**
* lFoldR : (a -> b -> b) -> b -> List a -> b
*/
function lFoldR(@f) { return function(@acc) { return function(@xs) {
	return _ulFoldR(f, acc, @xs);
};};}

/**
* ulFoldR : ((a -> b -> b), b, List a) -> b
*/
function ulFoldR(@f, @acc, @xs) {
	return _ulFoldR(f, acc, @xs);
}

/**
* ulFoldRu : (((a, b) -> b), b, List a) -> b
*/
function ulFoldRu(@f, @acc, @xs) {
	return _ulFoldRu(f, acc, @xs);
}

/**
* lMap : (a -> b) -> List a -> List b
*/
function lMap(@f) { return function (@xs) {
	return _ulMap(f, @xs);
};}

/**
* ulMap : ((a -> b), List a) -> List b
*/
function ulMap(@f, @xs) {
	return _ulMap(f, @xs);
}

/**
* ulAppendMap : ((a -> b), List a, List b) -> List b
*/
function ulAppendMap(@f, @xs, @acc) {
	return _ulAppendMap(f, @xs, acc);
}

/**
* ulFilterConcat : ((a -> Bool), List (List a)) -> List a
*/
function ulFilterConcat(@p, @xss) {
	return _ulFilterConcat(p, @xss);
}

/**
* lConcatFilterMap : (a -> List b) -> (b -> Bool) -> List a -> List b
*/
function lFilterConcatMap(@f) { return function(@p) { return function(@xs) {
return _ulFilterConcatMap(f, p, @xs);
};};}

/**
* ulConcatFilterMap : ((a -> List b), (b -> Bool), List a) -> List b
*/
function ulFilterConcatMap(@f, @p, @xs) {
	return _ulFilterConcatMap(f, p, @xs);
}

/**
* ulConcatMapFilter : ((a -> Bool), (a -> List b), List a) -> List b
*/
function ulConcatMapFilter(@p, @f, @xs) {
	return _ulConcatMapFilter(p, f, @xs);
}

/**
* lAppend : List a -> List a -> List a
*/
function lAppend(@xs) { return function(@ys) {
		return _ulAppend(@xs, ys);
};}

/**
* ulAppend : (List a, List a) -> List a
*/
function ulAppend(@xs, @ys) {
	return _ulAppend(@xs, ys);
}

/**
* lFilter : (a -> Bool) -> List a -> List a
*/
function lFilter(@p) { return function (@xs) {
	return _ulFilter(p, @xs);
};}

/**
* ulFilter : ((a -> Bool), List a) -> List a
*/
function ulFilter(@p, @xs) {
	return _ulFilter(p, @xs);
}

/**
* lAppendFilter : (a -> Bool) -> List a -> List a -> List a
*/
function lAppendFilter(@p) { return function(@xs) {return function(@acc){
	return _ulAppendFilter(p, @xs, acc);
};};}

/**
* ulAppendFilter : ((a -> Bool), List a, List a) -> List a
*/
function ulAppendFilter(@p, @xs, @acc) {
	return _ulAppendFilter(p, @xs, acc);
}

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
	return _ulApply(@fs, xs);
};}

/**
* ulApply : (List (a -> b), List a) -> List b
*/
function ulApply(@fs, @xs) {
	return _ulApply(@fs, xs);
}

/**
* lConcatMap : (a -> List b) -> List a -> List b
*/
function lConcatMap(@f) { return function(@xs) {
	return _ulConcatMap(f, @xs);
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
	return _ulTake(n, @xs);
};}

/**
* ulTake : (Int, List a) -> List a
*/
function ulTake(@n, @xs) {
	return _ulTake(n, @xs);
}

/**
* lDrop : Int -> List a -> List a
*/
function lDrop(@n) { return function(@xs) {
	return _ulDrop(n, @xs);
};}

/**
* ulDrop : (Int, List a) -> List a
*/
function ulDrop(@n, @xs) {
	return _ulDrop(n, @xs);
}


/**
* lAll : (a -> Bool) -> List a -> Bool
*/
function lAll(@p) { return function(@xs) {
	return _ulAll(p, @xs);
};}

/**
* ulAll : ((a -> Bool), List a) -> Bool
*/
function ulAll(@p, @xs) {
	return _ulAll(p, @xs);
}


/**
* lAny : (a -> Bool) -> List a -> Bool
*/
function lAny(@p) { return function(@xs) {
	return _ulAny(p, @xs);
};}

/**
* ulAny : ((a -> Bool), List a) -> Bool
*/
function ulAny(@p, @xs) {
	return _ulAny(p, @xs);
}
