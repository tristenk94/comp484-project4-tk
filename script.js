//some consts
const resetButton = document.querySelector("#reset");

var map; //defining gloabl map variable
var rectangleSelect; //var to select what area (coords) we are choosing

var questionNumber; //var to know what question we are on, -1 if we do not have a valid question open 
var totalCorrect; //var to keep track of total correct, errors are implied from this number (correct / 5 Questions)

var quiz= []; //specifying array for all the quiz questions
var quizRects = []; //specifying an array to hold all rectangles drawn in our game, they correspond to order of questions based on quiz's indexes

//globals for timer, since they're all shared
var minutes = 0;
var seconds = 0; 
var hundredths = 0;
var timer; //the timer variable

//inner boundary data structure for school
const schoolBoundaryLayer = [
    { lat: 34.235470, lng: -118.533774 }, // nordhoff & darby
    { lat: 34.235736, lng: -118.523169 }, //nordhoff & zelzah
    { lat: 34.250397, lng: -118.523340 }, //lassen & zelzah
    { lat: 34.249993, lng: -118.527305 }, //lassen & lindley
    { lat: 34.24464127, lng: -118.52756464 }, //halstead & lindley
    { lat: 34.24467674, lng: -118.53411198 }, //halstead & darby
  ];


const worldLayer = [ //some random square figure i drew to serve as outerlayer boundary
  { lat: 34.253063, lng: -118.5483027 },
  { lat: 34.233303, lng: -118.5454917 },
  { lat: 34.231697, lng: -118.5192277 },
  { lat: 34.263207, lng: -118.5152477}
];


// Add leading zero to numbers 9 or below (purely for aesthetics):
function checkFormat() //to check this, we need to see if num < 9 AND if the length of the variable is == 1 (eg has to be a single digit, double or triple digits ok)
{
  //console.log("time recieved : "+ minutes + " " + seconds + " " +  hundredths);
   // console.log("l recieved : "+ minutes.length + " " + seconds.length + " " +  hundredths.length);
  
  //convert the numbers to string using temp check variables (solely just in case nothing hapens to the original vars)
  let minCheck = ""+minutes;
  let secCheck = ""+seconds;
  let hundCheck = ""+hundredths;
  
  //since js can do math on string but not string on math, we check if its <= 9 AND then see if the length of the string is a single digit. if it is, add a 0. This way we always preserve the current time!
  if(minCheck <= 9 && minCheck.length < 2) //check if the number value is 9 or less AND if its a single digit
  {
    minutes = "0" + minutes; //append the 0
  }
  
  if(seconds <= 9 && secCheck.length < 2)//check if the number value is 9 or less AND if its a single digit
  {
    seconds = "0" + seconds;//append the 0
  }
  else
  
  if(hundredths <= 9 && hundCheck.length < 2)//check if the number value is 9 or less AND if its a single digit
  {
    hundredths = "0" + hundredths;//append the 0
  }

   // console.log("time output : "+ minutes + " " + seconds + " " +  hundredths);
}

// Run a standard minute/second/hundredths timer
function timeClock()
{
  // if(timer != null) //check top stop timer if its null
  //   {
      hundredths++; //start at hundreths
      if(hundredths > 60) 
      {//wraps around, inc next level
        hundredths = 0;
        seconds++;
        if(seconds > 60) //then at seconds
          {//wraps around, inc next level
            seconds = 0;
            minutes++;
            if(minutes > 60) //if this is incremented, why (overflow protection)
              {//wraps around, but why did you wait 60 minutes?
                minutes = 0;
                console.log("Are you still there??")
              }
          }
        }
  
    //}
  checkFormat(); //check and adjust format at end of timer loop
  
  //after adjusting format, display it
  document.getElementById("timer").innerHTML = minutes + ":" + seconds + ":" + hundredths; 
}

//the intialization of the map function, called by google function, assumes google has been intialized before 
function initMap() {
   // The map, centered at CSUN
  const CSUN = { lat: 34.2424918, lng: -118.5282616 };

 map = new google.maps.Map(document.getElementById("map"), { 
   //putting an anonymous local variable into the global variable, we set it this way so we can have map global be used with all functions
      zoom: 15.8, //zooms to this, looked best
      center: CSUN, //set CSUN as center of map
      mapId: '500a150e12fd04d6', //gives the nice map layout i made, highlights MOST of the school ALSO  //map color, styles, poi icons disabled on map styles here https://console.cloud.google.com/google/maps-apis/client/styles
      disableDefaultUI: true, //disables everything UI related
      scrollwheel: false, //prevents zoom with mouse
      gestureHandling: 'none' //prevents panning        
    }); //assigns map to the global variable using the local map setup

  //add event listeners in this initaliztion functions
   map.addListener("click", (e) => { //adding single click event listener
    drawChoice(e.latLng, map);
  });

   map.addListener("dblclick", (e) => { //adding dbl click event listener
    drawSelection(e.latLng, map);
  });
  console.log(quiz);

  map.data.add({ //draws the school border for reminder purposes
    geometry: new google.maps.Data.Polygon([
      worldLayer,
      schoolBoundaryLayer,
    ]),
  });
  

}

