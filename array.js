include("functional.js");
include("bool.js");
include("debug");


/**
* aFoldL : (b -> a -> b) -> b -> Array a -> b
*/
function aFoldL(@f) { return function(@b) { return function(@as) {
	return arrayFoldLeft(as, uncurry2(f), b);
};};}

/**
* aFoldLu : ((b, a) -> b) -> b -> Array a -> b
*/
function aFoldLu(@f) { return function(@b) { return function(@as) {
	return arrayFoldLeft(as, f, b);
};};}

/**
* aFoldR : (a -> b -> b) -> b -> Array a -> b
*/
function aFoldR(@f) { return function(@b) { return function(@as) {
	return arrayFoldRight(as, uncurry2(f), b);
};};}

/**
* aFoldR : ((a, b) -> b) -> b -> Array a -> b
*/
function aFoldRu(@f) { return function(@b) { return function(@as) {
	return arrayFoldRight(as, f, b);
};};}

/**
* aFilter : (a -> Bool) -> Array a -> Array a
*/
function aFilter(@p) { return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x){if (p(x)){push(acc, x);} return acc;}, []);
};}

/**
* aAppendFilter : ((a -> Bool), Array a, Array a) -> Array a
*/
function aAppendFilter(@p) { return function(@xs) { return function(@ys) {
	var ret =@ arrayFoldLeft(xs, function(@acc, @x){if (p(x)){push(acc, x);} return acc;}, []);
	ret += ys;
	return ret;
};};}

/**
* uaAppendFilter : ((a -> Bool), Array a, Array a) -> Array a
*/
function uaAppendFilter(@p, @xs, @ys) {
	var ret =@ arrayFoldLeft(xs, function(@acc, @x){if (p(x)){push(acc, x);} return acc;}, []);
	ret += ys;
	return ret;
}

/**
* aMap : (a -> b) -> Array a -> Array b
*/
function aMap(@f) { return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x){push(acc, f(x)); return acc;}, []);
};}

/**
* daMap : (a -> b) -> Array a -> Array b
*/
function daMap(@f) { return function(@xs) {
	arrayFoldLeft(xs, function(@acc, @x){ x =@ f(x); return acc; }, f);
	return xs;
};}

/**
* aAppendMap : ((a -> b), Array a, Array b) -> Array b
*/
function aAppendMap(@f) { return function(@xs) { return function(@ys) {
	var ret =@ arrayFoldLeft(xs, function(@acc, @x){push(acc, f(x)); return acc;}, []);
	ret += ys;
	return ret;
};};}

/**
* uaAppendMap : ((a -> b), Array a, Array b) -> Array b
*/
function uaAppendMap(@f, @xs, @ys) {
	var ret =@ arrayFoldLeft(xs, function(@acc, @x){push(acc, f(x)); return acc;}, []);
	ret += ys;
	return ret;
}

/**
* aConcatMap : (a -> Array b) -> Array a -> Array b
*/
function aConcatMap(@f) { return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x){acc += f(x); return acc;}, []);
};}

/**
* aConcatFilterMap : (a -> Array b) -> (b -> Bool) -> Array a -> Array b
*/
function aFilterConcatMap(@f) { return function(@p) { return function(@xs) {
	var ret = [];
	arrayFoldLeft(xs
				, function(@_, @x){arrayFoldLeft(f(x), function(@__, @y){if(p(y)){push(ret, y);} return __;},f); return _;}
				, f);
	return ret;
};};}

/**
* aFilterMap : (a -> b) -> (b -> Bool) -> Array a -> Array b
*/
function aFilterMap(@f) { return function(@p) { return function(@xs) {
	return arrayFoldLeft(xs
				, function(@acc, x){
						var y =@ f(x);
						if (p(y)) { push(acc, y); }
						return acc; }
				, []);
};};}

/**
* aMapFilter : (a -> Bool) -> (a -> b) -> Array a -> Array b
*/
function aMapFilter(@p) { return function(@f) { return function(@xs) {
	return arrayFoldLeft(xs
				, function(@acc, x){ if (p(x)) { push(acc, f(x)); } return acc; }
				, []);
};};}

/**
* aConcat : Array (Array a) -> Array a
*/
function aConcat(@xss) {
	return arrayFlatten(xss, 1);
}

/**
* aAppend : Array a -> Array a -> Array a
*/
function aAppend(@xs) {return function(@ys) {
	var ret = [];
	ret += xs;
	ret += ys;
	return ret;
};}

/**
* aApply : Array (a -> b) -> Array a -> Array b
*/
function aApply(@fs) { return function(@xs) {
	var ret = [];
	arrayFoldLeft(fs
				, function(@_, @f){ return arrayFoldLeft(xs, function(@__, @x){ push(ret, f(x)); return __; }, _); }
				, null);
	return ret;
};}

