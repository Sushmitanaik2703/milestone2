// dynamically typed language  need not write the datatypes it will automatically detect the datatype
// var, let, const- 3 keywords(used to declare a variable) and we have to use any one of them to declare a variable
// var num= 100;  
// var num="hello";  // for var variable we can redeclare and reinitialization the value
// console.log(num)
// dont use var: in js use let or const bcz if we use var twice we may nit get expecyed ouptut
 //let num=100
  //num="hello";   // output: hello
// let num="hello"; //output: error (num has already been declared u cannot redeclare)
 //console.log(num);
 //let: we can reinitialize but cannot redeclare

// const num=9; // once value given u cannot change it
// num=800; // error: type error
// const num=800; // syntax error
// console.log(num);
// const: neither redeclare nor reinitialize
//var num;
//console.log(num); // output: undefined (datatype)
//let num;
//console.log(num); // output: undefined (datatype)
//const num;
//console.log(num);//output:syntax error bcz const need some value assigned to it
//const value =90;

let a=2
let b=10
let mult;
mult=a*b
console.log(mult);

//create calculator:multiplication(*),add(+),sub(-)
let add;
add=a+b 
console.log(add);

let sub;
sub=a-b 
console.log(sub);

// comp opert
let age=30
if (age>18){
    console.log("Eligible");
}
else{
    console.log("Invalid");
}


//let char1="5"
//let num1=5
//console.log(typeof(char1));
//console.log(typeof(num1));
//console.log(char1+num1);

let char1="5"
let num1=5
if(char1==num1){
    console.log("Yes");
}

//there is a diff btn === and ==
//=== checks the data type also 


/*conditional statement
print 1-100
 For multiples of 3, print "your name" instead of number.
 For multiples of 5, print "your friend's name" instead of number.
 For multiples of 3 and 5, print "your and friend's name" instead of number.
*/


for(let i=0;i<=100;i++){
    if(i%3==0)
    {
        console.log("sush");
    }
    else if(i%5==0)
    {
        console.log("swa");
    }
    else if(i%3==0 && i%5==0)
    {
        console.log("sush and swa");
    }
    else{
        console.log(i);
    }
}


// data-types: array and objects
let arr = ["proname","proprice","procolor"];
console.log(arr[2])
//indexing in arr: starts with 0
//length : starts with 1
 