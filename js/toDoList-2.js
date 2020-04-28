const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".pendingJs"),
    finishedList = document.querySelector(".finishingJs");

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


function deleteHandle(event){
    const btnTarget = event.target;
    const btnParent = btnTarget.parentNode;
    const targetList = btnParent.parentNode;

    if(targetList.id === pendingList.id){
        targetList.removeChild(btnParent);
        const cleanTodos = PENDING_VALUE.filter(function(toDo){
            return parseInt(btnParent.id) !== toDo.id;
        })
        PENDING_VALUE = cleanTodos;
        saveToPending();
    } 
    
    else{
        targetList.removeChild(btnParent);
        const cleanTodos = FINISHED_VALUE.filter(function(toDo){
            return parseInt(btnParent.id) !== toDo.id;
        })
        FINISHED_VALUE = cleanTodos;
        saveToFinishing();
    }

    
};

function sendHandle(){
    const btn = this;
    const btnTarget = btn.parentNode;
    const targetList = btnTarget.parentNode;
    const text = btnTarget.firstChild.innerText;

    if(targetList.id === pendingList.id){
        const idx = PENDING_VALUE.findIndex(function(item){
            return parseInt(btnTarget.id) === item.id;
        })
        if (idx > -1){
            PENDING_VALUE.splice(idx, parseInt(btnTarget.id))
        }

        const liId = FINISHED_VALUE.length + 1;
        btnTarget.id = liId;
        btn.innerText = "⬆️";
        finishedList.appendChild(btnTarget);

        finish_obj = {
            text,
            id: liId
        }

        FINISHED_VALUE.push(finish_obj);

    } else{

        const idx = FINISHED_VALUE.findIndex(function(item){
            return parseInt(btnTarget.id) === item.id;
        })
        if (idx > -1){
            FINISHED_VALUE.splice(idx, parseInt(btnTarget.id))
        }

        const liId = PENDING_VALUE.length + 1;
        btnTarget.id = liId;
        btn.innerText = "✅";
        pendingList.appendChild(btnTarget);

        const pending_obj = {
            text,
            id: liId
        }

        PENDING_VALUE.push(pending_obj);
    }
    saveToFinishing();
    saveToPending();
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    const btn2 = document.createElement("button");

    const liId = PENDING_VALUE.length + 1;
    btn.innerText="❌";
    btn.addEventListener("click", deleteHandle);
    btn2.innerText="✅";
    btn2.addEventListener("click", sendHandle);
    li.id = liId;
    span.innerText=text;
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

function paintToFinishing(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    const btn2 = document.createElement("button");

    const liId = FINISHED_VALUE.length + 1;
    
    span.innerText=text;
    btn.innerText="❌";

    btn.addEventListener("click", deleteHandle);
    btn2.innerText = "⬆️";
    btn2.addEventListener("click", sendHandle);
    li.id = liId;
    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(btn2);
    finishedList.appendChild(li);
    const finish_obj = {
        text: text,
        id: liId
    }
    FINISHED_VALUE.push(finish_obj);
    saveToFinishing();
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
            paintToFinishing(finishingToDo.text);
        })
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", toDoHandle);
}

init();