function drawChoice(latLng, map) //single click selection for quiz
{
  var bound = searchBounds(latLng);
  if(bound != -1) //if its a valid bound, we continue, we ignore any clicks out of bounds
    {
      //we select that area (draw rect in blue)
      updateMapChoice(bound, 'blue');
    }

}

function searchBounds(latLng) //searches latLng to see if click was in bounds of a building
{
  var i;
  //console.log("recieved : " +latLng.lat() + " " + latLng.lng());
  var lat = latLng.lat(); //get latitude
  var lng = latLng.lng(); //get longitude
  
   for(i = 0; i < allData.length; i++) //iterate through the building data
   {
     if(lat <= allData[i].bldg.north && lat >= allData[i].bldg.south && lng <= allData[i].bldg.east && lng >= allData[i].bldg.west) //check if the coord is within bounds, return which index it is
       {
          //console.log("we got a match : " + i);
         return i; //finding gives that index
       }
    }
  return -1; //not found gives -1
}

function drawSelection(latLng) //dbl click selection for quiz
{
  if(rectangleSelect) //if exists (usually), remove it (so we can click on this spot)
    {
      rectangleSelect.setMap(null); //delete old
    }
  
  var colorUsed; //variable to determine what color rectangle will be used
  
  //console.log("selction made : "+ " quiz[q]" + quiz[questionNumber]);
  if(questionNumber < 5) //check if active play
    {

    if(questionNumber != -1) // if there is a question ready (question corresponds to bound in allData), and game is in progress
      {
       var bound = searchBounds(latLng); //we are dbl clicking, hence our selection
        if(bound == quiz[questionNumber]) //and if bound matches question number, its implied that bound is not -1
        {
          //console.log("selction made : "+ "bound "+ bound + " quiz[q]" + quiz[questionNumber]);
          //if got here, then we made our selection correctly!

          totalCorrect++; 
          //draw green rect at the location
          colorUsed = "green";
          //add on to text in game
          document.getElementById("output").innerHTML += '<p class="corr">Your answer is correct!</p>';
        }
        else
        {
          //wrong, draw red rect
          colorUsed = "red";
          //add on to text in game
          document.getElementById("output").innerHTML += '<p class="incorr">Sorry wrong location.</p>';

        }

      }
    //draw new rectangle at this spot, based on the above color
   let tempRect =  new google.maps.Rectangle({ 
            strokeColor: colorUsed,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: colorUsed,
            fillOpacity: 0.35,
            map,
            bounds: allData[quiz[questionNumber]].bldg,  //based on what question we are on in the quiz, reference all data, then use those bounds (instead of copying them over)
          });
    
    quizRects[questionNumber] = tempRect; //store the rectangle in an array for management purposes

    questionNumber++; //wrong or right, we need to go to next question 
  
    askQuestion(); //ask the next question
      
    if(questionNumber == 5) //if we reached endgame, end the game
      {
        endState(); //helper funct to end the game
      }
 
    
    //update attempts left
     document.getElementById("attemptsLeft").innerHTML = (5 - questionNumber);
    
    } //end of active plays if
   //if a dbl click event occurs and no active plays, we effectively ignore it
 
  
}

function endState() //helper funct to end the game
{
   clearTimeout(timer); //stops running timer
  
  document.getElementById("score-holder").style.visibility = "visible"; //show the player score text
  
  document.getElementById("score").innerHTML = totalCorrect + " Correct, " + (5 - totalCorrect) + " Incorrect" //score report
        //implied that start over will be the function called to do all the cleaning
      
  document.getElementById("question-start").style.visibility = "hidden"; //hide the question, since game over
}


function askQuestion() //asks the next question based on where we are. takes the quiz # question and then uses this as a lookup to what building is needed
{
 if(questionNumber < 5) //add a question prompt!
      {
          document.getElementById("randomQ").innerHTML = allData[quiz[questionNumber]].name; //asks the building location based on where we are on the quiz
      }
}


