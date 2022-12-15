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
const decimal = document.querySelector('button.decimal');
const positiveNegative = document.querySelector('button.positiveNegative');
const display = document.querySelector('p.display');
const clear = document.querySelector('button.clear');
const equal = document.querySelector('button.equal');
let operatorChoice='';

getNumber();

//Decide which operation should be performed after a user
    //presses the equal button and display result
function operate(leftOperand,operatorChoice,rightOperand){
    let result;

    equal.addEventListener('click', () => {
        if(operatorChoice==='+'){
            result = add(leftOperand,rightOperand);
        }
        else if(operatorChoice==='-'){
            result = subtract(leftOperand,rightOperand);
        }
        else if(operatorChoice==='*'){
            result = multiply(leftOperand,rightOperand);
        }
        else{
            result = divide(leftOperand,rightOperand);
        }
        display.textContent = result
    });
}

//Save an operand put in by a user then call 
function getNumber(){
    let firstNum = '';
    let secondNum = '';
    let leftOperand;
    let rightOperand;

    numbers.forEach(number => {
        number.addEventListener('click', event => {
            if(operatorChoice===''){
                if(firstNum.length<9){
                    firstNum += event.target.textContent;
                    displayNumber(firstNum);
                    leftOperand = +firstNum;
                }
                operatorChoice = getOperator();
            }
            else{
                if(secondNum.length<9){
                    secondNum += event.target.textContent;
                    displayNumber(secondNum);
                    rightOperand = +secondNum;
                }
                operate(leftOperand,operatorChoice,rightOperand);
            }
        })
    });
}

//Save the operator input from the user
function getOperator(){
    operators.forEach(operator => {
        operator.addEventListener('click', event => {
            operatorChoice = event.target.textContent;
            event.target.setAttribute('style','background-color: darkblue');
            return operatorChoice;
        })
    });
}

//Display the number that was selected to the UI
function displayNumber(numberText){
    display.textContent = numberText;
}

//Run the numbers through the appropriate function based on the operand selection
    //Sum
function add(a,b){
    console.log(a + '+' + b);
    return a + b;
}
    //Subtract
function subtract(a,b){
    console.log(a + '-' + b);
    return a - b;
}
    //Multiply
function multiply(a,b){
    console.log(a + '*' + b);
    return a * b;
}
    //Divide
function divide(a,b){
    console.log(a + '/' + b);
    return a / b;
}


//Return the result of the operation to the screen to display to the user if they select
    //the equal sign or another operand

//Round the number to a few decimal points so it does not overflow the calculator

//Keep a running total of the numbers until the clear button is pressed

//Clear everything to 0 when the clear button is pressed