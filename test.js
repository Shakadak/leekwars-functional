include("debug");
include("array");
include("math");
include("list");
include("pure_list");

var aSmall = [1,2,3];
var aBig = [1,2,1,2,1,2,1,2,4,3,4,3,4,3];
debug("aSmall: " + aSmall);
debug("aBig: " + aBig);

var lSmall = lFromArray(aSmall);
var lBig = lFromArray(aBig);
debug("lSmall: " + lToArray(lSmall));
debug("lBig: " + lToArray(lBig));

var plSmall = plFromArray(aSmall);
var plBig = plFromArray(aBig);
debug("plSmall: " + plToArray(plSmall));
debug("plBig: " + plToArray(plBig));

debug("\n--- Head tests ---");
startOp();
var lh = lHead(lSmall);
stopOp("var lh = lHead(lSmall);");
debug(lh);
startOp();
var plh = plHead(plSmall);
stopOp("var plh = plHead(plSmall);");
debug(plh);
startOp();
lHead(null);
stopOp("lHead(null);");
startOp();
plHead(null);
stopOp("plHead(null);");

debug("lSmall: " + lToArray(lSmall));
debug("plSmall: " + plToArray(plSmall));

debug("\n--- Tail tests ---");
startOp();
var lt = lTail(lSmall);
stopOp("var lt = lTail(lSmall);");
debug(lToArray(lt));
startOp();
var plt = plTail(plSmall);
stopOp("var plt = plTail(plSmall);");
debug(lToArray(plt));
startOp();
lTail(null);
stopOp("lTail(null);");
startOp();
plTail(null);
stopOp("plTail(null);");

debug("lSmall: " + lToArray(lSmall));
debug("plSmall: " + plToArray(plSmall));

debug("\n--- Filter tests ---");
var diff1 = function(x){return x != 1;};
startOp();
var lfi = lFilter(diff1)(lBig);
stopOp("var lfi = lFilter((!=1))(lBig);");
debug(lToArray(lfi));
startOp();
var plfi = plFilter(diff1)(plBig);
stopOp("var plfi = plFilter((!=1))(plBig);");
debug(lToArray(plfi));
startOp();
var afi = aFilter(diff1)(aBig);
stopOp("var afi = aFilter((!=1))(aBig);");
debug(afi);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- Map tests ---");
startOp();
var lm = lMap(diff1)(lBig);
stopOp("var lm = lMap((!=1))(lBig);");
debug(lToArray(lm));
startOp();
var plm = plMap(diff1)(plBig);
stopOp("var plm = plMap((!=1))(plBig);");
debug(plToArray(plm));
startOp();
var am = aMap(diff1)(aBig);
stopOp("var am = aMap((!=1))(aBig);");
debug(am);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- FoldL tests ---");
startOp();
var lfl = lFoldL(add)(0)(lBig);
stopOp("var lfl = lFoldL(add)(0)(lBig);");
debug(lfl);
startOp();
var plfl = plFoldL(add)(0)(plBig);
stopOp("var plfl = plFoldL(add)(0)(plBig);");
debug(plfl);
startOp();
var afl = aFoldL(add)(0)(aBig);
stopOp("var afl = aFoldL(add)(0)(aBig);");
debug(afl);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- FoldR tests ---");
startOp();
var lfr = lFoldR(add)(0)(lBig);
stopOp("var lfr = lFoldR(add)(0)(lBig);");
debug(lfr);
startOp();
var plfr = plFoldR(add)(0)(plBig);
stopOp("var plfr = plFoldR(add)(0)(plBig);");
debug(plfr);
startOp();
var afr = aFoldR(add)(0)(aBig);
stopOp("var afr = aFoldR(add)(0)(aBig);");
debug(afr);

startOp();
var asum = sum(aBig);
stopOp("var asum = sum(aBig);");
debug(asum);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- Append tests ---");
startOp();
var la = lAppend(lBig)(lSmall);
stopOp("var la = lAppend(lBig)(lSmall);");
debug(lToArray(la));
startOp();
var pla = plAppend(plBig)(plSmall);
stopOp("var pla = plAppend(plBig)(plSmall);");
debug(plToArray(pla));
startOp();
var aa = aAppend(aBig)(aSmall);
stopOp("var aa = aAppend(aBig)(aSmall); ...");
debug(aa);

