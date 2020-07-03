
# 陳述式與表達式

* **Statement 陳述式**
   *   用於命令執行指定的一系列操作，執行完成後也不會回傳任何結果。  
   *    例如常見的if( )，( )需要**布林值**`true`、`false`來決定這個程式判斷會不會成立，故`()`裡面會放**表示式**，但`if(){}`這段程式碼本身是**陳述句**，執行完成後不會回傳任何結果，區塊{ }也是一樣的概念，只是一定會執行，不會經過判斷。
   	     
* **Expression 表達式**
    *  又稱為**表示式**、**運算式**，經常透過一些**符號(運算子)**結合上下語句並運算及**回傳結果**。
    * 運算式的幾種分類 :
        *  算數 : 解析出數字，例如 a+b
        *  字串 : 解析出處字串，例如 'abc' or '123'
        * 邏輯 : 解析出 True 或 False 
       * 左運算式 : 左側是指定值得對象 例如 a = b
   
 *  **函式也分為函式陳述式與函式表達式**
      * **函式陳述式(可提升)**  
          * `function dog(){ console.log('小狗') }` 
          * 直接宣告一個函式就是函式陳述式  
      * **函式表達式(不可提升)**  
          *  ` var callFun = function(){}` 
          *  當程式執行到`=`運算子右邊的程式碼，**才建立這個函式物件**，將其指向變數`callFun`，並且它可以當成一個**值**，所以是`Function Expression`表示式。
---
# 原始型別及物件型別
我們經常會使用這些型別各自的方法, 例如用.length取得字串的長度。那麼為什麼我們可以這樣做呢？**為什麼明明是「基本型別」卻會有「屬性」以及「方法」可以呼叫？**這是因為**這些型別有著相對應的包裹物件 (Primitive Wrapper)**，這些包裹物件包含了這些物件可以使用的方法，以下是**基本型別及對應的包裹物件**。
   * Boolean (布林)**  <----------------->     new Boolean( )
   * **Null  (空)**    <------------------------->   --
   * **Undefined (未定義)** <------------>   --
   * **Number  (數值)**    <------------------>   new Number( )
  * **String  (字串)**      <--------------------->    new String( )
  * BigInt(new)   整數數值 <----------->   BigInt( )
  * Symbol(new)   符號  <--------------->  Symbol( )
   
   **物件型別**
   *  只要是原始型別以外的其餘都是物件型別，如:**物件**、**陣列**、**函式**、**日期**等。

先來看一些關於原始型別的範例程式碼：
```
var a, b, c, d;  
console.log('typeof a: '+typeof a);a = 1;  
console.log('typeof a: '+typeof a);a = ‘文字’;  
console.log('typeof a: '+typeof a);b = true;  
console.log('typeof b: '+typeof b);c = {};  
console.log('typeof c: '+typeof c);d = null;   
console.log('typeof d: '+typeof d);console.log('typeof e: '+typeof e);
```

