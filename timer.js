const initBtn = document.querySelector('.buttonMain');
const resetBtn = document.querySelector('.buttonReset');
const timerOutput = document.querySelector('.stoperTime');

let now = JSON.parse(localStorage.getItem("time")) || 0;
let records = JSON.parse(localStorage.getItem("records")) || [];
let i = (JSON.parse(localStorage.getItem("i")) + 1) || 1;
let active = false;
let intervalId;

const initTimer = () => {
  if (!active) {
    active = !active;
    initBtn.textContent = 'PAUSE';
    intervalId = setInterval(startTimer, 1000);
  } else {
    active = !active;
    initBtn.textContent = 'START';
    clearInterval(intervalId);
  };
};

let newRecord = "";

const startTimer = () => {
  var time = now;
  var hours = Math.floor(time / 3600);
  time -= hours * 3600;
  var mins = Math.floor(time / 60);
  time -= mins * 60;
  var secs = time;

  // Update the display timer
  if (hours < 10) {
    hours = +hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }
  timerOutput.innerHTML = hours + "." + mins + "." + secs;

  newRecord = timerOutput.textContent;
  localStorage.setItem("time", JSON.stringify(now));
  now++;
};

function resetTimer(e) {
  now = 0;
  active = false;
  initBtn.textContent = 'START';
  timerOutput.textContent = '0.00.00';
  clearInterval(intervalId);
  localStorage.removeItem("time")
  localStorage.setItem("i", JSON.stringify(i));

  if (!newRecord) return;
  record = document.createElement('div');
  record.innerHTML = `<li> Measurement ${i} is equal to <strong>${newRecord}</strong></li>`;
  ul.appendChild(record);
  newRecord = "";
  i++;
  records.push(record.innerHTML);
  updateRecords(records, ul);
};

function updateRecords(records = [], ul) {
  ul.innerHTML = records.map((record) => {
    console.log(record);
    return record;
  }).join('');
  localStorage.setItem("records", JSON.stringify(records));
};

initBtn.addEventListener('click', initTimer);
resetBtn.addEventListener('click', resetTimer);

startTimer();

window.addEventListener('load', ()=>{
  const form= document.querySelector("#task-form");
  const input= document.querySelector("#task-input");
  const list= document.querySelector("#tasks");


  form.addEventListener('submit', (e)=>{
      e.preventDefault();

      const task = input.value;
      if (!task) {
          return;
      } 

      const task_div = document.createElement("div");
      task_div.classList.add("task");
      list.appendChild(task_div);


      const task_content_div = document.createElement("div");
      task_content_div.classList.add("content");
      task_div.appendChild(task_content_div);
 

      const task_input= document.createElement("input");
      task_input.classList.add("text");
      task_input.type = "text";
      task_input.value= task;
      task_input.setAttribute("readonly", "readonly");
      task_content_div.appendChild(task_input);


      const task_actions_div= document.createElement("div");
      task_actions_div.classList.add("actions");
      task_div.appendChild(task_actions_div);


      const task_edit_botton= document.createElement("button");
      task_edit_botton.classList.add("Edit");
      task_edit_botton.innerHTML = "Edit";

      const task_delete_button= document.createElement("button");
      task_delete_button.classList.add("Delete");
      task_delete_button.innerHTML = "Delete";

      const task_completed_button= document.createElement("button");
      task_completed_button.classList.add("Completed");
      task_completed_button.innerHTML = "Completed";

      task_actions_div.appendChild(task_edit_botton);
      task_actions_div.appendChild(task_completed_button);
      task_actions_div.appendChild(task_delete_button);
      

      task_edit_botton.addEventListener('click', ()=>{
          
          if (task_edit_botton.innerText.toLowerCase() =="edit") {
                  task_input.removeAttribute("readonly");
                  task_input.focus();
                  task_edit_botton.innerText = "Save";
                  task_input.style.textDecoration="none"
          }else{
              task_input.setAttribute("readonly", "readonly");
              task_edit_botton.innerText ="Edit";
              
          }
        
      });

      task_delete_button.addEventListener('click', ()=>{
          if (confirm("Are you sure you want to delete this task?")) {
              list.removeChild(task_div);
              

          }
      })
      
      task_completed_button.addEventListener('click', ()=>{
          
              task_input.style.textDecoration="line-through";
              task_input.setAttribute("readonly", "readonly");
             
      })

 
      input.value = "";


  });
});
