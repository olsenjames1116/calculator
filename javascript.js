/* Understanding the problem:
    I must create a calculator that will take operands and operators from a user and return the requested operation
    to a display for the user to see.
*/

/* Plan:
Does your program have a user interface? What will it look like? What functionality will the interface have?
    Yes, the program will have a user interface. This will be in the form of a calculator with buttons that are
    operational as well as a display for the user to be able to see the operations they have requested. The interface
    will have a range of buttons including: +, =, -, /, *, numbers from 0-9, a positive to negative operator (+/-), and
    a clear button. There will also be display just as there is in a handheld calculator to show all of the inputs and
    what has been returned from every operation. This interface will only allow mathematical functions to be performed.
What inputs will your program have? Will the user enter data or will you get input from somewhere else?
    The program will have input from buttons presses provided by the user on the calculator interface.
What's the desired input?
    The numbers and symbols that are visible on the calculator. The value input by the user will be rounded to a reasonable
    amount of decimal points so that the number does not overflow off the calculator. A clear request from the clear button is also welcomed.
Given your inputs, what are the steps necessary to return the desired output?
    I must await a number to be input then await for the user to select an operator followed by another number. The numbers will
    be rounded if they are too long and an error message will be given if the user attempts to divide by 0. These numbers must 
    then be passed through the appropriate function with the outcome being displayed to the user. The resulting number from 
    this operation must be stored for continuous use against other operations until the user presses the clear button. The 
    clear button will reset the current value back to zero.
*/

const numbers = document.querySelectorAll('button.number');
const operators = document.querySelectorAll('button.operator');
const numbersOperators = document.querySelectorAll('button.number, button.operator');
const decimal = document.querySelector('button#decimal');
const positiveNegative = document.querySelector('button#positiveNegative');
const display = document.querySelector('p.display');
const clear = document.querySelector('button.clear');
const equal = document.querySelector('button.equal');
let numberOperatorArray = [];

//Decide which operation should be performed after a user
    //presses the equal button and display result
function operate(leftOperand,operator,rightOperand){    
    if(operator==='+'){
        result = add(leftOperand,rightOperand);
    }
    else if(operator==='-'){
        result = subtract(leftOperand,rightOperand);
    }
    else if(operator==='*'){
        result = multiply(leftOperand,rightOperand);
    }
    else if(operator==='/'){
        result = divide(leftOperand,rightOperand);
    }
    else{
        result = remainder(leftOperand,rightOperand);
    }
    display.textContent = result;
}

//Save all the input from the user
numbersOperators.forEach(numberOperator => {
    numberOperator.addEventListener('click', event => {
        numberOperatorArray.push(event.target.textContent);
        display.textContent = numberOperatorArray.join('');
    })
})

equal.addEventListener('click', splitArray);

//Display the number that was selected to the UI
function displayNumber(numberText){
    display.textContent = numberText;
} 

//Takes in the raw array of input from the user and split it into 2 arrays of type array
function splitArray(){
    numberOperatorArray.push('=');
    let start = 0;
    let tempOperandArray = [];
    let tempOperatorArray = [];
    let x = 0;
    for(let i=0; i<numberOperatorArray.length; i++){
        if(numberOperatorArray[i]==='+' || numberOperatorArray[i]==='-' || numberOperatorArray[i]==='*' 
        || numberOperatorArray[i]==='/' || numberOperatorArray[i]==='%' || numberOperatorArray[i]==='='){
            if(tempOperandArray.length===0){
                tempOperandArray[x] = numberOperatorArray.slice(start, i);
            }
            else{
                tempOperandArray[x] = numberOperatorArray.slice(start+1, i);
            }
            tempOperatorArray[x] = numberOperatorArray.slice(i, i+1);
            start = i;
            x++;
        }
    }
    tempOperatorArray.pop();

    prepareOperations(tempOperandArray,tempOperatorArray);
}

//Take 2 arrays of type array and transfer them into an array of numbers and an array of strings
function prepareOperations(tempOperandArray,tempOperatorArray){
    let operandArray = [];
    let operatorArray = [];
    let operationsObjArray = [];
    let operationsObj;
    for(let i=0; i<tempOperandArray.length; i++){
        let tempNumArray = tempOperandArray[i];
        let currentNumber = +tempNumArray.join('');
        operandArray[i] = currentNumber;
    }
    for(let i=0; i<tempOperatorArray.length; i++){
        operatorArray[i] = tempOperatorArray[i].toString();
    }

    for(let i=0; i<operatorArray.length; i++){
        operationsObj = {};
        operationsObj.leftOperand = operandArray[i];
        operationsObj.operator = operatorArray[i];
        operationsObj.rightOperand = operandArray[i+1];
        operationsObjArray.push(operationsObj);
    }
    console.table(operationsObjArray);
    orderOfOperations(operationsObjArray);
}

//Take an array of operations and sort them by order of operations
function orderOfOperations(operationsObjArray){
    operationsObjArray.sort((a,b) => {
        if(a.operator==='*' || a.operator==='/' || a.operator==='%'){
            if(b.operator==='+' || b.operator==='-'){
                return -1;
            }
            else{
                return 0;
            }
        }
        else{
            if(b.operator==='*' || b.operator==='/' || b.operator==='%'){
                return 1;
            }
            else{
                return 0;
            }
        }
    })

    console.table(operationsObjArray);
}

//Run the numbers through the appropriate function based on the operand selection
    //Sum
function add(a,b){let leftOperand = '';
    return a + b;
}
    //Subtract
function subtract(a,b){
    return a - b;
}
    //Multiply
function multiply(a,b){
    return a * b;
}
    //Divide
function divide(a,b){
    return a / b;
}

    //Remainder
function remainder(a,b){
    return a % b;
}


//Return the result of the operation to the screen to display to the user if they select
    //the equal sign or another operand

//Round the number to a few decimal points so it does not overflow the calculator

//Clear everything to 0 when the clear button is pressed