const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.getElementById("pendingJs"),
    finishedList = document.getElementById("finishedJs");

const PENDING_LS = "pending",
    FINISHED_LS = "finished";

let PENDING_VALUE = [],
    FINISHED_VALUE = [];

function saveToFinishing(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHED_VALUE));
}    

function saveToPending(){
    localStorage.setItem(PENDING_LS, JSON.stringify(PENDING_VALUE));
}

function deleteClickFinishing(event){
    const btnTarget = event.target;
    const btnParent = btnTarget.parentNode;
    const targetList = btnParent.parentNode;
    
    targetList.removeChild(btnParent);
    const cleanTodos = FINISHED_VALUE.filter(function(toDo){
        return parseInt(btnParent.id) !== toDo.id;
    })
    FINISHED_VALUE = cleanTodos;
    saveToFinishing();
}

function deleteClickPending(event){
    const btnTarget = event.target;
    const btnParent = btnTarget.parentNode;
    const targetList = btnParent.parentNode;
    
    targetList.removeChild(btnParent);
    const cleanTodos = PENDING_VALUE.filter(function(toDo){
        return parseInt(btnParent.id) !== toDo.id;
    })
    PENDING_VALUE = cleanTodos;
    saveToPending();
};

function resendHandle(event){
    const btnTarget = event.target;
    const btnParent = btnTarget.parentNode;
    console.log(btnParent)

    const text = event.path[1].childNodes[0].innerText;
    const liId = PENDING_VALUE.length + 1;
    
    btnTarget.innerText = "✅";
    finishedList.removeChild(btnParent);
    pendingList.appendChild(btnParent);
    
    const cleanTodos = FINISHED_VALUE.filter(function(toDo){
        return parseInt(btnParent.id) !== toDo.id;
    })
    FINISHED_VALUE = cleanTodos;

    const pending_obj = {
        text,
        id: liId
    }

    PENDING_VALUE.push(pending_obj);

    saveToPending();
    saveToFinishing();
}

function sendHandle(event){
    const btnTarget = event.target;
    const btnParent = btnTarget.parentNode;

    const text = event.path[1].childNodes[0].innerText;
    const liId = FINISHED_VALUE.length + 1;
    
    btnTarget.innerText = "⬆️";
    pendingList.removeChild(btnParent);
    finishedList.appendChild(btnParent);
    
    const cleanTodos = PENDING_VALUE.filter(function(toDo){
        return parseInt(btnParent.id) !== toDo.id;
    })
    PENDING_VALUE = cleanTodos;

    const finishing_obj = {
        text,
        id: liId
    }

    FINISHED_VALUE.push(finishing_obj);

    saveToPending();
    saveToFinishing();
}

function showFinishing(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    const btn2 = document.createElement("button");

    const liId = FINISHED_VALUE.length + 1;

    span.innerText = text;
    btn.innerText="❌";
    btn.addEventListener("click", deleteClickFinishing);
    btn2.innerText = "⬆️";
    btn2.addEventListener("click" , resendHandle);
    li.id = liId;
    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(btn2);
    finishedList.appendChild(li);

    const finishing_obj = {
        text,
        id: liId
    }

    FINISHED_VALUE.push(finishing_obj);
    saveToFinishing();
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    const btn2 = document.createElement("button");

    const liId = PENDING_VALUE.length + 1;
    
    span.innerText=text;
    btn.innerText="❌";
    btn.addEventListener("click", deleteClickPending);
    btn2.innerText = "✅";
    btn2.addEventListener("click", sendHandle);
    li.id = liId;
    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(btn2);
    pendingList.appendChild(li);
    const pending_obj = {
        text: text,
        id: liId
    }
    PENDING_VALUE.push(pending_obj);
    saveToPending();
}

function toDoHandle(event){
    event.preventDefault();
    const toDoValue = toDoInput.value;
    paintToDo(toDoValue);
}

function loadToDos(){
    const pending_toDos = localStorage.getItem(PENDING_LS);
    const finishing_toDos = localStorage.getItem(FINISHED_LS);
    if(pending_toDos !== null){
        const parsePending = JSON.parse(pending_toDos);
        parsePending.forEach(function(pendingToDo){
            paintToDo(pendingToDo.text);
        });
    }

    if(finishing_toDos !== null){
        const parseFinishing = JSON.parse(finishing_toDos);
        parseFinishing.forEach(function(finishingToDo){
            showFinishing(finishingToDo.text);
        })
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", toDoHandle);
}

init();