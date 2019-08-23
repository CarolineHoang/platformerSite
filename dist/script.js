/**
 * Author: Andrew Jakubowicz
 * Simple example of DOM manipulation with events.
**/

var screen = document.getElementById("screen");
var player = document.getElementById("player");
var platform = document.getElementsByClassName("platform");
// var platPos = [
//                 [50,450,100,20],
//                 [250,400,100,20],
//                 [300,350,100,20],
//                 [500,350,100,20]
//               ]
// var platPos = [
//                 500,350,100,20,
//                 350,350,100,20,
//                 250,400,100,20,
//                 350,450,100,20,
//                 50,450,100,20,
//                 650,470,100,5,
//                 5,480,1000,5
                
                
                
//               ]//200,470,500,5

var platPos = [
                500,310,100,20,
                350,310,100,20,
                250,340,100,20,
                650,350,100,20,
                350,390,100,20,
                50,390,100,20,
                500,430,100,20,
                650,430,100,20,
                5,480,1000,5
                
  
  
  
]//200,470,500,5


var height = 500, //determines how many pixels away from the top of the screen is our baseline where the box will lie at rest/ y=0
    width = 1300, //width of screen //"9vw"
    basePlayerHeight =63,
    playerHeight = basePlayerHeight, //actual box height ["tallness"] is determined in html; here we determine how high the base of the box is to the y=0 hight line
    //height -playerHeight = pixels between the bottom of the box and the green base line
    playerWidth = 40;

var speed = 5;

screen.setAttribute("width", width);
screen.setAttribute("height", height);


// Annoying because y is 0 at the TOP!

// Also the x co-ordinate of the player is on the top left.
// Set up data of the "game"
var worldData = {
  "player": {
    "x" : Math.floor(width / 2) - Math.floor(playerWidth / 2),
    "y" : 8, //height - playerHeight
    "fallingSpeed": 0,
    "currentDir": null,
    "jumpDisplacement": 1
  },
  // Stores the current held keys. Can be inspected.
  "keysDown": []
}

let update = () => {
  // Bind svg rectangle to worldData
  player.setAttribute("x", worldData.player.x);
  player.setAttribute("y", worldData.player.y);
}
update();


// We are now in the amazing position that we can
// update the data and call `update()` to simply
// draw the next frame.
// Set up a simple frameRate interval.
var interval = setInterval((callback)=>{
  // Stuff that happens in here happens every frame.

  

  



  if (worldData.player.x <=0 ){
    worldData.player.x =0 ;
  } 
  if (worldData.player.x >= width - playerWidth ){
    worldData.player.x = width -playerWidth ;
  }


  checkForPlatform (worldData.player.x , worldData.player.y);
  // console.log ("testtesttest");
  // if (checkForPlatform (worldData.player.x , worldData.player.y) === false){
  //   if (checkForPlatform (worldData.player.x , worldData.player.y) === false){
  //   playerHeight = basePlayerHeight;
  //   }
  // }
  
  
   // Lets move player if arrow key is down. 
  if (isKeyDown("ArrowLeft")){
    worldData.player.x -= speed;
    worldData.player.currentDir = "left"; //registers that you moved left last time
    //setTimeout("worldData.player.x -= speed", 2000);
    //setTimeout("alert('Boom!');", 2000);
  }
  if (isKeyDown("ArrowRight")){
    worldData.player.x += speed;
    worldData.player.currentDir = "right"; //registers that you moved right last time
  }
  
   if (isKeyDown("ArrowUp" ) && !(isKeyDown("ArrowRight")) && !(isKeyDown("ArrowLeft")) ){
    worldData.player.currentDir = null;
     //registers that you jumped STRAIGHT UP
     //playerHeight=playerHeight+5;
  }
  
  // Adding gravity
  if (height - worldData.player.y <= playerHeight && worldData.player.fallingSpeed >= 0){
    worldData.player.y = height - playerHeight;
    worldData.player.fallingSpeed = 0;
  } 


  
  else {
    // The player is falling
    worldData.player.y += worldData.player.fallingSpeed;
    worldData.player.fallingSpeed += .5;
    
     if (worldData.player.currentDir === "left") {
       worldData.player.x -= worldData.player.jumpDisplacement;          //if you were heading left midair, keep heading left
     //worldData.player.x -= speed *.5;
     //worldData.player.currentDir = null;
  }
     if (worldData.player.currentDir === "right") {
       worldData.player.x += worldData.player.jumpDisplacement;
     //if you were heading right midair, keep heading right
     //worldData.player.x += speed *.5;
  }  
     
  }
  
  
  if (isKeyDown("ArrowUp") && worldData.player.fallingSpeed === 0 && height - worldData.player.y === playerHeight){
    worldData.player.fallingSpeed = -8;
  }
  
  // Every frame we want to update the svg.
  update()
}, 30)


// Arrow keys.
document.addEventListener('keydown', (e)=>{
  var key = e.key;
  fireKeyAction(key, true)
});
document.addEventListener('keyup', (e)=>{
  var key = e.key;
  fireKeyAction(key, false)
});





function checkForPlatform (xVal, yVal){
  var cred = false;
  var currPlat;
  for (i=0;i<platPos.length;i+=4){
   
    console.log(platPos[(i+1)])
 
    if (yVal<=(platPos[(i+1)]-basePlayerHeight) && yVal> (platPos[(i+1)]-(2*basePlayerHeight)) && (xVal >=(platPos[i]-playerWidth)) && (xVal <=(platPos[i] +platPos[(i+2)]))   ) {

        playerHeight = basePlayerHeight + height-platPos[(i+1)] ;
         return true;   //chance that the charater will phase through a platform that is directly above another if we remove this

      }
      // currPlat = i/4;
      
      
      // console.log("this is a platform!!!" + platPos[i+1] + platPos[i] + "hctig ="+ (basePlayerHeight + height-platPos[i+1] ) );
      // cred =true;
      
      // break;
      
    } 
 

    // console.log((xVal <=(platPos[i]-playerWidth)) || (xVal >=(platPos[i] +platPos[i+2]))  ) 

  console.log ("x= "+xVal+ "          y="+ yVal);
//   var areAllFalse = true;
//   for (i=0;i<platPos.length;i+=4){
   
//     console.log(platPos[(i+1)])
 
//     if (yVal>(platPos[(i+1)]-basePlayerHeight + 10 ) && (xVal <=(platPos[i]-playerWidth)) || (xVal >=(platPos[i] +platPos[(i+2)]))   ) {
      
//       areAllFalse = false;
      
//       // break;
      
//     } 
//     if (areAllFalse === false){
//       return false;
//     }

//     // console.log((xVal <=(platPos[i]-playerWidth)) || (xVal >=(platPos[i] +platPos[i+2]))  ) 
// }
// return false;

}






// Filters keys and fires down or up.
// Updates world key array.
function fireKeyAction(key, isDown){
  // Only trigger Arrow keys.
  var keysDown = worldData.keysDown;
  switch(key){
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
      if (isDown) {
        // Only add the key if it's not already in the list.
        if (keysDown.indexOf(key) === -1) {
          keysDown.push(key);
        }
      } else {
        keysDown.splice(keysDown.indexOf(key), 1);
      };
  }
}

function isKeyDown(keyName){
  return worldData.keysDown.indexOf(keyName) !== -1
}