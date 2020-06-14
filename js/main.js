// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// ---------------------------------DECLARATIONS--------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------


var interval = 0;
var audioDone = new Audio('Sounds/Done.mp3');
var view = "task";
var categoryNumber = 0;
var count = 0;
var backgroundNumber = Math.floor(Math.random() * 27);
var strBackgroundImage = "url('img/bgd" + backgroundNumber + ".jpg')";

// Modal stuff:
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
var submit = document.getElementById("submit");
var userShownCategory;
var selectedCategoryName;




// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// --------------------------------INITIALIZATION-------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------

  // Initializes the categories array to store names of categories of tasks
  if (JSON.parse(localStorage.getItem("categories")) == null || JSON.parse(localStorage.getItem("categories")) == []) {
    var categories = [];
    categories[0] = "main";
    localStorage.setItem("categories", JSON.stringify(categories));
  } else {
    var categories = JSON.parse(localStorage.getItem("categories"));
  }

  // Create value array
  //If there is storage, set LSArray equal to it, if not, initialize it
  if (JSON.parse(localStorage.getItem("tasks")) == null || JSON.parse(localStorage.getItem("tasks")) == [] || JSON.parse(localStorage.getItem("tasks")) == [[]]) {
    var LSArray = [[]];
    localStorage.setItem("tasks", JSON.stringify(LSArray));
  } else {
    var LSArray = JSON.parse(localStorage.getItem("tasks"));
  }

  //Sets background
  document.body.style.backgroundImage = strBackgroundImage;

  if (LSArray[categoryNumber].length !== 0) {
  populateTaskPane(LSArray[categoryNumber]);
  // Set a cookie equal to data from the start of the session in case of accidental deletion
  localStorage.setItem("safekeeping", JSON.stringify(LSArray));
  }




// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// ------------------------------TASK_MANIPULATION------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------


// Populates the task pane given an array (the array is a dimension of LSArray)
function populateTaskPane(populateArray) {
  unloadTasks();
  count = 0;

  for (count; count < populateArray.length; count++) { //for 0, 0 to array length (10 or something), increment by 1
    var tempArray = populateArray[count]; //get first set of 4 values to create a task
    var taskTitle = tempArray[0];
    var prefCompletion = tempArray[1];
    var deadline = tempArray[2];
    var notes = tempArray[3];
    createTask(taskTitle, prefCompletion, deadline, notes);

  }
}

