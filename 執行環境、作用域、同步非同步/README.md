#  編譯式語言與直譯式語言
### 直譯式語言
不同於編譯語言，直譯語言在執行時會**一行一行的動態將程式碼直譯(interpret)為機器碼**，並執行。直譯語言多半以動態語言(dynamic language)為主，具有**靈活的型別處理**，**動態生成與程式彈性**，但**速度會比編譯式語言要慢一些**。
直譯語言有 - Javascript 、Python、Shellscript等等

### 編譯式語言
編譯語言在程式執行前會先透過編譯器(compiler)將**程式碼編譯**(Compile)成計算機所看的懂的機器碼，最後再執行。編譯式語言多半會是**靜態語言(static language)**，它們會**事先定義的型別**、**型別檢查**與擁有***高效能的執行速度**等特性。
編譯式語言有 - C、C++、bjective-C、Visual Basic等等。
#  作用域(Lexical scope)
作用域又分**靜態作用域**跟**動態作用域**，而靜態作用域及動態作用域的差別牽涉直譯語言的解譯及運行流程，

* 靜態作用域 : 變數的作用域在與法解析時，就已經確定作用域，且不會再改變
* 動態作用域 : 變數的作用域在函式調用時才決定。

在 JavaScript 中是屬於**靜態作用域**，又稱**語法作用域**，意思就是指在 JavaScript 執行時就已經確定**語法作用域**，大多數的程式語言都是採用**靜態作用域**，例如：C、C++、C#、Python、Java等等。

範例1:

變數 `Ming`的**作用域**僅在 `callName` 函式內，所以在外層 `console.log(Ming)` 會得到Mins is not defined的錯誤。外層讀不到在 `callName` 函式內宣告的變數。
```
function callName(){
  var Ming = '明' ;  
}

callName();
console.log(Ming);
```

範例2:

執行`fn2`時，變數`value`賦予了另外一個值`2`，接著執行`fn1`，`fun1`因為要印出`value`，因此向外查找`value`這個變數，在全域中找到`value`，值等於`1`。最後`console.log`的結果會是`1`。

而`fn2`函式的作用域僅在`fn2`內部，`fn1`是查找不到`value`等於`2`的，但如果今天JS是採用**動態作用域**的話，結果就不一樣了。在執行到`console.log(value)`時，他會**向上一層調用的函式來查找value的值**，因此找到值等於`2`。
```
var value = 1;  

function fun1() {
  console.log(value); 
}

function fun2() {
  var value = '2';
  fun1();
}

fun2()
```
而這個向外查找的過程就稱做**範圍鍊 (Scope Chain)** 指的是：**當函式內沒有需要的變數時，會向外尋找該變數的過程**。

# 執行環境 (Execution context)

每當**函式被執行時**，就會產生**執行環境 Execution Context**。每執行一次便會產生一個新的執行環境。除了函式之外，全域也有**全域執行環境**，在網頁被瀏覽器開啟或是後端Node.js被啟動時，就被建立了。全域執行環境被建立時會同時宣告window或是global變數 (在瀏覽器是window, Node.js是global，而在全域執行環境中的this就等同於這兩個變數)。

----------

當你的程式碼已經準備好開始運行，第一個建立的執行環境就是：

#### 全域執行環境 (Global execution context)。

**執行環境**  在建立時，會經歷**兩個階段**，分別是 ：

1.**Creation Phase 創造階段 : 設定變數與function到記憶體中、提升(hoisting) 。**
範例:

