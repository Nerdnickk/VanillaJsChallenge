const rangeForm = document.querySelector(".rangeFormJs"),
    rangeJs = rangeForm.querySelector("input"),
    titleNumJs = document.querySelector(".titleNumberJs");

const guessContain = document.querySelector(".guessInputJs__Contain"),
    enterNumber = guessContain.querySelector(".numberJs");

const choseContain = document.querySelector(".choseContain"),
    userChose = choseContain.querySelector(".playerNum"),
    maschingChose = choseContain.querySelector(".machineNum");

const whoWin = document.querySelector(".return");

function gameValue(user, maschin){
    if(user> maschin){
        whoWin.innerHTML = `You Win!`
    } else if (user < maschin) {
        whoWin.innerHTML = `You Lost!`
    }
}

function randomNumberHandle(max){
    const playNumber =  enterNumber.value;
    userChose.innerHTML = `You chose : ${playNumber},`;

    const ranNum = Math.floor(Math.random()*(max)+1);
    maschingChose.innerHTML = `Masching chose : ${ranNum}`
    gameValue(playNumber, ranNum)
}

function guessHandle(e){
    e.preventDefault();
    const value = rangeJs.value;
    randomNumberHandle(value);
}

const rangeHandle = (e) => {
    e.preventDefault();
    const value = rangeJs.value;
    titleNumJs.innerHTML = `Generate a number between 0 and ${value}`;
}

function init(){
    if(rangeForm){
        rangeForm.addEventListener("change", rangeHandle);
    }
    if(guessContain){
        guessContain.addEventListener("submit", guessHandle);    
    }
};

init();