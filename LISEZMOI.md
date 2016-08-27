# leekwars-functional
list and array functions respectively implemented and reimplemented for currying and performance.

leekwars.com

# Pourquoi

Je voulais à l'origine que mes functions pour tableaux soit curryfié, étant donné que j'aime travailler avec l'application partiel disponible à la volée. Pour je ne sais quel raison, je n'ai pensé à les nommer différement, et je n'ai pas pensé à simplement les appeler à l'interieur de mes fonctions curryfié. Donc je les ai refaites avec des des boucles `for`, bien que seulement `arrayMap` et `arrayFilter`, je n'avais pas vraiment besoin des autres à l'époque. En plus elle semblait avoir la réputation d'être plus lente que les boucles `for in`. Je ne me rappel pas vraiment si c'est vraiment leur réputation, mais il est certain qu'elles sont plus lentes. Donc j'ai décidé de refaire la plupart d'entre elles et plus.

Puis il m'est venu l'idée de faire une minilib pour liste. Les mêmes fonctions que pour les tableaux, avec quelques fonctions d'aide pour l'accès au éléments et la construction de listes. Leekscript n'a pas pour l'instant la possibilité de definir des structures de donnée personnel, donc nos listes sont faite avec seulement des fonctions. Je ferais peut-être les arbres binaires plus tard.
Je voulais des listes, premièrement a cause de ma tendance à coder de manière fonctionelle, deuxièmement parce que je voulais quelque chose pour laquelle les operations d'ajout et de retrait se ferait en temps fixe, et troisièmement parce que l'idée d'apporter une nouvelle structure de donnée à la communauté me donne la possibilité de m'auto-mousser. Même si je ne pense pas que ca verra beaucoup d'utilisation.


Pendant que je les codais, me battant contre les boucles infinis, j'ai utilisé mes fonctions pour tableaux afin de comparer autant les résultats que les performances. J'étais ravi de voir comment mes listes se débrouillaient en comparaison des tableaux. (Tout en balayant sous le tapis l'acces random des tableaux.) Il vint un temps où je voulu voir à quel point je gagnais contre les fonctions par défaut. (J'aime me fair plaisir sur ce que je fais.) Impossible a battre.
Même si ca ameliore encore les performances des autres fonctions sur les tableaux, le fait que la construction de tableaux soit si lourd fait que les listes en valent tout de meme la peine. Donc je ne suis pas trop malheureux. En plus c'est cool de ne plus avoir une seule fonction sur tableaux avec une boucle imperative.

# Utilisation des fonctions sur tableaux

Here are some examples on how to use the array functions.
```
[code]
var xs = [1, 2, 3];
var ret = aMap(function(x) {return x + 1;})(xs);
// ret = [2, 3, 4]
[/code]
```

```
[code]
var xs = [1, 2, 3];
var ret = aFilter(function(x) {return x === 2;})(xs);
// ret = [2]
[/code]
```

```
[code]
function add(x, y) {return x + y;}
var xs = [1, 2, 3];
var ret = aFoldRu(add)(0)(xs);
// ret = 6
[/code]
```

Important things to understand with foldLeft and foldRight:
* The accumulator (second argument) is generally an identity element, like 0 in the case of addition (0 + 1 = 1). Though this is not necessary in any way.
* The consuming function receive the both the accumulator and an element of the array. In the case of foldLeft, the accumulator is on the *left* and in the case of foldRight, the accumulator is on the *right*. In case of doubt, look at the type. `b` is the accumulator, `a` is the consumed. Looking at the type signatures of aFoldRu and aFoldLu may be easier if you are not used to the notation.

Using `add` from `math`:
```
[code]
var xs = [1, 2, 3];
var fs = [add(0), add(1), add(100)];
var ret = aApply(fs)(xs);
// ret = [1, 2, 3, 2, 3, 4, 101, 102, 103]
[/code]
```

```
[code]
var prepend123 = append([1, 2, 3]); // Equivalent to function(@x) { return [1, 2, 3] + x; }
var xs = prepend123([2, 3, 4]);
var ys = prepend123([]);
// xs = [1, 2, 3, 2, 3, 4]
// ys = [1, 2, 3]
[/code]
```

aIntersection and aRelativeComplement are functions on set. <https://en.wikipedia.org/wiki/Set_(mathematics)#Basic_operations>

# List functions usage


```
[code]
var xs = ulCons(1, ulCons(2, lSingleton(3)));
// xs = (1, (2, (3)))
[/code]
```

```
[code]
var xs = lFromArray([1, 2, 3]);
var ys = lToArray(xs);
// xs = (1, (2, (3)))
// ys = [1, 2, 3]
[/code]
```

```
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

```
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
