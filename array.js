include("functional");
include("bool");

// --- aFoldL : (b -> a -> b) -> b -> Array a -> b
function aFoldL(@f) { return function(@b) { return function(@as) {
	/*var ret = b;
	for (var a in as) {
		//var av = @a;
		ret = f(ret)(a);
	}
	return @ret;*/
	return arrayFoldLeft(as, uncurry2(f), b);
};};};

// ---   aFoldR : (a -> b -> b) -> b -> Array a -> b
function aFoldR(@f) { return function(@b) { return function(@as) {
	return arrayFoldRight(as, uncurry2(f), b);
};};}

// --- aFilter : (a -> Bool) -> Array a -> Array a
function aFilter(@p) { return function(@xs) {
    var tmp = [];
    for (var x in xs) {
		var xv = @x;
        if (p(x)) {push(tmp, x); }
    }
    return @tmp;
};};

// ---   aMap : (a -> b) -> Array a -> Array b
function aMap(@f){ return function(@xs) {
	return arrayFoldLeft(xs, function(@acc, @x){push(acc, f(x));return @acc;}, []);
};};

// ---   aConcatMap : (a -> Array b) -> Array a -> Array b
function aConcatMap(@f) { return function(@xs) {
	var tmp = [];
	for (var x in xs) {
		var xv = @x;
		tmp += f(xv);
	}
	return @tmp;
};}

function aConcat(@xss) {
	return arrayFoldRight(xss, arrayConcat, []);
}

function aAppend(@xs) {return function(@ys) {
	//return arrayFoldLeft(ys, function(@acc, @y){push(acc, y);return @acc;}, xs);
	//return arrayFoldRight(xs, function(@x, @acc){unshift(acc, x);return @acc;}, ys);
	return @(xs + ys);
};}

// ---   aApply : Array (a -> b) -> Array a -> Array b
function aApply(@fs) { return function(@xs) {
	var ret = [];
	for (var f in fs) {
		var fv = @f;
		pushAll(ret, aMap(fv)(xs));
	}
	return @ret;
};}

// ---   aIntersection : Array a -> Array a -> Array a
function aIntersection(@xs) { return function(@ys) {
    if (count(ys) < count(xs)) {return aIntersection(ys)(xs);}
    var tmp = [];
    for (var x in xs) {
        assocInsert(x)(true)(tmp); }
    return aFilter(assocLookup(tmp))(ys);
};}

// ---   aRelativeComplement : Array a -> Array a -> Array a
function aRelativeComplement(@xs) { return function(@ys) {
    var tmp = [];
    for (var y in ys) {
        assocInsert(y)(true)(tmp); }
    return aFilter(negate(assocLookup(tmp)))(xs);
};}

// ---   isEmpty : Array a -> Bool
function isEmpty(@xs) { return count(xs) === 0; }

// ---   isNonEmpty : Array a -> Bool
function isNonEmpty(@xs) { return count(xs) !== 0; }


// ---   getKeys : Assoc a b -> Array a
function getKeys(xs) {
    var ks = [];
    for (var k : var x in xs) {
        push(ks, k);
    }
    return @ks;
}

// --    pairKV : a -> b -> Assoc a b
function pairKV(@k) { return function(@v) {
    var type = typeOf(k);
    return @[(type === TYPE_NUMBER || type === TYPE_STRING ? k : "" + k) : v];};}

// ---   assocInsert : a -> b -> Assoc a b -> Assoc a b [mutating]
function assocInsert(@k) { return function(@v) { return function(@xs) {
    xs["" + k] = v;
    return @xs;
};};}

// ---   assocLookup : Assoc a b -> a -> b
function assocLookup(@xs) { return function(@k) {
    return @xs["" + k];
};}
