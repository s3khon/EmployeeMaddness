/*
const reducer = [3, 5, 4, 3, 6, 2, 3, 4].reduce(function(a, i){return (a + i)}, 0 );

console.log(reducer); 

const data = [
    {
        name: "Sally", 
        hours: 5, 
    },     {
        name: "Tom", 
        hours: 2, 
    },
    {
        name: "Bob", 
        hours: 8, 
    }
]; 

const totalHours = data.reduce( (acc, item) => {
    return acc + item.hours; 
}, 0); 

console.log(totalHours); 

// ____________________________________________

const studentsData = [
    {
      firstName: "Lucy",
      lastName: "Mark",
      score: 78    
    },
    {
      firstName: "Charles",
      lastName: "Rot",
      score: 84
    },
    {
      firstName: "Marilyn",
      lastName: "Mayr",
      score: 99
    },
    {
        firstName: "Tom",
        lastName: "Stir",
        score: 75
      },
  ];

const studentsWithBestResults = studentsData.reduce( (acc, item) => {
    if (item.score < 80) {
        return acc; 
    }
    acc.push( `${item.firstName} ${item.lastName}` ); 
    return acc; 
}, []); 

console.log(studentsWithBestResults);


console.log("_______________________"); 


const employeeData = [
	{
		firstName: "Tom", 
		lastName: "Mayr"
	},
    {
	
		firstName: "Bob", 
		lastName: "Hank"
	},
]; 

const employeeFullnames = employeeData.map( person => ({
		fullName: `${person.firstName} ${person.lastName}`
	})); 

console.log(employeeFullnames); 

console.log("_____________________________"); 

const studentsData1 = [
    {
      firstName: "Lucy",
      lastName: "Mark",
      score: 78    
    },
    {
      firstName: "Charles",
      lastName: "Rot",
      score: 84
    },
    {
      firstName: "Marilyn",
      lastName: "Mayr",
      score: 99
    },
    {
        firstName: "Tom",
        lastName: "Stir",
        score: 80
      },
  ];
const bestStudents = studentsData1.filter( element => element.score >= 80 ); 
console.log(bestStudents); 

const strings = ["1", "2", "3", "4", "5"]; 

// get the sum of all even numbers: 
const sum = strings
    .map(x => parseInt(x))
    .filter(x => {
          return x % 2 === 0 ? true : false; 
    })
    .reduce((acc, el) => acc + el);

console.log(sum); 

*/
/*
console.log(add(1,2));



function add(a,b) {
  console.log(arguments); 
  return a+b; 
}

const add1 = function(a,b) {
  console.log(arguments); 
  return a+b; 
}

const sum = (a,b) => {
  console.log(arguments); 
  return a+b; 
}
  
console.log(sum(3,4));  
*/
// function declarations are hoisted. 
// function expressions are not hoisted. 
// arrow functions are not hoisted. 

const strings = ["0", "1", "3", "4", "5"]; 

const sumOfEvenNumbers = strings
  .map( x => parseInt(x))
  .filter( x => x % 2 === 0 )
  .reduce( (acc, x) => acc + x); 

console.log(sumOfEvenNumbers); 
