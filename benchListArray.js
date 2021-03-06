include("debug");
include("array.js");
include("math.js");
include("list.js");
include("functional.js");

if (getTurn() !== 1) {return ;}

var aSmallo = [1,2,3];
var aBigo = [1,2,1,2,1,2,1,2,4,3,4,3,4,3];
var aSmall = aMap(id/*function(x) {return [x];}*/)(aSmallo);
var aBig = aMap(id/*function(x) {return [x];}*/)(aBigo);
debug("aSmall: " + aSmall);
debug("aBig: " + aBig);

var lSmallo = lFromArray(aSmall);
var lBigo = lFromArray(aBig);
var lSmall = lMap(id/*function(x) {return [x];}*/)(lSmallo);
var lBig = lMap(id/*function(x) {return [x];}*/)(lBigo);
debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

debug("\n--- Head tests ---");
startOp();
var lh = lHead(lSmall);
stopOp("var lh = lHead(lSmall);");
debug(lh);
startOp();
lHead(null);
stopOp("lHead(null);");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

debug("\n--- Tail tests ---");
startOp();
var ltail = lTail(lSmall);
stopOp("var ltail = lTail(lSmall);");
debug(lToArray(ltail));
startOp();
lTail(null);
stopOp("lTail(null);");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

debug("\n--- Filter tests ---");
var diff1 = function(x){return x != 1;};
var lLong = lAppend(lBig)(lBig);

startOp();
var lfi =@ lFilter(diff1)(lBig);
stopOp("var lfi =@ lFilter((!=1))(lBig);");
startOp();
debug(lToArray(lfi));
stopOp("debug(lToArray(lfi));");
startOp();
debug(lToArray(lfi));
stopOp("debug(lToArray(lfi));");
debug("second check: " + lToArray(lfi));
startOp();
var afi =@ aFilter(diff1)(aBig);
stopOp("var afi =@ aFilter((!=1))(aBig);");
debug(afi);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- Map tests ---");
startOp();
var lm =@ lMap(diff1)(lBig);
stopOp("var lm =@ lMap((!=1))(lBig);");
startOp();
debug(lToArray(lm));
stopOp("debug(lToArray(lm));");
startOp();
debug(lToArray(lm));
stopOp("debug(lToArray(lm));");
debug("2nd check: " + lToArray(lm));
debug("3rd check: " + lToArray(lm));
startOp();
var am =@ aMap(diff1)(aBig);
stopOp("var am =@ aMap((!=1))(aBig);");
debug(am);

var damBig = aBig;

startOp();
var dam =@ daMap(diff1)(damBig);
stopOp("var dam =@ daMap((!=1))(damBig);");
debug(dam);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- FoldL tests ---");
startOp();
var lfl =@ lFoldL(add)(0)(lBig);
stopOp("var lfl = lFoldL(add)(0)(lBig);");
debug(lfl);
startOp();
var afl = aFoldL(add)(0)(aBig);
stopOp("var afl = aFoldL(add)(0)(aBig);");
debug(afl);
startOp();
var forafl = 0;
for (var x in aBig) {forafl =@ add(0)(x);};
stopOp("var forafl = 0; for (var x in aBig) {forafl =@ add(0)(x);};");
debug(forafl);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- FoldR tests ---");
startOp();
var lfr = lFoldR(add)(0)(lBig);
stopOp("var lfr = lFoldR(add)(0)(lBig);");
debug(lfr);
startOp();
var afr = aFoldR(add)(0)(aBig);
stopOp("var afr = aFoldR(add)(0)(aBig);");
debug(afr);

startOp();
var asum = sum(aBig);
stopOp("var asum = sum(aBig);");
debug(asum);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- Append tests ---");
startOp();
var la = lAppend(lBig)(lSmall);
stopOp("var la = lAppend(lBig)(lSmall);");
startOp();
debug(lToArray(la));
stopOp("debug(lToArray(la));");
startOp();
debug(lToArray(la));
stopOp("debug(lToArray(la));");
debug("second check: " + lToArray(la));
startOp();
var aa =@ aAppend(aBig)(aSmall);
stopOp("var aa =@ aAppend(aBig)(aSmall); ...");
debug(aa);

