# 常見的this
### this基本觀念
  * 每個執行環境下都有屬於自己的this。
  * this與函式如何宣告沒有**關聯性**，僅與呼叫方法有關。
#### 影響this的調用方式
* 作為物件方法(最常運用this的方法)。
   *  物件的方法調用時，僅須關注是在**哪個物件**下呼叫。
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
  * simple call 的 this 都是指向 **window** (盡可能不要使用) 
  * 只要看到直接執行的呼叫句就是 簡易呼叫(Simple Call)。
  * callback是將一個函式傳到另一個函式內，並且在另外一個函式內執行。像這樣再另一個函式裡面執行的形式，也是屬於簡易呼叫(Simple Call) 。
   ```
   ex1:callback 範例
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
  //雖然callName裡面的執行環境的確是指向family的物件，
  　但是在那裏面又包了一個setTimeout的執行環境，
  　由於setTimeout是window底下的方法，所以這裡指向的
  　是全域物件。
   ```
   
* call，apply，bind方法。
  * apply 的 call 很像都是**立即執行**，只是傳入參數不同。
  * call、apllly第一個參數是給予要讓前面的 function 執* this要指向哪個物件，後面就是依據傳入該function要傳入的參數，但apply傳入的參數必須包在一個**陣列**裡面，當作第二個參數傳入。
  * 而bind的方法跟call, apply的主要差異在於，他**不會立刻執行**前面的 function，因此要使用bind的方法的時候呢，必須先做一些處理。
     ```
     //call範例
      var myName =  '全域'; 
      
      var family = { myName: '小明家' }; 
      
      function fn (para1, para2) { 
      　　console.log(this, para1, para2); 
      }
      fn.call(family, 1, 2); 
      ```
     ```
     //apply範例
     var myName =  '全域'; 
      
      var family = { myName: '小明家' }; 
      
      function fn (para1, para2) { 
      　　console.log(this, para1, para2); 
      }
      fn.apply(family, [3, 4]); 
      ```
    ```
      //bind範例
      var myName =  '全域'; 
      
      var family = { myName: '小明家' }; 
      
      function fn (para1, para2) { 
      　　console.log(this, para1, para2); 
      }
      var fn2 = fn.bind(family); 
      fn2(5,6); //這裡看起來像SimpleCall但實際調用this的地方已經被決定了
    ```
* new
* DOM事件處理器
  * DOM事件監聽會直接指向事件的觸發元素 
     `<button onclick="console.dir(this)">按鈕 </button>`
     圖：
* 箭頭函式(ES6)
