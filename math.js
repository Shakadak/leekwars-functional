/**
* add : Summable a => a -> a -> a
*/
function add(@x) { return function(@y) {return @(x + y);};}
