We will consider three behaviors:
* Using `@` when assigning.
* Using `@` with parameters.
* Using `@` with `return`.

# Assignments / Reassignments

```
[code]
var x = 1;  // 1 op
var y = x;  // 2 op, y received a duplicate
var z = @x; // 1 op, z is accessing the same data as x
x = 2;      // 2 op, note how this is less efficient than declaring a new variable
            // y = 1, this is expected as y does not possess the same data
            // z = 1, this is expected, we changed which value x was accessing, not the value itself
            // we will consider that the reassignments did not happen in the following

x += 2;     // x = 3, z = 1, this is currently the only exception to my knowledge
            // the data itself could have been changed but it seems it just made x access a new value
[/code]
```

```
[code]
var x = "1";    // 1 op
var y = x;      // 2 op, y received a duplicate
var z = @x;     // 1 op, z is accessing the same data as x
x = "2";        // 2 op
                // y = "1"
                // z = "1"
                // we will consider that the reassignments did not happen in the following

x += "2";       // x = "12", z = "12", this is were we will introduce the notion of enclosing structure.
                // although this new notion is not much useful while considering strings, as they only enclose literal values
                // but this is interesting as we can see we have expanded the enclosing structure and added the character `2` inside
                // as such, the outer part has not changed, but the inside did, and this is reflected in z
[/code]
```

```
[code]
var x = [1];    // 12 op
var y = x;      // 29 op, y received a duplicate, and note how costly it is.
var z = @x;     // 1 op, z is accessing the same data as x
x = [2];        // 40 op, look at that insane cost
                // y = [1]
                // z = [1]
                // we will consider that the reassignments did not happen in the following

x += [2];       // x = [1, 2], z = [1, 2], array may hold more complicated values than literals, this may cause confusion later when doing mutation
x[2] = 3;       // x = [1, 2, 3], z = [1, 2, 3]
[/code]
```


```
[code]
var x = [[1], [2]];    // 45 op
var y = x;      // 110 op, y received a duplicate, and note how costly it is.
var z = @x;     // 1 op, z is accessing the same data as x
x = [[2], [3]]; // 154 op, look at that insane cost
                // y = [[1], [2]]
                // z = [[1], [2]]
                // we will consider that the reassignments did not happen in the following

x += [[3]];     // x = [[1], [2], [3]], z = [[1], [2], [3]], array may hold more complicated values than literals, this may cause confusion later when doing mutation
x[2][0] = 4;    // x = [[1], [2], [4]], z = [[1], [2], [4]]
[/code]
```
