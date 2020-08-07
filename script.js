const gameContainer = document.getElementById("game");
let allowrestart =false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let counter=0;
let colorspicked=[];
let score=0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(counter<2 && (event.target.style.backgroundColor=="")){
    
    event.target.style.backgroundColor=event.target.className;
   //event.target.classList.add("next");
    colorspicked.push(event.target.className)
    
    counter++;
  if(colorspicked.length==2 ){
    
    if(colorspicked[0]!=colorspicked[1]){
      
      targets=[];
      setTimeout(function(){
        const div1=document.querySelectorAll(`.${colorspicked[0]}`)
        const div2=document.querySelectorAll(`.${colorspicked[1]}`)
         for(let d of div1){
           if(!d.classList.contains("match")){
            d.style.backgroundColor="";
           }
          
         }
         for(let d of div2){
          if(!d.classList.contains("match")){
            d.style.backgroundColor="";
           }
         }

        colorspicked=[];
        counter=0;

      },1000)
    }else{

      const samedivs=document.querySelectorAll(`.${colorspicked[0]}`);
      for(let s of samedivs){
        s.classList.add("match");
        

      }
      
      colorspicked=[];
        counter=0;
    }
    score++;
    document.getElementById("score").value=score;
    if(document.querySelectorAll("#game div.match").length==COLORS.length){
      console.log("done")
       allowrestart =true;
      if(localStorage.getItem("leastscore")){
        let currentscore= parseInt(localStorage.getItem("leastscore"))
        score= Math.min(currentscore,score);
        localStorage.setItem("leastscore",score)
      }else{
        localStorage.setItem("leastscore",score)
      }
    }
  }
  }
  
  //console.log("you just clicked", event.target);
}

// when the DOM loads
let begin=true;
const start = document.getElementById("start");

  start.addEventListener("click",function(){
    if(begin){
      document.getElementById("score").value="0";
      createDivsForColors(shuffledColors)

    }
    begin =false;
    
  });
  const restart = document.getElementById("restart");
  restart.addEventListener("click",function(){
    const divstoreset = document.querySelectorAll(".match")
if(allowrestart){
    for(let div of divstoreset){
      div.classList.remove("match")
      div.style.backgroundColor=""
      score=0;
      document.getElementById("score").value="0";
      if(localStorage.getItem("leastscore")){
        document.getElementById("bestscore").value=localStorage.getItem("leastscore");
      }
    }
  }
  })
  if(localStorage.getItem("leastscore")){
    document.getElementById("bestscore").value=localStorage.getItem("leastscore");
  }


