console.log("Im working..");
document.getElementById("drp1").onclick = function(){
    document.getElementById("drpList").classList.toggle("show");
}

function navFun(event){
    event.stopPropagation();
    // console.log(event.target);
    document.getElementById(event.target.id).classList.toggle("tskToggle");
}

let myTaskObj = [
    {
        "taskId":1,
        "taskName":"BugStory",
        "status": "ToDo",
        "priority":"High"
    },
    {
        "taskId":2,
        "taskName":"TestingStory",
        "status": "ToDo",
        "priority":"High"
    },
    {
        "taskId":3,
        "taskName":"DeploymentStory",
        "status": "InProgress",
        "priority":"Medium"
    },
    {
        "taskId":4,
        "taskName":"PipelineStory",
        "status": "Completed",
        "priority":"High"
    },
    {
        "taskId":5,
        "taskName":"BugStory",
        "status": "ToDo",
        "priority":"Low"
    }
];

function updateTasks(){
    for(let tsk of myTaskObj){
        appendDiv(tsk);
  }
}
updateTasks();
function appendDiv(singleTask){
    let mainDiv = document.getElementById(singleTask.status);
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", singleTask.taskId);
    newDiv.setAttribute("class", "taskRow");
    newDiv.setAttribute("draggable", true);
    newDiv.setAttribute("ondblclick", "openDes(event)");
    let content = `${singleTask.taskId} ${singleTask.taskName} Status: ${singleTask.status}`;
    
    if(singleTask.priority === "High")
         content += "<br><p style='color:red'><b>***</b></p>";
    else if(singleTask.priority === "Low")
         content += "<br><p style='color:green'><b>***</b></p>";
    else
        content += "<br><p style='color:blue'><b>***</b></p>";
    newDiv.innerHTML = content;
    mainDiv.appendChild(newDiv);
}

function updateListener(){
    let taskDiv = document.getElementsByClassName("taskRow");
let placeHolderDiv = document.getElementsByClassName("childBox");
for(let tDiv of taskDiv){ 
    tDiv.addEventListener('dragstart', function(e){
        selectedTask = e.target;
        //console.log(selectedTask);
        console.log("Entered drag start");
        setTimeout(()=>{
            e.target.className = "hide";
            // console.log("added hide");
        },0);
    },);

    tDiv.addEventListener('dragend', function(e){
        console.log("Entered drag end");
        e.target.className = "taskRow";
        changeStat();
    });
}
for(let pDiv of placeHolderDiv){
    pDiv.addEventListener("dragover", (e)=>{
        
        console.log("Entered drag over");
        //console.log(e.target);
        e.preventDefault();
    });

    pDiv.addEventListener("dragenter", (e)=>{

    });

    pDiv.addEventListener("dragleave", (e)=>{

    });

    pDiv.addEventListener("drop", (e)=>{
        console.log("Entered drag drop");
        selectedPlaceHolder = e.target;
        e.target.append(selectedTask);
    });
}
}
updateListener();

let selectedTask, selectedPlaceHolder, level=6;

function addTsk(event){
    event.stopPropagation();
    let tskName = document.getElementById("addTaskName").value;
    let tskPriority = document.getElementsByName("selectP");
    let tskprior;
    for(let p of tskPriority){
        if(p.checked === true){
            tskprior = p.value;
            tskPriority = p;
            break;
        }
    }
    if(tskName === "" || tskPriority === "") return;
    myTaskObj.push({"taskId": level, "taskName": tskName, "status": "ToDo", "priority":tskprior});
    level++;
    console.log(myTaskObj);
    clearDiv();
    updateTasks();
    updateListener();
    document.getElementById("addTaskName").value = " ";
    tskPriority.checked = false;
}

function clearDiv(){
    document.getElementById("ToDo").innerHTML = '';
    document.getElementById("InProgress").innerHTML = '';
    document.getElementById("Completed").innerHTML = '';
}

function changeStat(){
    for(let singleTask of myTaskObj){
        if(singleTask.taskId.toString() === selectedTask.id){
            singleTask.status = selectedPlaceHolder.id;
            break;
        }
    }
    clearDiv();
    updateTasks();
   // updateListener();
}

function editTask(e){
  e.stopPropagation();  
  let tsId = document.getElementById("eTskId").value;
  let tsDes = document.getElementById("eTskDes").value;
  let tsP = document.getElementById("eTskPrior").value;
  console.log(tsId, tsDes, tsP);
  if(tsId === "" || tsId === "missing"){
    document.getElementById("eTskId").value = "missing";
    return;
  }
  for(let singleTask of myTaskObj){
      if(singleTask.taskId.toString() === tsId){
        if(tsDes !== "")
            singleTask.taskName = tsDes;
        if(tsP !== "")
            singleTask.priority = tsP;
        break;
      }
  }
  clearDiv();
  updateTasks();
  updateListener();
  document.getElementById("eTskId").value="";
  document.getElementById("eTskDes").value="";
  document.getElementById("eTskPrior").value="";
}

function deleteTask(){
    let delId = document.getElementById("delTskId").value;
    if(delId === "") return;
    for(let i=0; i< myTaskObj.length;i++){
        if(delId === myTaskObj[i].taskId.toString()){
            if(confirm("Do you want to delete task :"+delId)){
                myTaskObj.splice(i,i+1);
            }
            else{

            }
            break;
        }
    }
    clearDiv();
    updateTasks();
    updateListener();
    document.getElementById("delTskId").value="";
}

function openDes(e){
    e.stopPropagation();
    let desBoxDiv = document.getElementById("desBoxId");
    document.createElement("div");
}