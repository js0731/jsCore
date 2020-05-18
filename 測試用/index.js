boo = true;
num = 100

for (let i = 1; i < 300; i++) {
    if (num >= 100 || num <= 1) {
        boo = !boo
        console.log(boo);
    }
    if (boo) {
        num++
    }
    else {
        num--
    }
    console.log(num);
}


