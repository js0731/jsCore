
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
我們經常會使用這些型別各自的方法, 例如用.length取得字串的長度。那麼為什麼我們可以這樣做呢？**為什麼明明是「基本型別」卻會有「屬性」以及「方法」可以呼叫？**這是因為**這些型別有著相對應的包裹物件 (Primitive Wrapper)**，這些包裹物件包含了這些物件可以使用的方法，接著會在物件型別中做更多說明。
 * **基本型別及對應的包裹物件**
    *  **Boolean (布林)**  <----------------->     new Boolean( )
    * **Null  (空)**    <------------------------->   --
    * **Undefined (未定義)** <------------>   --
    * **Number  (數值)**    <------------------>   new Number( )
    * **String  (字串)**      <--------------------->    new String( )
    * BigInt(new)   整數數值 <----------->   BigInt( )
    * Symbol(new)   符號  <--------------->  Symbol( )
   
  * **物件型別**
     * 只要是原始型別以外的其餘都是物件型別，如:**物件**、**陣列**、**函式**、**日期**等。

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
var e = new String(a);console.log(a);  
console.log(e);
```
![](https://miro.medium.com/max/1769/1*G6dEyUCy9hwo9EEGzCRaVQ.png)

很清楚的可以看到e是一個物件，_proto_便是包裹物件的原型，裡面包含了這個物件可以使用的方法。

Note: 需要原始型別變數時，盡量不要使用建構式來宣告，因為這樣便會宣告出一個物件型別，而非原始型別，操作上還是會跟原始型別不太一樣。
