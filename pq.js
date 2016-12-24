include("struct.js");

function ppair(@p, @v) {
	return function(@p_) { p_ =@ p; return v;};
}

function pqSingleton(@p, @v) {
	return [ppair(p, v)];
}

function pqEmpty() {
	return [];
}

function pqInsert(@xs) { return function(@p, @v) {
	push(xs, ppair(p, v));
	siftUp(xs)(count(xs) - 1);
};}

function pqPop(@xs) { return function() {
	if (count(xs) === 0) { return null; }
	var ret = shift(xs)(null);
	if (count(xs) > 0) {
		unshift(xs, pop(xs));
		siftDown(xs)(0);
	}
	return ret;
};}

function siftUp(@xs) {
	var sift = function(c) {
		if (c) {
			var p = (c - 1) >> 1;
			var cp, pp;
			xs[c](cp); xs[p](pp);
			if (cp < pp) {
				dswap(xs[c], xs[p]);
				sift(p);
			}
		}
	};
	return sift;
}

function siftDown(@xs) {
	var sift = function(p) {
		var s = count(xs);
		var c, cp;
		var l = (p << 1) + 1, r = l + 1;
		if (r >= s) {
			if (l >= s) {
				return ; }
			else {
				c =@ l;
				xs[c](cp); }}
		else {
			var lp, rp;
			xs[l](lp); xs[r](rp);
			if (lp <= rp) {
				c =@ l;
				cp =@ lp; }
			else {
				c =@ r;
				cp =@ rp; }}
		var pp;
		xs[p](pp);
		if (cp < pp) {
			dswap(xs[p], xs[c]);
			sift(c);
		}
	};
	return sift;
}

function pqTake(@xs) { return function(@n) {
	var ret = [];
	while (n > 0 && count(xs) > 0) {
		push(ret, shift(xs));
		if (count(xs) > 0) {
			unshift(xs, pop(xs));
			siftDown(xs)(0);
		}
		n--;
	}
	return ret;
};}
