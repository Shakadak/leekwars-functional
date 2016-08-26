include("debug");
include("array");
include("math");
include("list");

startOp();


var v1 = 1, v2 = 2, v3 = 3;

startOp();
var x = lCons(v1)(lCons(v2)(lSingleton(v3)));
stopOp("var x = lCons(1)(lCons(2)(lSingleton(3)));");


startOp();
var ux = ulCons(v1, ulCons(v2, lSingleton(v3)));
stopOp("var ux = lCons(1, lCons(2, lSingleton(3)));");

startOp();
var xa = [];
xa[0] = @v1;
xa[1] = @v2;
xa[2] = @v3;
stopOp("var xa");

debug("xa: " + xa);

startOp();
var xb = [@v1,@v2,@v3];
stopOp("var xb = [1,2,3];");

startOp();
var y = lToArray(x);
stopOp("var y = lToArray(x);");

debug(y);
debug("lToArray(ux): " + lToArray(ux));


v1 = 3; v3 = 456;
startOp();
var yB = lToArray(x);
stopOp("var yB = lToArray(x);");
debug(yB);
debug(lToArray(ux));
debug(xb);

debug("xa: " + xa);


startOp();
var ns = [1,2,1,2,1,2,1,2,4,3,4,3,4,3];
stopOp("var ns = [1,2,1,2,1,2,1,2,4,3,4,3,4,3];");

startOp();
var z = lFromArray(ns);
stopOp("var z = lFromArray(ns);");

startOp();
var zz = lToArray(z);
stopOp("var zz = lToArray(z);");

debug(zz);

startOp();
var h = lHead(z);
stopOp("var h = lHead(z);");
debug(h);
debug("z: " + lToArray(z));

startOp();
var t = lTail(z);
stopOp("var t = lTail(z);");
debug(lToArray(t));
debug("z: " + lToArray(z));



debug("--- Filter tests ---");
debug("z: " + lToArray(z));

startOp();
var fi1 = lFilter(function(g){return g != 1;})(z);
stopOp("var fi1 = lFilter((!=1))(z);");
debug(lToArray(fi1));
debug("z: " + lToArray(z));

startOp();
var fis1 = aFilter(function(g){return g != 1;})(ns);
stopOp("var fis1 = aFilter((!=1))(ns);");
debug(fis1);

debug("--- Map tests ---");
debug("z: " + lToArray(z));

startOp();
var m1 = lMap(function(g){return g != 1;})(z);
stopOp("var m1 = lMap((!=1))(z);");
debug(lToArray(m1));
debug("z: " + lToArray(z));

startOp();
var ms1 = aMap(function(g){return g != 1;})(ns);
stopOp("var ms1 = aMap((!=1))(ns);");
debug(ms1);

startOp();
var f1 = lFoldR(add)(0)(z);
stopOp("var f1 = lFoldR(add)(z);");
debug(f1);


startOp();
var f3 = aFoldL(add)(0)(ns);
stopOp("var f3 = aFoldL(add)(z);");
debug(f3);

debug(lToArray(z));

debug(lToArray(aFoldR(lCons)(null)(ns)));

debug("--- Append tests ---");
debug("z: " + lToArray(z));
startOp();
var cc1 = null;
a1 = lAppend(a1)(ux);
a1 = lAppend(a1)(z);
a1 = lAppend(a1)(z);
a1 = lAppend(a1)(z);
stopOp("var a1 = lAppend(ux)(z); ...");
debug("cc1: " + lToArray(cc1));
startOp();
var a2 = [];
pushAll(a2, xb);
pushAll(a2, ns);
pushAll(a2, ns);
pushAll(a2, ns);
stopOp("var a2 = []; pushAll(a2, xb); pushAll(a2, ns); ...");
debug("cc2: " + cc2);
startOp();
var cc3 = [];
cc3 = cc3 + xb;
cc3 = cc3 + ns;
cc3 = cc3 + ns;
cc3 = cc3 + ns;
stopOp("var a3 = xb + ns; ...");
debug("cc3: " + a3);
startOp();
var a4 = [];
a4 = arrayConcat(a4, xb);
a4 = arrayConcat(a4, ns);
a4 = arrayConcat(a4, ns);
a4 = arrayConcat(a4, ns);
stopOp("var a4 = arrayConcat(xb, ns); ...");
debug("a4: " + a4);
startOp();
var a5 = aAppend(xb)(ns);
stopOp("var a5 = aAppend(xb)(ns); ...");
debug("cc5: " + a5);

debug("--- Append tests ---");
debug("z: " + lToArray(z));
startOp();
var cc1 = null;
cc1 = lAppend(cc1)(ux);
cc1 = lAppend(cc1)(z);
cc1 = lAppend(cc1)(z);
cc1 = lAppend(cc1)(z);
stopOp("var cc1 = lAppend(ux)(z);");
debug("cc1: " + lToArray(cc1));
startOp();
var cc2 = [];
pushAll(cc2, xb);
pushAll(cc2, ns);
pushAll(cc2, ns);
pushAll(cc2, ns);
stopOp("var cc2 = []; pushAll(cc2, xb); pushAll(cc2, ns);");
debug("cc2: " + cc2);
startOp();
var cc3 = [];
cc3 = cc3 + xb;
cc3 = cc3 + ns;
cc3 = cc3 + ns;
cc3 = cc3 + ns;
stopOp("var cc3 = xb + ns;");
debug("cc3: " + cc3);
startOp();
var cc4 = [];
cc4 = arrayConcat(cc4, xb);
cc4 = arrayConcat(cc4, ns);
cc4 = arrayConcat(cc4, ns);
cc4 = arrayConcat(cc4, ns);
stopOp("var cc4 = arrayConcat(xb, ns);");
debug("cc4: " + cc4);
startOp();
var cc5 = aAppend(xb)(ns);
stopOp("var cc5 = aAppend(xb)(ns);");
debug("cc5: " + cc5);

debug("z: " + lToArray(z));
debug("ux: " + lToArray(ux));
debug("ns: " + ns);
debug("xb: " + xb);