```
     fun();   
     console.log(a); //undefined
     var a = 'hello';   
     function fun(){   
       console.log('called fun');   
     } 
```
     圖:[https://pvt5r486.github.io/f2e/20190110/1483372396/](https://pvt5r486.github.io/f2e/20190110/1483372396/)
`fun` 函式正確地被執行了，但是變數 `a` 的值變成了 `undefined`，即使函式與變數是之後才宣告的，但仍然正確執行，這是在創造階段就被**設定變數以及函式在記憶體裡**，這個步驟叫做 **「提升 (hoisting)」** 。
>  這個步驟並不是真的把我們的程式碼移動到最上方，而是在程式碼被逐行解讀之前， JavaScript 已經為變數、函式在記憶體中建立一個空間了。
    
#### 然而變數的情況有點不太依樣
以上述程式碼為例，JavaScript為變數`a`騰出記憶體空間時並不知道  a 是什麼值，如同`var a ;`會先放上`undefined`的特殊值，直到該行程式碼真正被執行時才知道 `var a = 'hello';`，**所有的JavaScript 的變數都一樣一開始都會被設定為 undefined**。
2.**Execution Phase 執行階段 : 一行一行執行你寫的程式碼。**

一旦  **全域執行環境**  結束  **創造階段**、進入  **執行階段**，它就會開始由上到下、一行一行地執行程式。
#### 執行環境的生成與堆疊 (Execution Stack)
**全域執行環境**  在執行程式碼的過程中，判讀到**函式呼叫**，**全域執行環境**  就會馬上為它建立一個全新的**執行環境**，供這個函式裏頭的程式碼運行，如果我們不斷地在一個**函式中又呼叫另一個函式**，就會建立很多個**執行環境**，而這些**待執行的程式碼**就會**堆疊起來**形成所謂的**執行堆疊 (Execution Stack)**。
#### 執行環境的生成與堆疊 (Execution Stack) 與函式的宣告順序無關，而是與呼叫的順序相關聯。
     範例:
     ```
     function sayHi(name){  
       return 'hi' + name ;
        }
        
     function doSomething(){  
       var ming = ' 小明';
       console.log( sayHi(ming) ); 
     }
     
     doSomething();
     ```
     
     以上述程式碼描述執行的順序 :
     建立全域執行環境 => 建立doSomething的執行環境，堆疊在全域執行環境上=>  建立sayHi的執行環境，堆疊在doSomething執行環境上 => 執行sayHi程式碼，執行完離開sayHi執行環境 => 回到doSomething執行環境，執行完離開doSomething執行環境 > 最後回到全域執行環境。
#  記憶體的存放與釋放
當我們的函式執行完後如果裡面的變數沒有在昨為其他的參考使用的話他的記憶體就會被釋放出來。
MDN的說明文章 : 
這是一個最務實的垃圾回收演算法。 這個演算法將原本「這個物件再也不會被使用」的廣泛定義縮減到「沒有其他任何物件參考它」。如果一個物件不在被任何物件參考，它將被視為可回收記憶體的垃圾。
# 執行緒與同步、非同步
JavaScript 本身是**同步的**而他去呼叫**其它資源使用時**如`setTimeout`、`addEventListener`、`Http request`等，因為**無法預期執行時間的操作**，都會以**非同步處理**，也就是會先被丟到**事件佇列(Queue)**，等到**同步執行的程式碼執行完**，才會去處理那些被放到佇列中的任務。
範例:
```
setTimeout(function(){
  console.log("1sec")
},1000);

console.log("Hi");

順序為:  
Hi => 1sec
```
順序為:
Hi => 1sec
`setTimeout`設定的等待時間，並不能夠確保它真的會在設定的時間到就馬上執行，也就是假設時間為 10sec，這樣只能夠確保它會在 **大於等於** 10sec 後才會執行」。













# 箭頭函式
-   傳統函式：有一個大原則：**看呼叫時的物件是誰**
-   箭頭函式：而 Arrow Functions 則不會有自己的  `this`  引用物件，呼叫  `this`  時，會**向外查找**`this`。
```
var name = '全域'  

var obj= {  
  name: '阿鬼',  
  fun1: function () {   
    // 注意，這裡是 function，以此為基準產生一個作用域  
    console.log('1', this.name); // 1 阿鬼  
    setTimeout(() => {  
    console.log('2', this.name); // 2 阿鬼  
    console.log('3', this); // 3 obj這個物件  
    }, 10);  
 },  
  fun2: () => {   
    // 注意，如果使用箭頭函式，this 依然指向 window  
    console.log('4', this.name); // 4 全域  
    setTimeout(() => {  
      console.log('5', this.name); // 5 全域  
      console.log('6', this); // 6 window 物件  
    }, 10);  
  }  
}  
  
obj.fun1();  
obj.fun2();
