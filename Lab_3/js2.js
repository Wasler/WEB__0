// let i = 0;
// while(i<3){
// 	alert(i);
// 	i++;
// }

// let i = 3

// while(i != 0){
// 	alert(i);
// 	i--;
// }

// let i = 0;
// do{
// 	alert(i);
// 	i++;
// } while(i < 3);


// let count = prompt("Enter number: ")
// let i = count;
// let rand;

// while(i > 0){
// 	rand = Math.floor(Math.random()*100);

// 	console.log(`Random number_${count - i+1} : ${rand}`);
// 	i--;
// }

// let n = +prompt("enter number n: ")
// let sum = 0;

// console.log(`Number n: ${n}`)
// console.log('');

// for(let i = n; i > 0; i--){
// 	if(n % i == 0){
// 		sum += i;
// 	}
// }

// console.log(`Sum: ${sum}`);


// let a = +prompt("enter number a:");
// let b = +prompt("enter number b:");
// let count = 0;

// console.log(`Number a: ${a}`);
// console.log(`Number b: ${b}`);
// console.log('');

// for(let i = a; i <= b; i++){
// 	if(((i**3 % 10) == 4) || ((i**3 % 10) == 9)){
// 		count ++;
// 	}
// }

// console.log(`Count: ${count}`);

// let number = +prompt("enter the starting number of organisms: ");
// let increase = +prompt("enter the percentage of daily increase:");

// let day_breed = +prompt("enter the number of days to breed:");

// console.log(`Starting number of organisms: ${number}`);
// console.log(`Percentage of daily increase: ${increase}`);
// console.log(`Number of days to breed: ${day_breed}`);

// for(let i = 1; i<= day_breed; i++){
// 	console.log(`Day ${i}: ${number}`);
// 	number = number + number*(increase/100);
// }


let km = +prompt("Enter the number pf kilometers: ");
alert("Miles in " + km + "  kilometers:" + convert_to_miles(km));

function convert_to_miles(km){
	return km*0.6214;	
}


// let first = +prompt("Enter first number: ");
// let oper = prompt("Enter operation: ");
// let second = +prompt("Enter second number: ");
// let answer;

// console.log("First number: " + first);
// console.log("Operation: " + oper);
// console.log("Second number: " + second);

// switch(oper){
//     case '+':
// 	    answer = plus(first, second);
// 	    break;
// 	case '-':
// 	    answer = minus(first, second);
//         break;
// 	case '*':
// 	    answer = multi(first, second);
//         break;
// 	case '/':
// 	    answer = divide(first, second);
// 	    break
// 	default:
// 	  	console.log("Wrong operation");
// 	  	break;
// }

// console.log(first + " " + oper + " " + second + " = " + answer);

// function plus(one, two){
//     return one + two;
// }

// function minus(one, two){
// 	return one - two;
// }

// function multi(one, two){
// 	return one * two;
// }

// function divide(one,two){
// 	if( two != 0){
// 		return one / two;
// 	}
// 	else{
// 		return "You cannot divide by zero!";
// 	}
// }



// let one = +prompt("Enter first number")
// let two = +prompt("Enter two number")
// let three = +prompt("Enter three number")
// let sum = one + two + three

// console.log(`First house give: ${one} gifts`);
// console.log(`Two house give: ${two} gifts`);
// console.log(`Three house give: ${three} gifts`);

// console.log(`Total gifts: ${sum} `);

// console.log('First house give: ' + house1 + ' gifts');
// console.log('Second house give: ' + house2 + ' gifts');
// console.log('Third house give: ' + house3 + ' gifts ');

// let total1 = house1+house2+house3;
// console.log('Total gifts: ' + total1);

// let min = house1;
// let minhHouse = 1
// if(house2 < min){
// 	min = house2;
// }

// let  n = +prompt("Kilkist elementiv v masivi?");
// let arr = [];

// for(let i = 0; i < n; i++){
// 	arr.push(Math.floor(Math.random()*100));
// }

// console.log(`arr[0] =  ${arr[0]} `);
// console.log(`arr[1] =  ${arr[1]} `);
// console.log(`arr[2] =  ${arr[2]} `);
// console.log(`arr[3] =  ${arr[3]} `);
// console.log(`arr[4] =  ${arr[4]} `);
// console.log(`arr[5] =  ${arr[5]} `);

// function ArraySum(someArray){
// 	let sum = 0;
// 	for(let i =0; i< someArray.length; i++){
// 		sum += someArray[i];
// 	}
// 	return sum;
// }

// let elem;
// let arr = [];

// for(let i =0; i < 10; i++){
// 	arr[i] = Math.floor(Math.random()*100);
// }

// printingArray(arr);

// function printingArray(array){
// 	for(let i = 0; i < array.length; i++){
// 		console.log(`arr[${i}] = ${arr[i]}`);
// 	}
// }

// let elem;
// let arr = [];

// do{
// 	elem = prompt("element ");
// 	if(arr.includes(+elem) || elem == '' || elem == null){
// 		continue;
// 	} else {
// 		arr.push(+elem);
// 	}
// }while(elem);

// console.log("array witout duplicates: ", arr);