/**
* aIntersection : Array a -> Array a -> Array a
*/
function aIntersection(@xs) { return function(@ys) {
    if (count(ys) < count(xs)) { return aIntersection(ys)(xs); }
	var tmp =@ arrayFoldLeft(xs, function(@acc, @x) { acc["" + x] = true; return acc; }, []);
	return aFilter(function(@y){return tmp["" + y];})(ys);
};}

/**
* aRelativeComplement : Array a -> Array a -> Array a
*/
function aRelativeComplement(@xs) { return function(@ys) {
    var tmp =@ arrayFoldLeft(ys, function(@acc, @y) { acc["" + y] = true; return acc; }, []);
	return aFilter(function(@x){return !tmp["" + x];})(xs);
};}

function aUnion(@xs) { return function(@ys) {
	var tmp =@ arrayFoldLeft(xs, function(@acc, @x) { acc["" + x] = true; return acc; }, []);
	return aAppend(xs)(aFilter(function(@y){return !tmp["" + y];})(ys));
};}

/**
* aIter : (a -> ()) -> Array a -> ()
*/
function aIter(@f) { return function(@xs) {
	arrayFoldLeft(xs, function(@_, @x){f(x);}, null);
};}

/**
* uaTake : (Int, Array a) -> Array a
*/
function uaTake(n, @xs) {
	return arrayFoldLeft(xs, function(@acc, @x){if (n <= 0){ return acc;} push(acc, x); n--; return acc;}, []);
}

/**
* aTake : Int -> Array a -> Array a
*/
function aTake(@n) { return function(@xs) {
	return uaTake(n, xs);
};}

/**
* uaAny : (a -> Bool, Array a) -> Bool
*/
function uaAny(@p, @xs) {
	return arrayFoldLeft(xs, function(@acc, @x) { return acc || p(x); }, false);
}

/**
* aAny : (a -> Bool) -> Array a -> Bool
*/
function aAny(@p) { return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x) { return acc || p(x); }, false);
};}

/**
* uaAll : (a -> Bool, Array a) -> Bool
*/
function uaAll(@p, @xs) {
	return arrayFoldLeft(xs, function(@acc, @x) { return acc && p(x); }, true);
}

/**
* aAll : (a -> Bool) -> Array a -> Bool
*/
function aAll(@p) { return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x) { return acc && p(x); }, true);
};}

/**
* isEmpty : Array a -> Bool
*/
function isEmpty(@xs) { return count(xs) === 0; }

/**
* isNonEmpty : Array a -> Bool
*/
function isNonEmpty(@xs) { return count(xs) !== 0; }


/**
* getKeys : Assoc a b -> Array a
*/
function getKeys(xs) {
    var ks = [];
    for (var k : var x in xs) {
        push(ks, k);
    }
    return ks;
}

/**
* pairKV : a -> b -> Assoc a b
*/
function pairKV(@k) { return function(@v) {
    var type = typeOf(k);
    return @[(type === TYPE_NUMBER || type === TYPE_STRING ? k : "" + k) : v];};}

/**
* assocInsert : a -> b -> Assoc String b -> Assoc String b [mutating]
*/
function assocInsert(@k) { return function(@v) { return function(@xs) {
    xs["" + k] = v;
    return xs;
};};}

/**
* assocLookup : Assoc String b -> a -> b
*/
function assocLookup(@xs) { return function(@k) {
    return xs["" + k];
};}

/**
* keysMap : (k -> v) -> Array k -> Assoc k v
*/
function keysMap(f) { return function(@ks) {
	return arrayFoldLeft(ks, function(@acc, @k) { acc[k] = f(k); return acc; }, []);
};}

/**
* kvsFromMap : (v -> k) -> Array v -> Assoc k v
*/
function kvsFromMap(f) { return function(@vs) {
	return arrayFoldLeft(vs, function(@acc, @v) { acc[f(v)] = v; return acc; }, []);
};}

/**
* access : k -> Assoc k v -> v
*/
function access(@k) { return function(@kvs) { return kvs[k]; };}

/**
* lookup : Assoc k v -> k -> v
*/
function lookup(@kvs) { return function(@k) { return kvs[k]; };}

/**
* cyclicAccess : Num k => k -> Assoc k v -> v
*/
function cyclicAccess(@k) { return function(@kvs) { return kvs[k % count(kvs)]; };}

/**
* cyclicLookup : Num k => Assoc k v -> k -> v
*/
function cyclicLookup(@kvs) { return function(@k) { return kvs[k % count(kvs)]; };}

function cloneAt(@xs, @out) {
	return out += xs;
}
