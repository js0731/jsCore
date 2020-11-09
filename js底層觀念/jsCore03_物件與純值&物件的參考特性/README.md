
# 物件與純值
JavaScript 的資料可以分成 **「基本型別」(Primitives)**  與 **「物件型別」(Object)** 兩大類。
*  基本型別
    *   基本型別內的資料，會是以**純值**的形式存在 (  `string`、`number`、`boolean`、`null`、`undefined`  )。
* 物件型別 
   *  物件型別指的是**可能由零或多種不同型別**  (包括純值與物件) 所組合成的物件。

#### 這兩者判別的方式在於，**純值無法新增屬，但物件可以。**
```
//物件
var family = {};  
family.name = "小明家";

//純值
var str = "小明家";  
str.name = '小明';
console.log(str); //只會顯示"小明家"，不會新增屬性上去。
```
但是如果我們使用建構式來新增一個字串，並且在這個字串上加上一個屬性，如下：
```
var str= new String("小明家");  
str.name = "小明";
console.log(str); // 顯示 String {"小明家", name: "小明"}
```
新字串不僅有原本小明家的內容，也有新增的屬性，和剛剛純值所顯示的結果不同，所以我們可以藉由這個方式來驗證型別。如果他可以新增屬性，那他就不是一個純值，反之。
陣列屬於物件型別，而函式也是屬於物件型別，但屬於物件型別下的子型別，也是可以新增屬性的。
# 物件的參考特性
Javascript 在賦予一個值在變數上的時候，會有兩個特性，一個稱為**傳值**另一個則是**傳址**。
#### 只要是**物件型別的資料結構**，就是屬於**傳址**的模式，傳的址其實是指**記憶體位置**。
* 基本型別的更新與傳遞
  ```
  var a = 10;
  var b = a;
  console.log( a ); // 10
  console.log( b ); // 10
  ```
  * 變數  `b`  的值是透過複製變數  `a`  的值而來。
但並不代表當變數  `a`  更新之後，會去影響變數  `b`  的數值，像這種情況，通常會稱作「**傳值**」 (call by value)。

* 物件型別的更新與傳遞
  ```
  var coin1 = { value: 10 }; 
  var coin2 = coin1; 
  
  console.log( coin1.value ); // 10 
  console.log( coin2.value ); // 10

  coin1.value = 100;
  
  console.log( coin1.value ); // 100
  console.log( coin2.value ); // 100
  console.log( coin1 === coin2 ); // true
  ```
   * 像這種透過引用的方式來傳遞資料，接收的其實是引用的「參考」而不是值的副本時，  我們通常會稱作「**傳址**」 (call by reference)。
### 淺層複製及深層複製
物件的傳參考特性有時會在我們想要複製物件，並且想要這個複製的物件獨立於原本的物件時，造成一些困擾。以下是幾種複製的方法，解決這個問題。
*  淺層複製 Shallow Copy
    ```
    var family = {  
    name: '小明家',  
     members: {  
      father: '老爸',  
      mom: '老媽',  
      ming: '小明'  
     },  
    }
   var newFamily = {};  
   for (var key in family) {  
     newFamily[key] = family[key];  
    }
    ``` 
      *   淺層複製並不會在所有的情境中都能免除上述的困擾。物件第二層以下，仍舊是用**傳參考**的方式傳入的。

*  深層複製 Deep Copy
   ```
    var family = {  
    name: '小明家',  
    members: {  
     father: '老爸',  
     mom: '老媽',  
     ming: '小明'  
    },  
   }
    var newFamily = JSON.parse(JSON.stringify(family));
    ``` 
      *  透過先將**物件轉成字串**，再**轉回物件**，將**傳參考的特性完全消滅**。相當於**建立一個新的參考位置**，一個完全獨立於原物件的新物件。
