include("debug");
include("array.js");
include("math.js");
include("list.js");

if (getTurn() !== 1) {return ;}

var aSmall = [1,2,3];
var aBig = [1,2,1,2,1,2,1,2,4,3,4,3,4,3];
debug("aSmall: " + aSmall);
debug("aBig: " + aBig);

var lSmall = lFromArray(aSmall);
var lBig = lFromArray(aBig);
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

debug("\n--- Tail tests ---");
startOp();
var lt = lTail(lSmall);
stopOp("var lt = lTail(lSmall);");
debug(lToArray(lt));
startOp();
lTail(null);
stopOp("lTail(null);");

debug("lSmall: " + lToArray(lSmall));

debug("\n--- Filter tests ---");
var diff1 = function(x){return x != 1;};
var lLong = lAppend(lBig)(lBig);

startOp();
var lfi =@ lFilter(diff1)(lBig);
stopOp("var lfi = lFilter((!=1))(lBig);");
startOp();
debug(lToArray(lfi));
stopOp("debug(lToArray(lfi));");
startOp();
var afi =@ aFilter(diff1)(aBig);
stopOp("var afi = aFilter((!=1))(aBig);");
debug(afi);

debug("lBig: " + lToArray(lBig));
debug("aBig: " + aBig);

debug("\n--- Map tests ---");
startOp();
var lm =@ lMap(diff1)(lBig);
stopOp("var lm = lMap((!=1))(lBig);");
startOp();
debug(lToArray(lm));
stopOp("debug(lToArray(lm));");
startOp();
var am =@ aMap(diff1)(aBig);
stopOp("var am = aMap((!=1))(aBig);");
debug(am);

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
var aa =@ aAppend(aBig)(aSmall);
stopOp("var aa = aAppend(aBig)(aSmall); ...");
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
debug("lc: " + lToArray(lc));
stopOp("debug(\"lc: \" + lToArray(lc));");
startOp();
var ac =@ aConcat(aBigSmall);
stopOp("var ac = aConcat(aBigSmall);");
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

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

debug("\n--- AppendFilter tests ---");
startOp();
var laf = lAppendFilter(diff1)(lBig)(lSmall);
stopOp("var laf = ulAppendFilter((!=1), lBig, lSmall);");
startOp();
debug(lToArray(laf));
stopOp("debug(lToArray(laf));");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

debug("\n--- ConcatFilterMap tests ---");
startOp();
var lcfm = ulConcatFilterMap(lret111222333, diff1, lBig);
stopOp("var lcfm = lConcatFilterMap(lret111222333, diff1, lBig);");
startOp();
debug(lToArray(lcfm));
stopOp("debug(lToArray(lcfm));");

debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));