// Creates a task box given an input and saves it to local storage
function createTask(taskTitle, prefCompletion, deadline, notes) {

  var hideScrollDiv = document.createElement("div");
  hideScrollDiv.className = "hideScrollDiv";

  var newDiv = document.createElement("div");
  newDiv.className = "ui-widget-content task ui-draggable ui-draggable-handle";
  newDiv.style = "position:relative;";
  newDiv.id = "task" + count;

  var deleteTask = document.createElement("h6");
  deleteTask.className = "deleteTask";
  deleteTask.innerHTML = "_";
  //deleteTask.align = "right";
  newDiv.appendChild(deleteTask);
  deleteTask.id = "deleteTask" + count;

  var finishTask = document.createElement("h6")
  finishTask.className = "finishTask";
  finishTask.innerHTML = "O"
  newDiv.appendChild(finishTask);
  finishTask.id = "finishTask" + count;

  var newTaskTitle = document.createElement("h1")
  newTaskTitle.className = "bracket"
  newTaskTitle.innerHTML = taskTitle;
  newDiv.appendChild(newTaskTitle);
  taskpane.appendChild(newDiv);
  newTaskTitle.id = "taskTitle" + count;

  var taskPreferredCompletion = document.createElement("h4")
  taskPreferredCompletion.innerHTML = "Preferred completion date";
  newDiv.appendChild(taskPreferredCompletion);
  taskpane.appendChild(newDiv);
  taskPreferredCompletion.id = "taskPrefTitle" + count;

  var newTaskPref = document.createElement("p")
  newTaskPref.innerHTML = prefCompletion;
  newDiv.appendChild(newTaskPref);
  taskpane.appendChild(newDiv);
  newTaskPref.id = "taskPrefDate" + count;

  var taskDeadline = document.createElement("h4")
  taskDeadline.innerHTML = "Deadline";
  newDiv.appendChild(taskDeadline);
  taskpane.appendChild(newDiv);
  taskDeadline.id = "taskDeadTitle" + count;

  var newTaskDeadline = document.createElement("p")
  newTaskDeadline.innerHTML = deadline;
  newDiv.appendChild(newTaskDeadline);
  hideScrollDiv.appendChild(newDiv);
  taskpane.appendChild(hideScrollDiv);
  newTaskDeadline.id = "taskDeadDate" + count;
  var lineBreak = document.createElement("br");
  var lineBreak2 = document.createElement("br");
  newDiv.appendChild(lineBreak);
  newDiv.appendChild(lineBreak2);

  var taskNotes = document.createElement("h4")
  taskNotes.innerHTML = "Notes";
  newDiv.appendChild(taskNotes);
  taskpane.appendChild(newDiv);
  taskNotes.id = "taskNotes" + count;
  taskNotes.style = 'font-style:italic;color:#eaeaea';

  var hideScrollDivNotes = document.createElement("div");
  hideScrollDivNotes.className = "hideScrollDivNotes";
  hideScrollDivNotes.style = "border-style:border-box;border-color:rgba(255, 255, 255, 0.15);border-width:3px;background-image: -webkit-gradient(linear, left-bottom, left-top, color-stop(0.33, rgb(14,173,173)), color-stop(0.67, rgb(0,255,255))); background-image: -moz-linear-gradient(center bottom, rgb(14,173,173) 33%, rgb(0,255,255) 67% );";

  var newTaskNotes = document.createElement("textarea")
  newTaskNotes.id = "newTaskNotes" + count;
  newTaskNotes.className = "newTaskNotes";
  newTaskNotes.value = notes;

  hideScrollDivNotes.appendChild(newTaskNotes);
  newDiv.appendChild(hideScrollDivNotes);
  hideScrollDiv.appendChild(newDiv);
  taskpane.appendChild(hideScrollDiv);

  newTaskNotes.style = "spellcheck='false';text-shadow: 1px 1px black;color:#dbdbdb;"
  newTaskNotes.textarea = "rows='100'cols='40'";
  //delete if no apparent use: localStorage.setItem(newDiv, newDiv);

  var savedDataTemp = [];
  savedDataTemp[0] = taskTitle;
  savedDataTemp[1] = prefCompletion;
  savedDataTemp[2] = deadline;
  savedDataTemp[3] = notes;
  LSArray[categoryNumber][count] = savedDataTemp;
  savedDataTemp = null;
  //this will eventually be the original array from the start that gets added to, need to set j to # of items in OG array
  //j has to be updated so that it includes earlier entries,
  //so if there are 5 entries j has to be set to j=4 from outside
  //for i = 0 to savedData.


  //each time submit is hit, tasks in the local storage should be updated to tasks +
  //one more item
  localStorage.setItem("tasks", JSON.stringify(LSArray));
}




// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// -----------------------------------TERMINAL----------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------


