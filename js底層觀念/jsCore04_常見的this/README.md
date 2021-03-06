# 常見的this
### this基本觀念
  * 每個執行環境下都有屬於自己的this。
  * this與函式如何宣告沒有**關聯性**，僅與**呼叫方法**有關。
#### 影響this的調用方式
* 作為物件方法(最常運用this的方法)。
   *  物件的方法調用時，僅須關注是在**哪個物件下呼叫**。
   ```
   ex1:
   var myName = '全域';
   function callName(){
     console.log(this.myName);
   }   
   var family = {
     myName : '小明家',
     callName : callName,
     Ming : {
       myName : '小明',
       callName : callName,
     }
   }
   family.callName();  // 小明家
   family.Ming.callName();  // 小明
   ``` 
   ```
   ex2:
   var myName = '全域';
    var family = {
     myName : '小明家',
     callName : function(){
       console.log(this.myName);
     }
   }
   var callName = family.callName;
   callName() //全域
   //只需要管是怎麼被執行的，而目前執行在全域的執行環境下，所以指向全域。
   ```
* 簡易呼叫(simple call)。
  * **簡易呼叫(simple call)** 的**this**都是指向 **window** (盡可能不要使用) 
  * 只要看到直接執行的呼叫句就是**簡易呼叫(Simple Call)**。
  * callback是將一個函式傳到另一個函式內，並且在另外一個函式內執行，像這樣再另一個函式裡面執行的形式，也是屬於**簡易呼叫(Simple Call)** 。
   ```
   ex-callback範例:
   
  var myName = '全域';
    
    function myEasyCard(callback) {
      var money = 100;
      return callback(money);
    }
    
    myEasyCard(function(money) {
      console.log(this.myName, money + 100); //全域200
    });
   ```
     ```
   ex2:callback 範例
  var myName = '全域';
  
  var family = {
       myName: '小明家',
       callName: function () {
       //var self = this 如果要讓this指向family物件，可以加上這段，並把下面的this改為self
         setTimeout(function () {
           console.log(this.myName);
         },1000);
       }
   }
  family.callName(); //全域
  待解決!!!
   ```
   
### call，apply，bind方法。
  * `apply` 的 `call` 很像都是**立即執行**，只是傳入參數不同。
  * `call`、`apllly`第一個參數是給予要讓前面`function`的`this`要指向哪個物件，後面就是依據傳入該`function`要傳入的參數，但`apply`傳入的參數必須包在一個**陣列**裡面，當作第二個參數傳入。
  * 而`bind`的方法跟`call`, `apply`的主要差異在於，他**不會立刻執行**前面的`function`，因此要使用`bind`的方法的時候呢，必須先做一些處理。

    call範例 :
     ```
      var myName =  '全域'; 
      
      var family = { myName: '小明家' }; 
      
      function fn (para1, para2) { 
      　　console.log(this, para1, para2); // {myName: "小明家"} 1 2
      }
      fn.call(family, 1, 2); 
      ```
      apply範例
     ```
     var myName =  '全域'; 
      
      var family = { myName: '小明家' }; 
      
      function fn (para1, para2) { 
      　　console.log(this, para1, para2); // {myName: "小明家"} 3 4
      }
      fn.apply(family, [3, 4]);    
      ```
    bind範例
    ```
      var myName =  '全域'; 
      
      var family = { myName: '小明家' }; 
      
      function fn (para1, para2) { 
      　　console.log(this, para1, para2); // {myName: "小明家"} 5 6 
      }
      var fn2 = fn.bind(family); 
      fn2(5,6); //這裡看起來像SimpleCall但實際調用this的地方已經被決定了
    ```
* DOM事件處理器
  * DOM事件監聽會直接指向事件的觸發元素 
     `<button onclick="console.dir(this)">按鈕 </button>`
     ![](img/1.png)
* 箭頭函式(ES6)
  * 傳統函式：有一個大原則：**看呼叫時的物件是誰**
  * 箭頭函式： Arrow Functions 不會有自己的  `this`  引用物件，呼叫  `this`  時，會**向外查找**`this`。
  * `this` 在 Arrow function 中是被綁定的，所以套用 `call` 的方法時是無法修改 `this`。
```
var name = '全域'  

var obj= {  
  name: '阿鬼',  
  fun1: function () {   
    // 注意，這裡是 function，以此為基準產生一個作用域  
    console.log('1', this.name); // 1 阿鬼  
    setTimeout( ( ) => {  
    console.log('2', this.name); // 2 阿鬼  
    console.log('3', this); // 3 obj 這個物件  
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
```

