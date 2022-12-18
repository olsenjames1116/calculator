const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button.number');
const operators = document.querySelectorAll('button.operator');
const decimal = document.querySelector('button#decimal');
const positiveNegative = document.querySelector('button#positiveNegative');
const display = document.querySelector('div.display');
const clear = document.querySelector('button.clear');
const equal = document.querySelector('button.equal');

let containsDecimal;
let operationObj = {
    leftOperand: 'empty',
    operator: 'empty',
    rightOperand: 'empty',
    result: 'empty',
};
let numString = '';
let button;


clearInput();

//Save the operand information from the user when they select from the UI
numbers.forEach(number => {
    number.addEventListener('click', event => {
        removeActive();
        event.target.classList.add('active');

        if(numberOfCharacters<9){

            if(event.target.textContent==='.'){
                if(containsDecimal){
                    return;
                }
                containsDecimal = true;
            }

            if(event.target.textContent==='+/-'){
                numString = +numString;
                numString = numString * -1;
                display.textContent = numString;
                numString.toString();
            }
            else{
                numString += event.target.textContent;
                numberOfCharacters++;
            }

            if(operationObj.operator==='empty'){
                operationObj.leftOperand = numString;
            }
            else{
                operationObj.rightOperand = numString;
            }

            console.table(operationObj);

            display.textContent = numString;
        }
    })
})

//Save input for operand from user
    //Trigger object to begin storing information for further user input as the right operand
operators.forEach(operator => {
    operator.addEventListener('click', event => {
        if(operationObj.rightOperand==='empty'){
            removeActive();
            event.target.classList.add('active');
            operationObj.operator = event.target.textContent;
            numString = '';
            numberOfCharacters = 0;
            containsDecimal = false;
            console.table(operationObj);
        }
    })
})

//Key presses correlate to buttons on the calculator
document.addEventListener('keydown', event => {
    if((event.which>=48 && event.which<=57) || event.which===190 || event.which===8){
        removeActive();

        if(event.key==='Backspace'){
            if(numberOfCharacters>0){
                numberOfCharacters --;
            }
            if(operationObj.operator==='empty'){
                operationObj.leftOperand.toString();
                if(operationObj.leftOperand.length<=1){
                    numString = '';
                    operationObj.leftOperand = 0;
                    display.textContent = 0;
                    return;
                }
                else{
                    numString = operationObj.leftOperand.substring(0,operationObj.leftOperand.length-1);
                    operationObj.leftOperand = numString;
                }
            }
            else{
                operationObj.rightOperand.toString();
                if(operationObj.rightOperand.length<=1){
                    numString = '';
                    operationObj.rightOperand = 'empty';
                    display.textContent = 0;
                    return;
                }
                else{
                    numString = operationObj.rightOperand.substring(0,operationObj.rightOperand.length-1);
                    operationObj.rightOperand = numString;
                }
            }
            display.textContent = numString;
            return;
        }
        
        button = document.querySelector(`button[data-key="${event.key}"]`);
        button.classList.add('active');

        if(event.key==='+' || event.key==='*' || event.key==='%'){
            if(operationObj.rightOperand==='empty'){
                removeActive();
                operationObj.operator = event.key;
                numString = '';
                numberOfCharacters = 0;
                containsDecimal = false;
                return;
            }
        }

        if(numberOfCharacters<9){

            if(event.key==='.'){
                if(containsDecimal){
                    return;
                }
                containsDecimal = true;
            }

            numString += event.key;
            numberOfCharacters++;

            if(operationObj.operator==='empty'){
                operationObj.leftOperand = numString;
            }
            else{
                operationObj.rightOperand = numString;
            }

            display.textContent = numString;
        }
    }
    else if(event.which===67){
        clearInput();
    }
    else if(event.which===189 || event.which===191){
        if(operationObj.rightOperand==='empty'){
            removeActive();
            operationObj.operator = event.key;
            numString = '';
            numberOfCharacters = 0;
            containsDecimal = false;
        }
    }
    else if(event.which===187){
        operate();
    }
});