debug("lSmall: " + lToArray(lSmall));
debug("aSmall: " + aSmall);
debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- Concat tests ---");
var aBigSmall = aMap(const(aSmall))(aBig);
debug("aBigSmall: " + aBigSmall);
var lBigSmall = lFromArray(aMap(lFromArray)(aBigSmall));
debug("lBigSmall: " + lToArray(lMap(lToArray)(lBigSmall)));

startOp();
var lc = lConcat(lBigSmall);
stopOp("var lc = lConcat(lBigSmall);");
startOp();
debug(lToArray(lc));
stopOp("debug(lToArray(lc));");
debug("second check: " + lToArray(lc));
startOp();
var ac =@ aConcat(aBigSmall);
stopOp("var ac =@ aConcat(aBigSmall);");
debug("ac: " + ac);

debug("lBigSmall: " + lToArray(lMap(lToArray)(lBigSmall)));
debug("aBigSmall: " + aBigSmall);
debug("lSmall: " + lToArray(lSmall));
debug("aSmall: " + aSmall);
debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- Iter tests ---");
var size = 0;
var sizepp = function(@a){size++;};

startOp();
lIter(sizepp)(lBig);
stopOp("lIter(sizepp)(lBig);");
debug("size: " + size);
size = 0;
startOp();
aIter(sizepp)(aBig);
stopOp("aIter(sizepp)(aBig);");
debug("size: " + size);

debug("count(ns): " + size);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- ConcatMap test ---");

var acm1 =@ [111,222,333];
var lcm1 = lFromArray(acm1);
var lret111222333 = function(@a){return @lcm1;};
var aret111222333 = function(@a){return @acm1;};

startOp();
var lcm =@ lConcatMap(lret111222333)(lBig);
stopOp("var lcm = lConcatMap(lret111222333)(lBig);");
startOp();
debug(lToArray(lcm));
stopOp("debug(lToArray(lcm));");
debug("second check: " + lToArray(lcm));
startOp();
var acm =@ aConcatMap(aret111222333)(aBig);
stopOp("var acm = aConcatMap(aret111222333)(aBig);");
debug(acm);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- Apply tests ---");
var afs = [add(0), add(1), add(100)];
var lfs = lFromArray(afs);
debug("var fs = [add(0), add(1), add(100)];");

startOp();
var lapp =@ lApply(lfs)(lBig);
stopOp("var lapp = lApply(lfs)(lBig);");
startOp();
debug(lToArray(lapp));
stopOp("debug(lToArray(lapp));");
debug("second check: " + lToArray(lapp));
startOp();
var aapp =@ aApply(afs)(aBig);
stopOp("var aapp = aApply(afs)(aBig);");
debug(aapp);


debug("lfs: " + lToArray(lfs));
debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- aRelativeComplement tests ---");
startOp();
var arc =@ aRelativeComplement(aBig)(aSmall);
stopOp("var arc = aRelativeComplement(aBig)(aSmall);");
debug(arc);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- aIntersection tests ---");
startOp();
var ai =@ aIntersection(aBig)(aSmall);
stopOp("var ai = aIntersection(aBig)(aSmall);");
debug(ai);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- AppendMap tests ---");
startOp();
var lam = ulAppendMap(diff1, lBig, lSmall);
stopOp("var lam = ulAppendMap((!=1), lBig, lSmall);");
startOp();
debug(lToArray(lam));
stopOp("debug(lToArray(lam));");
debug("second check: " + lToArray(lam));
startOp();
var aam =@ uaAppendMap(diff1, aBig, aSmall);
stopOp("var aam = uaAppendMap((!=1), aBig, aSmall);");

