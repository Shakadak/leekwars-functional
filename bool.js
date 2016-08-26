// ---   negate : (a -> Bool) -> a -> Bool
function negate(@p) { return function(@a) {return !p(a);};}
