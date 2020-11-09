slice(begin, end)
  用法：
      begin 為開始的索引值，負數代表從後面開始算起，-1為倒數第一個元素。
      end 為結束的索引值，沒有填寫時則得到arr中的所有元素。
      複製開始與結束點（結束點不算）中的內容
      #不改變原值。
  對象：
      可操控Array及String
  ex: 
      var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
      fruits.slice(1) // ['Orange', 'Lemon', 'Apple', 'Mango']
      fruits.slice(1, 3)  // ['Orange', 'Lemon']
      fruits.slice(-3)  // ["Lemon", "Apple", "Mango"]
      
splice(start, deleteCount, item1...) 
  用法：
    start 增加/刪除項目的位置，負數代表從後方算起。
    deleteCount 刪除的個數，如為0則不會刪除。
    item… 添加的新項目。
    #會改變原值
  對象：
    可操控Array。
  ex: 
      var arr = ['arr1','arr2','arr3']
      arr.splice(0,2);
      console.log(arr) // ['arr3]
      
split()
  用法:
      分割字串成字串組。
      #不改變原值。
  對象：
      可操控String。
  ex: var str = 'How are you ?'
      str.split()   // [ 'How are you ?' ]
      str.split('');   //[ 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', ' ', '?' ]
      str.split(' ');    // [ 'How', 'are', 'you', '?' ]
      str.splite(' ',3)    // [ 'How', 'are' ] 
    
filter(element,index,arr)
  - element：陣列元素的值。
  - index：陣列元素的所在位置。
  - arr：已經過 filter 處理的陣列
    
   
