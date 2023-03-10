// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  let today = dayjs();
  let timeBlockID;
  let timeBlockIDClicked;
  let newEvent;
  let textAreaValue;
  let storageEvents;
  let timeBlockDataAttr; 
  let keyStorage;

 
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(today.format('dddd, MMMM Do'));


  // TODO: Add a listener for click events on the save button.
  $(".saveBtn").click(function (event) {
   
  // This code should use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
    // User adds event
    timeBlockIDClicked = parseInt($(this).parent().attr("data-time"));
    console.log(timeBlockIDClicked);
    textAreaValue = $(this).siblings(".description").val();
    console.log(textAreaValue);
  
    // // Variable made to determine local storage projects 
      storageEvents = readEventsFromStorage(); 
   
    // Need to call save function to activate it
      saveEventtoStorage();
    
    // Save clicked TimeBlock ID to localStorage.
    function saveEventtoStorage() {
      localStorage.setItem(timeBlockIDClicked, textAreaValue);
      }

    });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function colorTimeBlock() {

    let currentHour = parseInt(today.format('HH'));

    $(".time-block").each(function () {
      // get Id attribute of color block to know what time the color block is
      timeBlockID = parseInt($(this).attr("data-time"));
      
      // current hour class should be changed to "present"
      if (timeBlockID === currentHour) {
        $(this).addClass("present");
        $(this).removeClass("past");
        $(this).removeClass("future");
      }

      // past hour class should be changed to "past"
      else if (timeBlockID < currentHour) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      }

      // future hour class should be changed to "future"
      else {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");
      };
    });
  }
  colorTimeBlock();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  

 //read Events function
 function readEventsFromStorage() {

    $(".time-block").each(function () {

      timeBlockDataAttr = parseInt($(this).attr("data-time"));
      
      keyStorage = localStorage.getItem(timeBlockDataAttr);

      // Find child element and set to what data was in storage
      $(this).children(".description").val(keyStorage); 

      })
     
  }
  readEventsFromStorage();
 
});