$('#consoleid').keypress(throttle(function() {
  var str = document.getElementById("consoleid").value
  var pattern1 = /-del$/g;
  var pattern2 = /-back$/g;
  var pattern3 = /-roll$/g;
  var pattern4 = /-timer$/g;
  var pattern5 = /-title$/g;
  var pattern6 = /-pref$/g;
  var pattern7 = /-dead$/g;
  var pattern8 = /-note$/g;
  var pattern9 = /\+\+$/g;
  var pattern10 = /--$/g;
  var pattern11 = /->$/g;
  var pattern12 = /-cats$/g;
  var pattern13 = /-export$/g;
  var pattern14 = /-puzzle$/g;

  //if 'del', delete the selected task
  if (str.match(pattern1)) {
    var consoleValue = document.getElementById("consoleid").value;
    var taskNumber = consoleValue.split('-')[0] - 1;

    if (taskNumber < count && taskNumber >= 0) {
      LSArray[categoryNumber] = deleteRow(LSArray[categoryNumber], taskNumber);
      localStorage.setItem("tasks", JSON.stringify(LSArray));
      document.getElementById("consoleid").value = "";
      var taskNumberPlusTask = "task" + taskNumber;
      $("#" + taskNumberPlusTask).parent().parent().empty();
      populateTaskPane(LSArray[categoryNumber]);
      document.getElementById("consoleid").placeholder = "Done";
      successfulAction();
    } else {
      document.getElementById("consoleid").placeholder = "Can't do that.";
      document.getElementById("consoleid").value = "";
      failedAction();
    }
  }

  //if 'back', change the background as specified
  if (str.match(pattern2)) {

    var imageNumber = str.replace("-back", "");
    imageNumber = imageNumber.replace(/\s/g, '');
    var strBackgroundImage = "url('img/bgd" + imageNumber + ".jpg')";
    document.getElementById("consoleid").value = "";
    if (imageNumber <= 26 && imageNumber >= 0) {
      document.body.style.backgroundImage = strBackgroundImage;
      document.getElementById("consoleid").placeholder = "Done";
      successfulAction();
    } else {
      document.getElementById("consoleid").placeholder = "No such background.";
      failedAction();
    }


  }
  //If 'roll', set a random background
  if (str.match(pattern3)) {
    var backgroundNumber = Math.floor(Math.random() * 27);
    var strBackgroundImage = "url('img/bgd" + backgroundNumber + ".jpg')";
    document.body.style.backgroundImage = strBackgroundImage;
    document.getElementById("consoleid").value = "";
    document.getElementById("consoleid").placeholder = "Done";
    successfulAction();
    }

    //If '-timer', create a timer
  if (str.match(pattern4)) {
    if (totalTime > 0) {
      totalTime = 0;
    }
    audioDone.loop = false;
    audioDone.pause();
    audioDone.currentTime = 0;
    clearInterval(interval);
    var sortingDays1 = 0;
    var sortingHours1 = 0;
    var sortingMinutes1 = 0;
    var sortingSeconds1 = 0;
    var days1 = 0;
    var hours1 = 0;
    var minutes1 = 0;
    var seconds1 = 0;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    //Lay out pattern for what we want to extract (1d, 2h, 3m, 12s)
    var regexDays = /[0-9]+d/;
    var regexHours = /[0-9]+h/;
    var regexMinutes = /[0-9]+m/;
    var regexSeconds = /[0-9]+s/;
    var displayDays = 0;
    var totalTime = 0;


    //Put these values into variables
    var sortingDays1 = str.match(regexDays) //find number before d
    var sortingHours1 = str.match(regexHours) //find number before h
    var sortingMinutes1 = str.match(regexMinutes) //find number before m
    var sortingSeconds1 = str.match(regexSeconds) //find number before s

    if (sortingDays1 == null) {
      var sortingDays1 = "0d";
    }
    if (sortingHours1 == null) {
      var sortingHours1 = "0h";
    }
    if (sortingMinutes1 == null) {
      var sortingMinutes1 = "0m";
    }
    if (sortingSeconds1 == null) {
      var sortingSeconds1 = "0s";
    }

    //Remove the 'd', 'h', 'm', 's'
    var days1 = sortingDays1[0]
    var days = days1.substring(0, days1.length - 1);
    if (days == null) {
      days = 0;
    }

    var hours1 = sortingHours1[0]
    var hours = hours1.substring(0, hours1.length - 1);
    if (hours == null) {
      hours = 0;
    }

    var minutes1 = sortingMinutes1[0]
    var minutes = minutes1.substring(0, minutes1.length - 1);
    if (minutes == null) {
      minutes = 0;
    }

    var seconds1 = sortingSeconds1[0]
    var seconds = seconds1.substring(0, seconds1.length - 1);
    if (seconds == null) {
      seconds = 0;
    }


    //totalTime holds the total amount of milliseconds
    totalTime = (days * 24 * 60 * 60 * 1000);
    totalTime += (hours * 60 * 60 * 1000);
    totalTime += (minutes * 60 * 1000);
    totalTime += (seconds * 1000);

    // Update the count down every 1 second
    interval = setInterval(function() {
    //Subtract 1000 milliseconds and make it display as days, hours, minutes, seconds
      var displayDays = Math.floor(totalTime / (1000 * 60 * 60 * 24));
      var displayHours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var displayMinutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      var displaySeconds = Math.floor((totalTime % (1000 * 60)) / 1000);

      totalTime = totalTime - 50;

      // Display the result in the element with id="demo"
      if (displayDays > 0) {
        document.getElementById("flowTitle").innerHTML = displayDays + 'd  ' + displayHours + 'h  ' + displayMinutes + 'm  ' + displaySeconds + 's  ';
        document.getElementById("flowTitle").style = "width: 320px;"

      } else if (displayHours > 0) {
        document.getElementById("flowTitle").innerHTML = displayHours + 'h  ' + displayMinutes + 'm  ' + displaySeconds + 's  ';
        document.getElementById("flowTitle").style = "width: 250px;"


      } else if (displayMinutes > 0) {
        document.getElementById("flowTitle").innerHTML = displayMinutes + 'm  ' + displaySeconds + 's  ';
        document.getElementById("flowTitle").style = "width: 180px;"


      } else {
        document.getElementById("flowTitle").innerHTML = displaySeconds + 's  ';
        document.getElementById("flowTitle").style = "width: 100px;"
      }

      // If the countdown is finished, write some text
      if (totalTime <= 0) {
        clearInterval(interval);
        timerDone();

      }
    }, 50);

    function timerDone() {
      document.getElementById("flowTitle").innerHTML = "Done!";
      document.getElementById("flowTitle").fadeToggle;
      document.getElementById("flowTitle").style = "width:200px;";
      audioDone.loop = true;
      audioDone.play();
    }

    successfulAction();
    document.getElementById("consoleid").value = "";

  }

  // If any of the parts of a task, change the task
  if (str.match(pattern5) || str.match(pattern6) || str.match(pattern7) || str.match(pattern8)) {
    //4 things - title, pref date, deadline, Notes
      var findTask = str.charAt(0) - 1;
      if (LSArray[categoryNumber][findTask] == null) { // If there's no task for the given number, don't complete the action
        document.getElementById("consoleid").placeholder = "That's gonna be a yikes from me dawg";
        document.getElementById("consoleid").value = "";
        failedAction();


      } else {
        var content = str.split(/"/)[1];
        var taskItem = -1;

        if (str.match(pattern5)) {
          taskItem = 0;
        }
        if (str.match(pattern6)) {
          taskItem = 1;
        }
        if (str.match(pattern7)) {
          taskItem = 2;
        }
        if (str.match(pattern8)) {
          taskItem = 3;
        }



        LSArray[categoryNumber][findTask][taskItem] = content;
        localStorage.setItem("tasks", JSON.stringify(LSArray));
        populateTaskPane(LSArray[categoryNumber]);
        document.getElementById("consoleid").value = "";
        document.getElementById("consoleid").placeholder = "Done";
        successfulAction();
      }




  }

  //If ++, create a category
  if (str.match(pattern9)) {
    selectedCategoryName  = str.replace("++","");
    selectedCategoryName.toLowerCase();
    var tempArrayForLoop = JSON.parse(localStorage.getItem("categories"));
    //Check if category already exists
    if (tempArrayForLoop.includes(selectedCategoryName)) {
      document.getElementById("consoleid").placeholder = "That category already exists!";
      document.getElementById("consoleid").value = "";
    } else {
    categoryNumber = LSArray.length;
    var tempNewArray = [];
    LSArray[categoryNumber] = tempNewArray;
    localStorage.setItem("tasks", JSON.stringify(LSArray));
    populateTaskPane(LSArray[categoryNumber]);
    document.getElementById("consoleid").placeholder = "Done: Category " + categoryNumber + " created.";
    document.getElementById("consoleid").value = "";
    categories[categoryNumber] = selectedCategoryName;
    localStorage.setItem("categories", JSON.stringify(categories));
    category = categoryNumber;
    }

  }

  //if --, delete a category
  if (str.match(pattern10)) {
    selectedCategoryName  = str.replace("--","");
    selectedCategoryName.toLowerCase();
    var tempArrayForLoopDeletion = JSON.parse(localStorage.getItem("categories"));
    //find out what pattern10 is called, find that value in the categories array,
    //delete that value in categories and delete it in LSArray categories,
    //then return to main if you were in the category or stay in current category if you were in some other one
    //Also, don't allow deletion of main

    if (tempArrayForLoopDeletion.includes(selectedCategoryName)) {
      var deletionRow = tempArrayForLoopDeletion.indexOf(selectedCategoryName);
      tempArrayForLoopDeletion.splice(deletionRow,1);
      localStorage.setItem("categories", JSON.stringify(tempArrayForLoopDeletion));

       LSArray.splice(deletionRow,1);
      localStorage.setItem("tasks", JSON.stringify(LSArray));
      if (categoryNumber == deletionRow) {
        categoryNumber = 0;
        populateTaskPane(LSArray[categoryNumber]);

      }
      userShownCategory = deletionRow + 1
      document.getElementById("consoleid").placeholder = "Done: Category " + deletionRow + " deleted.";
      document.getElementById("consoleid").value = "";
      console.log(LSArray);



      } else  {
      document.getElementById("consoleid").placeholder = "That category doesn't exist!";
      document.getElementById("consoleid").value = "";
    }
  }

  // if (arg)->, go to category.
  if (str.match(pattern11)) {
    selectedCategoryName  = str.replace("->","");
    selectedCategoryName.toLowerCase();
    var tempCategoryArray = JSON.parse(localStorage.getItem("categories"));
    if (tempCategoryArray.includes(selectedCategoryName)) {
      unloadTasks();
      categoryNumber = tempCategoryArray.indexOf(selectedCategoryName);
      populateTaskPane(LSArray[categoryNumber]);

      if (categoryNumber > 0) {
        document.getElementById("consoleid").placeholder = "Done: Category " + categoryNumber + " selected.";
        document.getElementById("consoleid").value = "";
      } else {
        document.getElementById("consoleid").placeholder = "Home.";
        document.getElementById("consoleid").value = "";
      }


      } else {
      document.getElementById("consoleid").placeholder = "That category doesn't exist!";
      document.getElementById("consoleid").value = "";
    }


  }

  // if -cats, set placeholder value of terminal to names of categories.
  if (str.match(pattern12)) {
    document.getElementById("consoleid").placeholder = JSON.parse(localStorage.getItem("categories"));
    document.getElementById("consoleid").value = "";

  }

  if (str.match(pattern13)) {
    x = JSON.parse(localStorage.getItem("tasks"));
    y = JSON.parse(localStorage.getItem("categories"));
    z = x + y;
    var currentDate = new Date();
    downloadTitle = "Flow Local " + currentDate;
    downloadText(downloadTitle, z)
    document.getElementById("consoleid").value = "";
  }

  if (str.match(pattern14)) {
    view = "detail";
    document.getElementById('taskpane').innerHTML = '<iframe src="https://lichess.org/training/frame?theme=brown&bg=dark" style="width: 400px; height: 444px;" allowtransparency="true" frameborder="0"></iframe>';
    document.getElementById("consoleid").value = "";


  }
  
}))






// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// ------------------------------------DISPLAY----------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------


//This function loads the detailed view of a single task
function loadDetailView(taskNumber) {
  var taskInfo = LSArray[categoryNumber][taskNumber];

  var hideScrollDetailDiv = document.createElement("div");
  hideScrollDetailDiv.className = "hideScrollDetailDiv";
  $(".task-pane").append(hideScrollDetailDiv);

  var taskName = localStorage.getItem("tasks");

  var detailDiv = document.createElement("div");
  detailDiv.className = "detail-div";
  detailDiv.id = "detailDiv" + taskNumber;
  $(".hideScrollDetailDiv").append(detailDiv);

  var taskName = document.createElement("h1");
  taskName.className = "detail-task-name";
  taskName.innerHTML = taskInfo[0];
  taskName.id = "detailTaskName";
  $(".detail-div").append(taskName);


  var hideScrollDetailDivNotes = document.createElement("div");
  hideScrollDetailDivNotes.className = "hideScrollDetailDivNotes";
  hideScrollDetailDivNotes.style = "border-style:border-box;border-color:rgba(255, 255, 255, 0.15);border-width:3px;background-image: -webkit-gradient(linear, left-bottom, left-top, color-stop(0.33, rgb(14,173,173)), color-stop(0.67, rgb(0,255,255))); background-image: -moz-linear-gradient(center bottom, rgb(14,173,173) 33%, rgb(0,255,255) 67% );";

  var detailNotes = document.createElement("textarea");
  detailNotes.className = "detail-notes";
  detailNotes.value = taskInfo[3];
  detailNotes.id = "detailTaskNotes" + taskNumber;
  detailNotes.style = "background-image: -webkit-gradient(linear, left-bottom, left-top, color-stop(0.33, rgb(14,173,173)), color-stop(0.67, rgb(0,255,255))); background-image: -moz-linear-gradient(center bottom, rgb(14,173,173) 33%, rgb(0,255,255) 67% );";
  hideScrollDetailDivNotes.append(detailNotes);
  $(".detail-div").append(hideScrollDetailDivNotes);

  document.getElementById("myBtn").style="display:none;";


  var saveButton = document.createElement("button");
  saveButton.innerHTML = '<img src="img/save.png"';
  saveButton.id = "saveButton";
  saveButton.href="";
  $(".detail-div").append(saveButton);


    $('.task-pane').fadeIn("fast");


  // document.getElementById("deleteLocal").style="display:none;";
}



function unloadTasks() {
  //Unloads all tasks from the display pane, doesn't delete them from storage
  var taskPaneDelete = document.getElementById("taskpane");
  while (taskPaneDelete.firstChild) {
    taskPaneDelete.removeChild(taskPaneDelete.firstChild);
  }
}




// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// ----------------------------------LISTENERS----------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------


$(document).on('click', "h6[id*='deleteTask']", function() {

  var taskNumber = $(this).attr('id').slice(10);
  LSArray[categoryNumber] = deleteRow(LSArray[categoryNumber], taskNumber);
  localStorage.setItem("tasks", JSON.stringify(LSArray));
  var taskNumberPlusTask = "task" + taskNumber;
  $("#" + taskNumberPlusTask).parent().parent().empty();
  populateTaskPane(LSArray[categoryNumber]);
  document.getElementById("consoleid").placeholder = "Done";
});

$(document).on('click', "h6[id*='finishTask']", function() {

  var taskNumber = $(this).attr('id').slice(10);
  LSArray[categoryNumber] = deleteRow(LSArray[categoryNumber], taskNumber);
  localStorage.setItem("tasks", JSON.stringify(LSArray));
  var taskNumberPlusTask = "task" + taskNumber;
  $("#" + taskNumberPlusTask).parent().parent().empty();
  populateTaskPane(LSArray[categoryNumber]);
  document.getElementById("consoleid").placeholder = "Done";
});

//When the user clicks on the task creation button, open modal
btn.onclick = function() {
  modal.style.display = "block";
  document.getElementById("taskTitle").focus();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// When the user hits submit, this function creates a task
submit.onclick = function() {
  modal.style.display = "none";
  //fix this eventually, clears input values on submit
  $(this).closest('form').find("input[type=text], textarea").val("");
  //set tasktitle = user-given value
  var taskTitle = document.getElementById("taskTitle").value;
  if (taskTitle === ""){
  taskTitle = "Unknown";
  }
  //set prefCompletion = user-given value
  var prefCompletion = document.getElementById("prefCompletion").value;
  if (prefCompletion === ""){
  prefCompletion = "Unknown";
  }
  //set deadline = user-given value
  var deadline = document.getElementById("deadline").value;
  if (deadline === ""){
  deadline = "Unknown";
  }

  var notes = document.getElementById("notes").value;

  //Create the task given user values
  createTask(taskTitle,prefCompletion,deadline,notes)
  count++;

  document.getElementById("taskTitle").value = null;
  document.getElementById("prefCompletion").value = null;
  document.getElementById("deadline").value = null;
  document.getElementById("notes").value = null;
}

document.getElementById('consoleid').onclick = function() {
  $("#consoleid").css('box-shadow', 'inset 2px 2px 50px rgba(0,0,220,.3)');
  document.getElementById("consoleid").placeholder = "";
}

document.onclick = function() {
  $("#consoleid").css('box-shadow', 'inset 2px 2px 50px rgba(0,0,0,0)');
}

//This function sends the user to the detail display
$(document).on('click', "h1[class='bracket']", function() {
  console.log(this);
  var taskNumber = $(this).attr('id').slice(9);
  unloadTasks();
  loadDetailView(taskNumber);
  $('.task-pane').css("width", "99.69%");
  $('.task-pane').css("margin", "0px");
  $('.task-pane').css("height", "84%");

  view = "detail";
})

// This function returns the user to the main task pane
$(document).on('click', ".detail-task-name", function() {
  unloadTasks();
  populateTaskPane(LSArray[categoryNumber]);
  document.getElementById("myBtn").style="display:inline-block;";
  // document.getElementById("deleteLocal").style="display:inline-block;";

  view = "task";
  $('.task-pane').css("width", "80%");
  $('.task-pane').css("margin", "auto");
  $('.task-pane').css("height", "79%");

  $('.task-pane').fadeIn();

})

// This function cancels the timer, or switches view back to task depending on current view
$(document).on('click', "h2[id='flowTitle']", function() {
  if (document.getElementById("flowTitle").innerHTML == "Done!") {
    document.getElementById("flowTitle").innerHTML = "Flow";
    document.getElementById("flowTitle").style = "font-style:italic;";

    audioDone.loop = false;
    audioDone.pause();
    audioDone.currentTime = 0;
  }
  if (view == "detail") {
    unloadTasks();
    populateTaskPane(LSArray[categoryNumber]);
    view = "task";
    document.getElementById("myBtn").style="display:inline-block;";
    // document.getElementById("deleteLocal").style="display:inline-block;";
    $('.task-pane').css("width", "80%");
    $('.task-pane').css("margin", "auto");
    $('.task-pane').css("height", "79%");

    $('.task-pane').fadeIn();

  }
})

 $(document).on('click', "button[id='saveButton']", function() {
   valueName = document.getElementById("detailTaskName").textContent;
   valueInTextBox = document.getElementsByClassName("detail-notes")[0].value;

   downloadText(valueName, valueInTextBox);
 })

//This function saves changes made to notes
$(document).on("keyup", "textarea", throttle(function() {

  var text = $(this).val();
  var lines = text.split(/\r|\r\n|\n/);

  var currentID = $(this).attr('id')
  var IDPattern = "newTaskNotes"

  if (currentID.includes(IDPattern) === true) {
    var taskNoteNumber = $(this).attr('id').slice(12);
    LSArray[categoryNumber][taskNoteNumber][3] = $(this).val();
    localStorage.setItem("tasks", JSON.stringify(LSArray));
  } else {
    var taskNoteNumber = $(this).attr('id').slice(15);
    LSArray[categoryNumber][taskNoteNumber][3] = $(this).val();
    localStorage.setItem("tasks", JSON.stringify(LSArray));
  }
}))




// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// ---------------------------------CSS_RESPONSE--------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------


//Reactions for successful and failed actions
function successfulAction() {
      $("#consoleid").attr('class', 'consoleSuccess');

  //-webkit-box-shadow: inset 0 1px 3px rgba(0,0,0,.05),0 1px 0 rgba(255,255,255,.075);
  //box-shadow: inset 0 1px 3px rgba(0,0,0,.05),0 1px 0 rgba(255,255,255,.075);
  //$("#consoleid").css('box-shadow', 'inset 2px 2px 50px rgba(0,240,20,.3)');
  //  $("#consoleid").css('animation-name', 'successIn');
  //$("#consoleid").css('animation-duration', '1s');
  //$("#consoleid").css('box-shadow', 'inset 0 1px 3px rgba(0,0,0,.05),0 1px 0 rgba(255,0,0,.5)');
  //$("#consoleid").css('border', '2px solid rgba(76, 125, 68, 0.7)').fadein();
}



function failedAction () {
  $("#consoleid").attr('class', 'consoleFailure');
  //$("#consoleid").css('box-shadow', 'inset 2px 2px 50px rgba(240,0,20,.3)');

  //$("#consoleid").css('animation-name', 'failureIn');p
  //$("#consoleid").css('animation-duration', '1s');
}




// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// ---------------------------------QOL_FUNCTIONS-------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------


// Used by terminal to create a small delay in saves
function throttle(f, delay){
  var timer = null;
    return function(){
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = window.setTimeout(function(){
        f.apply(context, args);
      },
      delay || 20);
    };
}

// Deletes a row from an array
function deleteRow(arr, row) {
  arr = arr.slice(0); // make copy
  arr.splice(row, 1);
  return arr;
}

//This function sets tabs equal to a more reasonable number of spaces
$(document).on("keydown", "textarea", function(e) {
  if(e.keyCode === 9) { // tab was pressed
  // get caret position/selection
  var start = this.selectionStart;
  var end = this.selectionEnd;

  var $this = $(this);
  var value = $this.val();

  // set textarea value to: text before caret + tab + text after caret
  $this.val(value.substring(0, start)
  + "   "
  + value.substring(end));

  // put caret at right position again (add one for the tab)
  this.selectionStart = this.selectionEnd = start + 3;

  // prevent the focus lose
  e.preventDefault();
  }
});







// -----------------------------------------------------------------------------
// ------------------------------=================------------------------------
// -----------------------------------DOWNLOAD----------------------------------
// ------------------------------=================------------------------------
// -----------------------------------------------------------------------------

// This function allows the user to download a task name and description.
function downloadText(name, text) {
  var textToSave = text;
  var textToSaveAsBlob = new Blob([textToSave]);
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
  var fileNameToSaveAs = name + '.txt';

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();
}

// This function destroys the link created by the downloadText function.
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}






// deleteLocal.onclick = function() {
//   localStorage.setItem("tasks", null);
//   LSArray.length = 0;
//
//   document.getElementById('taskpane').innerHTML = "";
//   count = 0;
//
// }
