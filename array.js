include("functional");
include("bool");


/**
* aFoldL : (b -> a -> b) -> b -> Array a -> b
*/
function aFoldL(@f) { return function(@b) { return function(@as) {
	return arrayFoldLeft(as, uncurry2(f), b);
};};};

/**
* aFoldLu : ((b, a) -> b) -> b -> Array a -> b
*/
function aFoldLu(@f) { return function(@b) { return function(@as) {
	return arrayFoldLeft(as, f, b);
};};};

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
	return arrayFoldLeft(xs, function(@acc, @x){if (p(x)){push(acc, x);} return @acc;}, []);
};};

/**
* aMap : (a -> b) -> Array a -> Array b
*/
function aMap(@f){ return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x){push(acc, f(x));return @acc;}, []);
};};

/**
* aConcatMap : (a -> Array b) -> Array a -> Array b
*/
function aConcatMap(@f) { return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x){acc += f(x); return @acc;}, []);
};}

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
	return @ret;
};}

/**
* aApply : Array (a -> b) -> Array a -> Array b
*/
function aApply(@fs) { return function(@xs) {
	return arrayFoldLeft(fs, function(@acc, @f){
				acc += arrayFoldLeft(xs, function(@_acc, @x){
					push(_acc, f(x));return @_acc;}, []);
				return @acc;
			}, []);
};}

/**
* aIntersection : Array a -> Array a -> Array a
*/
function aIntersection(@xs) { return function(@ys) {
    if (count(ys) < count(xs)) {return aIntersection(ys)(xs);}
    var tmp = [];
    for (var x in xs) {
        assocInsert(x)(true)(tmp); }
    return aFilter(assocLookup(tmp))(ys);
};}

/**
* aRelativeComplement : Array a -> Array a -> Array a
*/
function aRelativeComplement(@xs) { return function(@ys) {
    var tmp = [];
    for (var y in ys) {
        assocInsert(y)(true)(tmp); }
    return aFilter(negate(assocLookup(tmp)))(xs);
};}

/**
* aIter : (a -> ()) -> Array a -> ()
*/
function aIter(@f) { return function(@xs) {
	arrayFoldLeft(xs, function(@_, @x){f(x);}, null);
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
    return @ks;
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
    return @xs;
};};}

/**
* assocLookup : Assoc String b -> a -> b
*/
function assocLookup(@xs) { return function(@k) {
    return @xs["" + k];
};}