debug("lSmall: " + lToArray(lSmall));
debug("plSmall: " + plToArray(plSmall));
debug("aSmall: " + aSmall);
debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- Concat tests ---");
var aBigSmall = aMap(const(aSmall))(aBig);
debug("aBigSmall: " + aBigSmall);
var lBigSmall = lFromArray(aMap(lFromArray)(aBigSmall));
debug("lBigSmall: " + lToArray(lMap(lToArray)(lBigSmall)));
var plBigSmall = plFromArray(aMap(plFromArray)(aBigSmall));
debug("plBigSmall: " + plToArray(plMap(plToArray)(plBigSmall)));

startOp();
var lc = lConcat(lBigSmall);
stopOp("var lc = lConcat(lBigSmall);");
debug("lc: " + lToArray(lc));
startOp();
var plc = plConcat(plBigSmall);
stopOp("var plc = plConcat(plBigSmall);");
debug("plc: " + plToArray(plc));
startOp();
var ac = aConcat(aBigSmall);
stopOp("var ac = aConcat(aBigSmall);");
debug("ac: " + ac);

debug("lSmall: " + lToArray(lSmall));
debug("plSmall: " + plToArray(plSmall));
debug("aSmall: " + aSmall);
debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- Iter tests ---");
var size = 0;
var sizepp = function(@a){size++;};
startOp();
lIter(sizepp)(lBig);
stopOp("lIter(sizepp)(lBig);");
debug("size: " + size);
startOp();
plIter(sizepp)(plBig);
stopOp("plIter(sizepp)(plBig);");
debug("size: " + size);
size = 0;
startOp();
aIter(sizepp)(aBig);
stopOp("aIter(sizepp)(aBig);");
debug("size: " + size);

debug("count(ns): " + size);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- ConcatMap test ---");

var acm1 = [111,222,333];
var lcm1 = lFromArray(acm1);
var plcm1 = plFromArray(acm1);
var lret111222333 = function(@a){return @lcm1;};
var plret111222333 = function(@a){return @plcm1;};
var aret111222333 = function(@a){return @acm1;};

startOp();
var lcm = lConcatMap(lret111222333)(lBig);
stopOp("var lcm = lConcatMap(lret111222333)(lBig);");
debug(lToArray(lcm));
startOp();
var plcm = plConcatMap(plret111222333)(plBig);
stopOp("var plcm = plConcatMap(plret111222333)(plBig);");
debug(lToArray(plcm));
startOp();
var acm = aConcatMap(aret111222333)(aBig);
stopOp("var acm = aConcatMap(aret111222333)(aBig);");
debug(acm);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- Apply tests ---");
var afs = [add(0), add(1), add(100)];
var lfs = lFromArray(afs);
var plfs = plFromArray(afs);
debug("var fs = [add(0), add(1), add(100)];");

startOp();
var lapp = lApply(lfs)(lBig);
stopOp("var lapp = lApply(lfs)(lBig);");
debug(lToArray(lapp));
startOp();
var plapp = plApply(plfs)(lBig);
stopOp("var plapp = plApply(plfs, lBig);");
debug(lToArray(plapp));
startOp();
var aapp = aApply(afs)(aBig);
stopOp("var aapp = aApply(afs)(aBig);");
debug(aapp);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- aRelativeComplement tests ---");
startOp();
var arc = aRelativeComplement(aBig)(aSmall);
stopOp("var arc = aRelativeComplement(aBig)(aSmall);");
debug(arc);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);

debug("\n--- aIntersection tests ---");
startOp();
var ai = aIntersection(aBig)(aSmall);
stopOp("var ai = aIntersection(aBig)(aSmall);");
debug(ai);

debug("lBig: " + lToArray(lBig));
debug("plBig: " + plToArray(plBig));
debug("aBig: " + aBig);