function reset() //reset all vars used
{
    //console.log("hi232312312");
  
  //need to reset allData array (so vals/locations can be reused)
  var i; 
  for(i = 0; i < allData.length; i++)
    {
      allData[i].beenUsed = false;
    }

  for(i = 0; i < quizRects.length; i++) //clear the rectangle arrayu
    {
      quizRects[i].setMap(null);
    }
  
  if(rectangleSelect) //if exists (usually), remove it
    {
      rectangleSelect.setMap(null); //delete old
    }
  
  questionNumber = 0; //resetting the question #
  
  document.getElementById("score").innerHTML = "NaN"; //score clear
  document.getElementById("output").innerHTML = ""; //clear output
  document.getElementById("score-holder").style.visibility = "hidden"; 

  //clear vars used
  timer = null;
  hundredths = 0;
  minutes = 0;
  seconds = 0;
  gameStart(); //call the gamestart helper funct
  
  //console.log("baddabing");
  
  document.getElementById("timer").innerHTML = "00:00:00"; //clearing prev numbers

}
 
//assumes site been loaded, ready for question, picks a question to be used, marks it on the all data func
function pickLocation()
{
  //pick a random location from 0 - 29 (30 total locations in buildingData.js), given we have not used all locations
  //the intial runs of this function tries to spread out choices that hasnt been used before. 
  //after, if we have used all the locations already (game needs to restart hint hint), then this function helps with giving random numbers (that havent been used yet)
  
  var shortCircuit = 0; //in case you dont want to check infinity times, max times we are allowed to check

  var i = Math.floor(Math.random() * (30 - 0) + 0);  //pick a number to start

  while(shortCircuit < 100 && allData[i].beenUsed == true) //randomly pick another number if its false number
  {
    i = Math.floor(Math.random() * (30 - 0) + 0);  //picking the next number
    shortCircuit++; //inc shortcircuit counter
    //console.log('rolling ' + i + " " + shortCircuit);
  }
//console.log('picked '+ i);
  allData[i].beenUsed = true; //using this spot
  return i; //returns index of a spot that hasne tbeen used
  
}

function makeAQuiz() //picks 5 locations and puts it inside the quiz array
{ //we can change the 5 here to lengthen or shorten the game
  var question = 1;
  
  //commenting the below 2 lines of code and setting the question = 1 iterator to 0 will make 5 random questions 
  quiz[0] = 19; //this assings chapparal hall to the first question (what I was assigned to on Canvas)
  allData[19].beenUsed = true; // must also mark that it has been used
  
  for(question; question < 5; question++)  //for the number of questions in our quiz, pick a location to be used. if we replace all 5's in this program with a variable we can essentially change how many locations to test
    { //the latter 4 questions are randomized
      quiz[question] = pickLocation();
    }
 
  
} //when function has been completed, we have picked out what we want to test our user on


function updateMapChoice(bound, color) //this draws a blue square (that can disappear after a short time). This is future proofed in case we want to add more colors
{
   if(rectangleSelect) //if exists on entry (usually), remove it
    {
      // console.log("detected1");
      rectangleSelect.setMap(null); //delete old
    }
  
    if(questionNumber < 5 &&  questionNumber != -1)//if we not reached the end of the game, and a valid quiz is available, otherwise ignore
  { 
    setTimeout(() => { //we use a timeout function to draw a square 
     rectangleSelect = new google.maps.Rectangle({ //draw new rectangle at this spot
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map,
            bounds: allData[bound].bldg, //it is defined, just in a different js file. Looks up bounds based on the bound #id
          });
      }
  , 100); //short timeout so it can be removed
  }
    
   setTimeout(() =>{ if(rectangleSelect) //timeout to clear afterwards
      {
        // console.log("detected2");
        rectangleSelect.setMap(null); //delete old
      }
    }, 350);
  
 
}

//event listners
window.onload = setup(); //calls intial setup helper funct

resetButton.addEventListener("click", reset);//reset button

document.getElementById("start-text").addEventListener("click", gameStart, false);//listener to choose another test function


function setup() //does all the set up, initMap is autorun after this
{
  //console.log("setuptime");
  document.getElementById("question-start").style.visibility = "hidden";
  document.getElementById("score-holder").style.visibility = "hidden"; //hide the game score 
  document.getElementById("attempts-holder").style.visibility = "hidden"; //hide the attemps left
}

function gameStart() //entry point for the game to start
{
  makeAQuiz(); //pick 5 questions to quiz the user on
  questionNumber = 0; //we start at the first question
  totalCorrect = 0; //back to 0 total correct
  askQuestion(); //ask the question
  document.getElementById("attemptsLeft").innerHTML = 5; //always start at 5 attempts
  document.getElementById("question-start").style.visibility = "visible"; //show the question so we know what we are looking for
  document.getElementById("start-text").style.visibility = "hidden"; //hide the start button
  
  document.getElementById("attempts-holder").style.visibility = "visible"; //hide the attemps left

  if(timer == null) //if the game starts, initialize the timer object only once!
    {
       timer = setInterval(timeClock, 18); //repeatedly calls timeClock, the actual time, this is SAVED in the timer variable
            //im pretty sure 18 is the right speed, seems a little too fast
    }
  
}