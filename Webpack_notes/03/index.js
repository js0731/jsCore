import img from './img.png'
import jpg from './jpg.jpg'
import './css/index.scss'

console.log(jpg)
console.log(img)
console.log('test')

var oImg = document.createElement('img');
oImg.src = img
document.body.appendChild(oImg)