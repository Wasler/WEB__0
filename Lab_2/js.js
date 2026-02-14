//let age = prompt("Skiki rokiv shkolar?", 19)
//alert("Tobi "+ age + " Roki Tobi zavtra v skily")

//let name = prompt("Як тебе звати йо?")
//let bYear = 2025 - prompt("Скіки вам років?")

//console.log("Привіт" + name)s
//console.log("Твій рік народження: " + bYear 

//let number = prompt("Введіть число")
//console.log("Наступне число: " + `${number + 1}`)
//console.log("Наступне число: " + `${number + 2}`)

//let number = Number(prompt("введіть число"));

//console.log("введене число " + number)
//console.log(`Наступне число: ${number + 1}`);
//console.log(`Наступне число: ${number + 2}`);

// let sides = prompt("Skilka tobi rokiv");

// if(sides < 18){
// 	alert("shkolar");
// }
// if(sides >= 18){
// 	alert("Ti ne shkolar")
// }
// if(sides < 0){
// 	alert("ti ihe ne narodivsa")
// }

// let number = prompt("vvedi chislo")

// if(number % 2 == 0){
//    console.log("Hcilso parne")
// } else{
// 	console.log("Hcilso noparne")
// }

// let a = prompt("vvedit paroll")
// let b = prompt("vvedit ishe raz")

// if(a == b){
// 	alert("Pravilno")
// }else{
// 	alert("No ne pravilno")
// }

let number = Number(prompt("vvedit scilso 1"));
let number2  = Number(prompt("vvedit scilso 2"));
let number3  = Number(prompt("vvedit scilso 3"));

console.log("Vvedene chislo 1: " + number);
console.log("Vvedene chislo 2: " + number2);
console.log("Vvedene chislo 3: " + number3);

let sum = 0;

if(number > 0) sum += number;
if(number2 > 0) sum += number2;
if(number3 > 0) sum += number3;

console.log("suma pozitivnih chisl = " + sum);