![](https://miro.medium.com/max/1760/1*WEaunec_dgpVGxZAiQEDjA.png)

值得注意的是：

1.  d (null)的型別是object, 這是js長久以來的一個錯誤。
2.  e這個未定義的變數的型別是undefined, 這是js對undefined變數的一個保護。

### 物件型別：

前面提到，基本型別會有「屬性」以及「方法」是因為這些型別有著相對應的**包裹物件 (Primitive Wrapper)**。

var str = 'Hello';  
console.log( str.length );

像上面段程式碼，當我們試著去讀取  `str.length`  的時候，背後原理是這樣的：
```
var str = new String("Hello");  
str.length;  
  
str = null;  
str = 'Hello';
```
它會透過對應的物件建構器將`["Hello"]，包裝成一個 String 的「物件」，然後回傳對應的屬性後，即刻銷毀恢復成基本型別。

我們可以透過下面這段程式碼來了解原始型別與物件型別的不同。a是一個原始型別為字串的變數，而e是一個透過建構式建立的物件。
```
a = ‘ming ‘;  
var e = new String(a);
console.log(a);  
console.log(e);
```
![](https://miro.medium.com/max/1769/1*G6dEyUCy9hwo9EEGzCRaVQ.png)

很清楚的可以看到e是一個物件，_proto_便是包裹物件的原型，裡面包含了這個物件可以使用的方法。

Note: 需要原始型別變數時，盡量不要使用建構式來宣告，因為這樣便會宣告出一個物件型別，而非原始型別，操作上還是會跟原始型別不太一樣。
# 運算子的優先性及相依性
### 優先性 Precedence：
  運算子彼此之間的執行順序。例如：乘除優先於加減，因此先執行乘除後執行加減，以下面程式碼為例：
`var a = 2 * 2 + 2 * 3;`
會先執行 2 * 2 和 2 * 3，接著再把兩者個結果相加，是因為乘號的的優先性大於加號的優先性。
![](https://miro.medium.com/max/2324/1*x4WAxkFqvtw30vMVATf0DQ.png)
而`=`是最後才執行賦值的運算子，因為他的優先性最低。
![](https://miro.medium.com/max/2329/1*a4e_TFOBma1OqKWFNPl5hw.png)
### 相依性 Associativity：

指的是運算方向。例如：加號的相依性是由左至右，但等號是由右至左。當兩個運算子的優先性相同時(例如加號和減號)，就會依據相依性的方向來執行。
![](https://miro.medium.com/max/2324/1*x4WAxkFqvtw30vMVATf0DQ.png)


下面這段程式碼宣告一個物件變數b, 接著幫他定義一個屬性a, 賦予a的值為2，並且規定他的值不可被覆寫。接著我們試著將b.a賦予一個新的值3,，console.log(b)的結果為2，因為剛才已經將b.a限制為不可被覆寫了。

接下來定義另一個變數a，在 a = b.a = 1 之後，a的值會是什麼？
```
var b = {};  
Object.defineProperty(b, ‘a’, {  
 value: 2,  
 writable: false  
});b.a = 3;  
console.log(b.a); // 2var a = 3;  
a = b.a = 1;  
console.log(a);
```
答案會是1，為什麼呢？前面不是說了，b.a無法被覆寫，結果為什麼不會是2呢？

這是因為在  `a=b.a=1`這一行程式碼中，a會被賦予的值，是`b.a=1`這個**表達式所回傳的結果**，與`b.a`現在的值是沒有關係的。我們可以在console中把`b.a`和`b.a=1`都印出來看看。
```
var b = {};  
Object.defineProperty(b, ‘a’, {  
 value: 2,  
 writable: false  
});b.a = 3;  
console.log(b.a); // 2var a = 3;  
a = b.a = 1;  
console.log(a);  
**console.log(b.a);  
console.log(b.a = 1);**
```
![](https://miro.medium.com/max/1769/1*UMB2RRFjUDvUK0CS5jFG9w.png)

這邊需要建立一個觀念，**所有的表達式都會回傳值，**但如果沒有去接收它時，他就會立即被釋放，不會儲存，就只是一個過程。

而  `=`  也是表達式，他的功能是將右側的值賦予到左側，但同時也**必須回傳值**（只因為它是表達式），會傳的值都是用右側的值做表示。
# 邏輯運算子與短路邏輯的運用
### 邏輯運算子
  *  **&&** 的特性是要全部為 true 才會是 true，否則都返回 false
  * **||** 的特性是只要其中一個是 true 就會返回 true，除非全部都是 false，意即只要其中一個條件滿足就成立
  * **!** 特性就是做反向，如果是 true 就返回 false，如果是 false 就返回 true

### 短路求值
上面曾提到邏輯運算子們常在 if 判斷式中和布林 (true or false) 一起使用，那是因為**在 if 判斷式的括號裡會強制轉成布林值**。
但其實在 javascript 裡**可以用邏輯運算子操作任何值，不會強制要返回 true or false**。
如果有[比較運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Obsolete_Pages/Obsolete_Pages/Obsolete_Pages/%E9%81%8B%E7%AE%97%E5%AD%90/%E6%AF%94%E8%BC%83%E9%81%8B%E7%AE%97%E5%AD%90)的話，再透過[比較運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Obsolete_Pages/Obsolete_Pages/Obsolete_Pages/%E9%81%8B%E7%AE%97%E5%AD%90/%E6%AF%94%E8%BC%83%E9%81%8B%E7%AE%97%E5%AD%90)去比較出結果就**可以發展出更簡便的寫法**，就是下面要提到的短路邏輯。
![](logical_operator.png)
**在 javascript 裡面只要是 0、""、null、false、undefined、NaN 都會被判定為 false**。
```
console.log(0 && 1)  // 0
console.log(1 && 0)  // 0
console.log(1 || 0)  // 1
console.log(0 || 1)  // 1
console.log(0 || 1)  // 1
console.log(undefined || 1)  // 1
console.log(1 && undefined)  // undefined
```
**短路邏輯的運用**
  1. 用 || 來設定變數預設值，如果沒有 name 就預設為小明。 <br/>`var student = name || "小明";`
  2. 用 && 來檢查物件與屬性值
  3. 假設想要返回一個變數的length，但又不知道變數的類型可以使用if/else 來檢查foo 是否是一個可接受的類型。<br/>`return (foo | | [ ] ).length`
  4. 用 && 來簡化程式碼，如果 a == 1 為 false，那下面 alert 就不會做了。
  ```var a = 1; a == 1 && alert("a=1")```