startOp();
debug(aMap(id)(aam));
stopOp("debug(aMap(id)(aam));");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));
debug("lSmall: " + (aSmall));
debug("lBig: " + (aBig));

debug("\n--- AppendFilter tests ---");
startOp();
var laf = lAppendFilter(diff1)(lBig)(lSmall);
stopOp("var laf = lAppendFilter(diff1)(lBig)(lSmall);");
startOp();
debug(lToArray(laf));
stopOp("debug(lToArray(laf));");
debug("second check: " + lToArray(laf));

startOp();
var aaf =@ aAppendFilter(diff1)(aBig)(aSmall);
stopOp("var aaf = aAppendFilter(diff1)(aBig)(aSmall);");
startOp();
debug(aMap(id)(aaf));
stopOp("debug(aMap(id)(aaf));");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));
debug("lSmall: " + (aSmall));
debug("lBig: " + (aBig));

debug("\n--- ConcatFilterMap tests ---");
function getLNeighbors(@cell) {
	var ret = null;
    var x = getCellX(cell);
    var y = getCellY(cell);
    var c1 = getCellFromXY(x + 1, y);
    var c2 = getCellFromXY(x - 1, y);
    var c3 = getCellFromXY(x, y + 1);
    var c4 = getCellFromXY(x, y - 1);
    if (c1 !== null) {ret = ulSafeTailCons(c1, ret);}
    if (c2 !== null) {ret = ulSafeTailCons(c2, ret);}
    if (c3 !== null) {ret = ulSafeTailCons(c3, ret);}
    if (c4 !== null) {ret = ulSafeTailCons(c4, ret);}
	return ret;
}
function getANeighbors(@cell) {
	var ret = [];
    var x = getCellX(cell);
    var y = getCellY(cell);
    var c1 = getCellFromXY(x + 1, y);
    var c2 = getCellFromXY(x - 1, y);
    var c3 = getCellFromXY(x, y + 1);
    var c4 = getCellFromXY(x, y - 1);
    if (c1 !== null) { push(ret, c1); }
    if (c2 !== null) { push(ret, c2); }
    if (c3 !== null) { push(ret, c3); }
    if (c4 !== null) { push(ret, c4); }
	return ret;
}

startOp();
var lcfm = ulFilterConcatMap(getLNeighbors, diff1, lBig);
stopOp("var lcfm = ulFilterConcatMap(getLNeighbors, diff1, lBig);");
startOp();
debug(lToArray(lcfm));
stopOp("debug(lToArray(lcfm));");
startOp();
debug(lToArray(lcfm));
stopOp("debug(lToArray(lcfm));");
debug("2nd check: " + lToArray(lcfm));
debug("3rd check: " + lToArray(lcfm));

startOp();
var acfm = aFilterConcatMap(getANeighbors)(diff1)(aBig);
stopOp("var acfm = aFilterConcatMap(getLNeighbors)(diff1)(aBig);");
startOp();
debug(aMap(id)(acfm));
stopOp("debug(aMap(id)(acfm));");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

debug("\n--- Take tests ---");

startOp();
var lt =@ ulTake(15, lBig);
stopOp("var lt = ulTake(7, lBig);");
startOp();
debug(lToArray(lt));
stopOp("debug(lToArray(lt));");
startOp();
debug(lToArray(lt));
stopOp("debug(lToArray(lt));");
debug("2nd check: " + lToArray(lcfm));
debug("3rd check: " + lToArray(lcfm));

startOp();
var at =@ uaTake(15, aBig);
stopOp("var at = uaTake(7, aBig);");
startOp();
debug(aMap(id)(at));
stopOp("debug(aMap(id)(at));");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

debug("\n--- cloneAt tests ---");

var acat = [[]];
startOp();
acat[1] = [];
cloneAt(aSmall, acat[1]);
stopOp("var acat = [1];");

debug(acat);
