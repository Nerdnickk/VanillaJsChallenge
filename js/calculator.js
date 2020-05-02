const display = document.querySelector(".calculator__display");

const operatorKeys = document.querySelector(".operator"),
    operatorKey = operatorKeys.getElementsByClassName("operatorJs");

const numberContain = document.querySelector(".number__contain");



function operatorHandle(e){
    const keyTarget = e.target.dataset.action;
    let result = ``;
    let displayNum = display.textContent;
    function 
        if(keyTarget === "clear"){
            
        } else if (keyTarget=== "add"){
            displayNum = displayNum + displayNum;
            console.log(displayNum)
        } else if (keyTarget === "subtract"){
            console.log(keyTarget)
        } else if (keyTarget === "multiply"){
            console.log(keyTarget)
        } else if (keyTarget === "divide"){
            console.log(keyTarget)
        }
}

function nuberClickHandle(e){
    const numberTarget = e.target.innerText;
    const displayNum = display.textContent;
    const calculartor = e.target.dataset.action;
    if(calculartor){
        return null
    } else{
        if(displayNum === '0'){
            display.textContent = numberTarget;
        } else{
            display.textContent = displayNum + numberTarget
        }
    }
}

function init(){
    numberContain.addEventListener("click", nuberClickHandle)
    operatorKeys.addEventListener("click", operatorHandle)
}

init();