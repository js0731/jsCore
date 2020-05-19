```
var value = 1
function fn1() {
    console.log(value);
}
function fn2() {
    var value = 2
    fn1()
}
fn2()
```