// document.addEventListener('keydown', event => {
//     if(event.which>=48 && event.which<=57){

//         if(numberOfCharacters<9){
//             let displayString = button.textContent;

//         }











//         // removeActive();

//     //     if(event.key==='Backspace'){
//     //         numberOperatorArray.pop();

//     //         if(numberOfCharacters>0){
//     //             numberOfCharacters--;
//     //         }

//     //         if(numberOperatorArray.length===0){
//     //             display.textContent = 0;
//     //         }
//     //         else{
//     //             display.textContent = numberOperatorArray.join('');
//     //         }
//     //         return;
//     //     }

//     //     let button = document.querySelector(`button[data-key="${event.key}"]`);
//     //     button.classList.add('active');

//     //     if(result!==0){
//     //         clearInput();
//     //     }


//     //     if(event.key==='='){
//     //         splitArray();
//     //         return;
//     //     }

//     //     if(numberOfCharacters<9){
//     //         let displayString = button.textContent;

//     //         if(button.textContent==='.'){
//     //             if(containsDecimal){
//     //                 return;
//     //             }
//     //             containsDecimal = true;
//     //         }

//     //         if(displayString==='+/-'){
//     //             displayString = '-';
//     //         }

//     //         numberOperatorArray.push(displayString);
//     //         display.textContent = numberOperatorArray.join('');
//     //         numberOfCharacters++;
//     //     }
//     // }
//     }
//     else if(event.which===8 || event.which===67 
//         || event.which===187 || event.which===189 || event.which===190 || 
//         event.which===191 || event.which===220){

//         }
// });

equal.addEventListener('click',operate);

clear.addEventListener('click',clearInput);

function removeActive(){
    buttons.forEach(button => {
        button.classList.remove('active');
    });
}

//Decide which operation should be performed and output result
function operate(){
    operationObj.leftOperand = +operationObj.leftOperand;
    operationObj.rightOperand = +operationObj.rightOperand;

    if(!isNaN(operationObj.rightOperand) && operationObj.operator.length!==0){

        if(operationObj.operator==='*'){
            operationObj.result = multiply(operationObj.leftOperand,operationObj.rightOperand);
        }
        else if(operationObj.operator==='/'){
            operationObj.result = divide(operationObj.leftOperand,operationObj.rightOperand);
        }
        else if(operationObj.operator==='%'){
            operationObj.result = remainder(operationObj.leftOperand,operationObj.rightOperand);
        }
        else if(operationObj.operator==='+'){
            operationObj.result = add(operationObj.leftOperand,operationObj.rightOperand);
        }
        else{
            operationObj.result = subtract(operationObj.leftOperand,operationObj.rightOperand);
        }
        
        operationObj.result = +operationObj.result.toFixed(4);
        display.textContent = operationObj.result;
        operationObj.leftOperand = operationObj.result;
        operationObj.rightOperand = 'empty';
        operationObj.operator = '';
        numString = '';
        numberOfCharacters = 0;

    }
    else{
        alert('Error. The calculator will clear out now.');
        clearInput();

    }

}

//Run the numbers through the appropriate function based on the operand selection
function add(a,b){let leftOperand = '';
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    if(b===0){
        alert('You broke the laws of space and time. You are now an intergalactic wanted criminal. Hope it was worth it.');
        return ':(';
    }
    return a / b;
}

function remainder(a,b){
    return a % b;
}

//Clear everything to 0 when the clear button is pressed
function clearInput(){
    numString = '';
    operationObj.leftOperand = 0;
    operationObj.operator = 'empty';
    operationObj.rightOperand = 'empty';
    display.textContent = operationObj.leftOperand;
    operationObj.result = 'empty';
    numberOfCharacters = 0;
    containsDecimal = false;
    removeActive();
}