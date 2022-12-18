const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button.number');
const operators = document.querySelectorAll('button.operator');
// const numbersOperators = document.querySelectorAll('button.number, button.operator');
const decimal = document.querySelector('button#decimal');
const positiveNegative = document.querySelector('button#positiveNegative');
const display = document.querySelector('div.display');
const clear = document.querySelector('button.clear');
const equal = document.querySelector('button.equal');

// let numberOperatorArray = [];
// let result;
// let numberOfCharacters = 0;
// let containsDecimal;
let operationObj = {
    leftOperand: 'empty',
    operator: 'empty',
    rightOperand: 'empty',
    result: 'empty',
};
let numString = '';
let leftOperandEntered = false;


clearInput();

//Save all the input from the user
numbers.forEach(number => {
    number.addEventListener('click', event => {
        removeActive();
        event.target.classList.add('active');

        // if(result!=='empty'){
        //     clearInput();
        // }

        if(numberOfCharacters<9){
            numString += event.target.textContent;

            if(operationObj.operator==='empty'){
                operationObj.leftOperand = numString;
            }
            else{
                operationObj.rightOperand = numString;
            }

            console.table(operationObj);

            display.textContent = numString;
            numberOfCharacters++;



















            // if(event.target.textContent==='.'){
            //     if(containsDecimal){
            //         return;
            //     }
            //     containsDecimal = true;
            // }

            // if(displayString==='+/-'){
            //     displayString = '-';
            // }

            // numberOperatorArray.push(displayString);
            // display.textContent = numberOperatorArray.join('');
            // numberOfCharacters++;
        }
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', event => {
        if(operationObj.rightOperand==='empty'){
            removeActive();
            event.target.classList.add('active');
            operationObj.operator = event.target.textContent;
            numString = '';
            numberOfCharacters = 0;
            console.table(operationObj);
        }
    })
})

