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

const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button.number');
const operators = document.querySelectorAll('button.operator');
const numbersOperators = document.querySelectorAll('button.number, button.operator');
const decimal = document.querySelector('button#decimal');
const positiveNegative = document.querySelector('button#positiveNegative');
const display = document.querySelector('div.display');
const clear = document.querySelector('button.clear');
const equal = document.querySelector('button.equal');

let numberOperatorArray = [];
let result;
let numberOfCharacters;
let containsDecimal;

clearInput();

//Save all the input from the user
numbersOperators.forEach(numberOperator => {
    numberOperator.addEventListener('click', event => {
        removeActive();
        event.target.classList.add('active');

        if(result!==0){
            clearInput();
        }

        if(numberOfCharacters<20){
            let displayString = event.target.textContent;

            if(event.target.textContent==='.'){
                if(containsDecimal){
                    return;
                }
                containsDecimal = true;
            }

            if(displayString==='+/-'){
                displayString = '-';
            }

            numberOperatorArray.push(displayString);
            display.textContent = numberOperatorArray.join('');
            numberOfCharacters++;
        }
    })
})

//Key presses correlate to buttons on the calculator
document.addEventListener('keydown', event => {
    if((event.which>=48 && event.which<=57) || event.which===8 || event.which===13 || 
    event.which===67 || event.which===187 || event.which===189 || event.which===190 || 
    event.which===191 || event.which===220){
        removeActive();
        let eventKeyString = event.key;

        if(eventKeyString==='Backspace'){
            numberOperatorArray.pop();
            if(numberOperatorArray.length===0){
                display.textContent = 0;
            }
            else{
                display.textContent = numberOperatorArray.join('');
            }
            console.table(numberOperatorArray);
            return;
        }

        if(eventKeyString==='Enter'){
            eventKeyString = '=';
        }

        let button = document.querySelector(`button[data-key="${eventKeyString}"]`);
        button.classList.add('active');

        if(eventKeyString==='c'){
            clearInput();
            return;
        }

        if(result!==0){
            clearInput();
        }


        if(eventKeyString==='='){
            splitArray();
            return;
        }

        if(numberOfCharacters<20){
            let displayString = button.textContent;

            if(button.textContent==='.'){
                if(containsDecimal){
                    return;
                }
                containsDecimal = true;
            }

            if(displayString==='+/-'){
                displayString = '-';
            }

            numberOperatorArray.push(displayString);
            display.textContent = numberOperatorArray.join('');
            numberOfCharacters++;
            console.table(numberOperatorArray);
        }
    }
});

equal.addEventListener('click',splitArray);

clear.addEventListener('click',clearInput);

function removeActive(){
    buttons.forEach(button => {
        button.classList.remove('active');
    });
}

//Takes in the raw array of input from the user and split it into 2 arrays of type array
function splitArray(){
    let tempOperandArray = [];
    let tempOperatorArray = [];
    numberOperatorArray.push('=');
    let start = 0;
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
    let currentNumber;

    for(let i=0; i<tempOperandArray.length; i++){
        let tempNumArray = tempOperandArray[i];
        let indexOfSign = tempNumArray.indexOf('+/-');

        if(indexOfSign!==-1){
            tempNumArray[indexOfSign] = '-';
        }

        currentNumber = +tempNumArray.join('');
        currentNumber = +currentNumber.toFixed(4);
        console.log(currentNumber);
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

    if(operandArray.length===1){
        display.textContent = currentNumber;
    }
    else{
        orderOfOperations(operationsObjArray);
    }
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

    operate(operationsObjArray);
}

//Decide which operation should be performed
function operate(operationsObjArray){
    console.table(numberOperatorArray);
    console.table(operationsObjArray);

    for(let i=0; i<operationsObjArray.length; i++){
        if(operationsObjArray[i].operator==='+'){
            result = add(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
        }
        else if(operationsObjArray[i].operator==='-'){
            result = subtract(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
        }
        else if(operationsObjArray[i].operator==='*'){
            result = multiply(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
        }
        else if(operationsObjArray[i].operator==='/'){
            result = divide(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
        }
        else{
            result = remainder(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
        }

        if(i===operationsObjArray.length-1){
            break;
        }
        else{
            operationsObjArray[i+1].leftOperand = result;
        }
}

    result = +result.toFixed(4);
    display.textContent = result;
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

//Clear everything to 0 when the clear button is pressed
function clearInput(){
    display.textContent = 0;
    numberOperatorArray = [];
    result = 0;
    numberOfCharacters = 0;
    containsDecimal = false;
    removeActive();
}