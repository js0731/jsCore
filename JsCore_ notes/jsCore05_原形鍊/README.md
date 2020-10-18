# 原型鍊
### 什麼是原型鍊
 * Javascript 則是個**基於原型(Prototype)的物件導向程式語言** ，透過**預先建立出的原型物件**，每當**新物件建立時**，便指定物件的原型要**參照到哪個原型物件**。
 
 * 每當物件建立，都會**綁定原型**，**物件原型本身也是物件**。
 
* 由於每一個物件都有原型，這樣一個牽一個、層層相依的從屬關係，就稱做 **原型鏈(Prototype Chain)** ；透過前述的機制，讓物件得以使用原型中的**屬性 & 方法**，並藉由**原型鏈一層一層的依序繼承**，讓**物件能擁有所有原型鏈上原型的功能**，這就是 JavaScript 每個物件背後的運作機制。

* 當開發者呼叫物件的屬性或方法時，若**物件本身沒有這項屬性、方法**，JavaScript 會**自動尋找它原型中的方法**，這也就是為什麼我們可以直接呼叫 `arr.map` 而不會出錯的原因。
  *   `arr`  是陣列實例，原型是 Array
  *   `arr.__proto__`  是陣列的原型，原型是 Object
  *   `arr.__proto__.__proto__`  是物件的原型，原型是  `null`
  *   `arr.__proto__.__proto__.__proto__`  是 null，沒有任何屬性
### 使用原型來建立一個新的物件建構子：
```
function Person(name) {  
  this.name = name  
}

Person.prototype.hello = function () {  
  console.log(`Hello ${this.name}.`)  
}

let jojo = new Person('JoJo')  
jojo.hello() // Hello JoJo
Object.getPrototypeOf(jojo) // {hello: ƒ, constructor: ƒ}
```
*  上面的範例，撰寫了一個簡單的物件建構子 `Person()`，並在建構子中設定物件屬性。物件方法的部分，由於方法不需要讓每個物件都獨自擁有一份，以避免造成冗餘的記憶體消耗，應該要如同先前 `Array.prototype.map` 的範例，將物件的方法設定給原型物件( `Person.prototype` )，讓此建構子出來的物件都可以共用這些方法。最後建立一個新的 `Person` 物件，並藉由 `getPrototypeOf(obj)`，取得新產生物件的原型。
* note1：不直接用 `__proto__` 取得原型物件是因為 `__proto__` 雖然被幾乎所有的瀏覽器支援，但它仍是非標準屬性；透過 `getPrototypeOf` 取得物件的原型是比較正確的方法。
* note2 : 函式物件有個特別的屬性是`Person.prototype` 透過`Person.prototype`所新增的屬性就會作為**原形上面的方法**不要把`prototype` 的「**屬性**」與「**物件的原型**」搞混！ 
 ### 原始型別的包裹物件與原型的關聯
 * 在宣告純值的時候除了以下第一種宣告方式還有第二種
   ```
   var a = 'a' ;
   console.log(a) ;
   ```
    圖：
  * 以下第二種方式定義出來的值並不是**純值**而是一個**物件**，而透過這種方式可以看到包裹物件裡原形`__proto__`的所有方法。　
    ```
    var b = new String(’b') ;
    console.log(b) ;
    ```
    圖：
   * String本身就是一個函式，因此有屬於自己的**prototype**，可以透過`console.dir(String)`查看，如果要在`String`上**新增方法**讓所有的**字串**純值上共用是可以的。
     ```
     var str = 'abc'
     String.prototype.lastText = function () {
       return this[this.length - 1]
     }
     console.log(str.lastText())
     ```
 ### 使用 Object.create 建立多層繼承
 某些情況下，我們會想要調整原型鍊的結構，在原型鍊上新增層級，便於一些共通屬性/方法的繼承，也可以讓原型鍊看起來更為完整。
 ```
function Person(name) {
  this.name = name;
}

Person.prototype.hello = function () {
  console.log(`Hello ${this.name}.`);
};

let jojo = new Person('jojo');
jojo.hello();  // Hello jojo.
console.log(Object.getPrototypeOf(jojo)); // {hello: ƒ, constructor: ƒ}

function Engineer(name, skill) {
  Person.call(this, name);
  this.skill = skill ;
}

  // 下面這一行代表的是讓Engineer的原型繼承Person的原型
Engineer.prototype = Object.create(Person.prototype);
  //Engineer的原型繼承Person原型，也就代表了contructor被取代掉。因此，我們需要將Engineer的constructor給補回來。
Engineer.prototype.constructor = Engineer;

let  alice = new  Engineer('Alice', 'JavaScript');
alice.hello() // Hello Alice.;
console.log(alice.skill) // JavaScript;
console.log(Object.getPrototypeOf(alice)); // Person {constructor: ƒ}
```
## ES6 的 Class
從 ES6 開始就有了 `Class` 語法可以使用，整體開發者體驗會好上不少。把前面的範例透過 `Class` 重構一下：
```
class Person {  
  constructor (name){  
  this.name = name  
}  
//方法會自動放到 Person.prototype_  
  hello() {  
    console.log(`Hello ${this.name}.`)  
  }  
}

class Engineer extends Person {  
  constructor (name, skill){  
    super(name) // 呼叫 Person 的建構子_  
    this.skill = skill  
  }  
}
let alice = new Engineer('Alice', 'JavaScript')  
alice.hello() // Hello Alice.
Object.getPrototypeOf(alice) // Person {constructor: ƒ}
```