//Key presses correlate to buttons on the calculator
document.addEventListener('keydown', event => {
    if(event.which>=48 && event.which<=57){

        if(numberOfCharacters<9){
            numString += event.key;

            if(operationObj.operator==='empty'){
                operationObj.leftOperand = numString;
            }
            else{
                operationObj.rightOperand = numString;
            }

            console.table(operationObj);

            display.textContent = numString;
            numberOfCharacters++;
        }
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

//     //     if(event.key==='c'){
//     //         clearInput();
//     //         return;
//     //     }

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

//Takes in the raw array of input from the user and split it into 2 arrays of type array
// function splitArray(){
//     let tempOperandArray = [];
//     let tempOperatorArray = [];
//     numberOperatorArray.push('=');
//     let start = 0;
//     let x = 0;
//     for(let i=0; i<numberOperatorArray.length; i++){
//         if(numberOperatorArray[i]==='+' || numberOperatorArray[i]==='-' || numberOperatorArray[i]==='*' 
//         || numberOperatorArray[i]==='/' || numberOperatorArray[i]==='%' || numberOperatorArray[i]==='='){
//             if(tempOperandArray.length===0){
//                 tempOperandArray[x] = numberOperatorArray.slice(start, i);
//             }
//             else{
//                 tempOperandArray[x] = numberOperatorArray.slice(start+1, i);
//             }
//             tempOperatorArray[x] = numberOperatorArray.slice(i, i+1);
//             start = i;
//             x++;
//         }
//     }
//     tempOperatorArray.pop();

//     prepareOperations(tempOperandArray,tempOperatorArray);
// }

//Take 2 arrays of type array and transfer them into an array of numbers and an array of strings
// function prepareOperations(tempOperandArray,tempOperatorArray){
//     let operandArray = [];
//     let operatorArray = [];
//     let operationsObjArray = [];
//     let operationsObj;
//     let currentNumber;

//     for(let i=0; i<tempOperandArray.length; i++){
//         let tempNumArray = tempOperandArray[i];
//         let indexOfSign = tempNumArray.indexOf('+/-');

//         if(indexOfSign!==-1){
//             tempNumArray[indexOfSign] = '-';
//         }

//         currentNumber = +tempNumArray.join('');
//         // currentNumber = +currentNumber.toFixed(4);
//         operandArray[i] = currentNumber;
//     }
//     for(let i=0; i<tempOperatorArray.length; i++){
//         operatorArray[i] = tempOperatorArray[i].toString();
//     }

//     for(let i=0; i<operatorArray.length; i++){
//         operationsObj = {};
//         operationsObj.leftOperand = operandArray[i];
//         operationsObj.operator = operatorArray[i];
//         operationsObj.rightOperand = operandArray[i+1];
//         operationsObjArray.push(operationsObj);
//     }

//     if(operandArray.length===1){
//         display.textContent = currentNumber;
//     }
//     else{
//         orderOfOperations(operationsObjArray);
//     }
// }

//Take an array of operations and sort them by order of operations
// function orderOfOperations(operationsObjArray){
//     operationsObjArray.sort((a,b) => {
//         if(a.operator==='*' || a.operator==='/' || a.operator==='%'){
//             if(b.operator==='+' || b.operator==='-'){
//                 return -1;
//             }
//             else{
//                 return 0;
//             }
//         }
//         else{
//             if(b.operator==='*' || b.operator==='/' || b.operator==='%'){
//                 return 1;
//             }
//             else{
//                 return 0;
//             }
//         }
//     })

//     operate(operationsObjArray);
// }

//Decide which operation should be performed and output result
function operate(){
    operationObj.leftOperand = +operationObj.leftOperand;
    operationObj.rightOperand = +operationObj.rightOperand;

    if(!isNaN(operationObj.rightOperand) || operationObj.operator.length!==0){

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







// function operate(operationsObjArray){
//     console.table(numberOperatorArray);
//     console.table(operationsObjArray);
//     let i = 0;
//     result = [];

//     for(i; operationsObjArray[i].operator==='*' || operationsObjArray[i].operator==='/' ||
//     operationsObjArray[i].operator==='%'; i++){
//         if(operationsObjArray[i].operator==='*'){
//             result[i] = multiply(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//         }
//         else if(operationsObjArray[i].operator==='/'){
//             result[i] = divide(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//         }
//         else{
//             result[i] = remainder(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//         }

//         if(i+1===operationsObjArray.length){
//             if(operationsObjArray[i].operator==='*'){
//                 result[0] = multiply(result[0],operationsObjArray[i].rightOperand);
//             }
//             else if(operationsObjArray[i].operator==='/'){
//                 result[0] = divide(result[0],operationsObjArray[i].rightOperand);
//             }
//             else{
//                 result[0] = remainder(result[0],operationsObjArray[i].rightOperand);
//             }

//             break;
//         }
//     }

//     if(i>0){
//         let x = 1;

//         for(i; i<operationsObjArray.length; i++){

//             if(operationsObjArray[0].leftOperand===operationsObjArray[operationsObjArray.length-1].rightOperand){
//                 operationsObjArray[i].rightOperand = result[0];
//             }
//             else{
//                 operationsObjArray[i].leftOperand = result[0];

//                 if(i+1!==operationsObjArray.length){
//                     operationsObjArray[i].rightOperand = result[x];
//                 }
    
//             }

//             if(operationsObjArray[i].operator==='+'){
//                 result[0] = add(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//             }
//             else if(operationsObjArray[i].operator==='-'){
//                 result[0] = subtract(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//             }

//             x++;
//         }

//     }
//     else{
//         for(let i=0; i<operationsObjArray.length; i++){
//             if(operationsObjArray[i].operator==='+'){
//                 result = add(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//             }
//             else if(operationsObjArray[i].operator==='-'){
//                 result = subtract(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//             }
//             else if(operationsObjArray[i].operator==='*'){
//                 result = multiply(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//             }
//             else if(operationsObjArray[i].operator==='/'){
//                 result = divide(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//             }
//             else{
//                 result = remainder(operationsObjArray[i].leftOperand,operationsObjArray[i].rightOperand);
//             }
    
//             if(i===operationsObjArray.length-1){
//                 break;
//             }
//             else{
//                 operationsObjArray[i+1].leftOperand = result;
//             }
//         }
//     }

//     if(typeof result==='object'){
//         result = +result[0].toFixed(4);
//     }
//     else{
//         result = +result.toFixed(4);
//     }

//     display.textContent = result;
// }

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