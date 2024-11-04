var massiw = [1, 2, 3, 4, 5]; // хүснэгтийг анхны утгатайгаар зарлах

var counter = 0;
var array = []; // хоосон хүснэгт зарлах
var temp;
while (counter < 5) {
  temp = window.prompt("neg too oruul:");
  let temp2 = parseFloat(temp); // хөвөгч цэгтэй тоо буюу бутархай тоо руу хувиргах
  array.push(temp2); // хүснэгт рүү temp2-ийн утгыг хийх
  //   array.pop(temp2); // хүснэгтээс temp2-ийн утгыг гаргах
  counter++; //counter = counter + 1 // counter += 1
}
document.writeln("хүснэгтийн элементийн тоо: " + array.length); // хүснэгтийн элементийн тоог дэлгэцэнд хэвлэнэ
console.log(array); // console дээр хүснэгтийг хэтлэнэ
