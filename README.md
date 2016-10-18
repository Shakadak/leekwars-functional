# leekwars-functional
list and array functions respectively implemented and reimplemented for currying and performance.

[leekwars](https://leekwars.com)

# Why

I originally wanted my array functions to be curryfied, as I like to work with partial application ready at a go. For some reason, I did not think of naming them differently, and I did not think of just calling them inside the curryfied function. So I redid them with a `for` loop, although only `arrayMap` and `arrayFilter`, I did not have much use for the others at the time. Plus they seem to have a reputation of being slower than `for in` loops. I do not remember much if that is really their reputation, but they are slower for sure. So I decided to redo most of them and more.

Then I came upon the idea of doing a list minilib. The same functions as for arrays, with function helpers for actually making the lists. Leekscript does not currently possess the capacity to make custom structure, so our lists are just pure functions. I may do trees later too.
I wanted list, first because of my functional tendencies, second because I wanted something that can add and remove element in constant time, and third because the idea of bringing a new data structure to the community make me feel pretty cool. Although I doubt it will see real usage.

While doing them, battling against infinite loops, I used my array functions to compare both the result and the performance. I was pleased to see how my lists were doing in comparison to arrays. (While sweeping random access under the rug.) Came a time where I wanted to see how much of an improvement I did against the default functions. (I like to feel good about what I do.)
Then the comparison with arrayFoldLeft and arrayFoldRight. Holy garden is this fertilizer fast as pollination. I cannot beat it.
Although it improves again the performances of other array functions, the fact that array building is so heavy make it so that lists are still worth it. So I am not too unhappy. Plus it is still cool to have the array functions not using anymore the imperative loops.

# Array functions usage

Here are some examples on how to use the array functions.
```js
[code]
var xs = [1, 2, 3];
var ret = aMap(function(x) {return x + 1;})(xs);
// ret = [2, 3, 4]
[/code]
```

```js
[code]
var xs = [1, 2, 3];
var ret = aFilter(function(x) {return x === 2;})(xs);
// ret = [2]
[/code]
```

```js
[code]
function add(x, y) {return x + y;}
var xs = [1, 2, 3];
var ret = aFoldRu(add)(0)(xs);
// ret = 6
[/code]
```

Important things to understand with foldLeft and foldRight:
* The accumulator (second argument) is generally an identity element, like 0 in the case of addition (1 + 0 = 1). Though this is not necessary in any way.
* The consuming function receive the both the accumulator and an element of the array as argument. In the case of foldLeft, the accumulator is on the *left* and in the case of foldRight, the accumulator is on the *right*. In case of doubt, look at the type. `b` is the accumulator, `a` is the consumed. Looking at the type signatures of aFoldRu and aFoldLu may be easier if you are not used to the notation.

Using `add` from `math`:
```js
[code]
var xs = [1, 2, 3];
var fs = [add(0), add(1), add(100)];
var ret = aApply(fs)(xs);
// ret = [1, 2, 3, 2, 3, 4, 101, 102, 103]
[/code]
```

```js
[code]
var prepend123 = append([1, 2, 3]); // Equivalent to function(@x) { return [1, 2, 3] + x; }
var xs = prepend123([2, 3, 4]);
var ys = prepend123([]);
// xs = [1, 2, 3, 2, 3, 4]
// ys = [1, 2, 3]
[/code]
```

aIntersection and aRelativeComplement are functions on set.
[Set_(mathematics)#Basic_operations](https://en.wikipedia.org/wiki/Set_(mathematics)#Basic_operations) <https://en.wikipedia.org/wiki/Set_(mathematics)#Basic_operations>

# List functions usage

Beside the functions to construct lists and access elements, convert between list and array, everything else is the same.

```js
[code]
var xs = ulCons(1, ulCons(2, lSingleton(3)));
// xs = (1, (2, (3)))
[/code]
```

```js
[code]
var xs = lFromArray([1, 2, 3]);
var ys = lToArray(xs);
// xs = (1, (2, (3)))
// ys = [1, 2, 3]
[/code]
```

```js
[code]
var xs = lFromArray([1, 2]);
var h = lHead(xs);
var t = lTail(xs);
var error = lTail(t);
// h = 1
// t = (2)
// error: lTail: Empty list
[/code]
```

```js
[code]
var xs = lCons(1)(lSingleton(2));
var x1, xs1;
xs(x1, xs1);
var x2, xs2;
xs1(x2, xs2);
// xs = (1, (2))
// x1 = 1
// xs1 = (2)
// x2 = 2
// xs2 = null -- remember, we do not have the mean do define our own data types
[/code]
```
