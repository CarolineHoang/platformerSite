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
var platPos = [
                500,350,100,20,
                250,400,100,20,
                350,450,100,20,
                50,450,100,20
                
                
                
              ]

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

  

  


    // for (i=0;i<platPos.length;i++){
    //   for (j=0;j<platPos[i].length;j++)
        
    //     if (worldData.player.y <platPos[i][1]  && (worldData.player.x >=platPos[i][0]-playerWidth) && (worldData.player.x <=platPos[i][0] +platPos[i][2])   ){
    //       playerHeight = basePlayerHeight + height-platPos[i][1] ;
    //       console.log("this is a platform!!!" + platPos[i][1] + platPos[i][0] + "hctig ="+ (basePlayerHeight + height-platPos[i][1] ) );
    //     } 
  
    //     // else{
    //     //   playerHeight = basePlayerHeight;
    //     //   console.log("NO platform!!!" + platPos[i][1]);
    //     // }
    // }
  
    //   playerHeight = basePlayerHeight;
    //   console.log("NO platform!!!");
 







          // //to land on the test platform:
          // if (worldData.player.y <430  && (worldData.player.x >=50-50+5) && (worldData.player.x <=50 +150)   ){
          //   playerHeight = 63 + 500-450;
          // } 
          // else{
          //   playerHeight = 63;
          // }
  //set boundaries to not run off screen
  if (worldData.player.x <=0 ){
    worldData.player.x =0 ;
  } 
  if (worldData.player.x >= width - playerWidth ){
    worldData.player.x = width -playerWidth ;
  } 


  checkForPlatform (worldData.player.x , worldData.player.y);
  
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
  for (i=0;i<platPos.length;i+=4){
   
    console.log(platPos[(i+1)])
 
    if (yVal<=(platPos[(i+1)]-basePlayerHeight) && (xVal >=(platPos[i]-playerWidth)) && (xVal <=(platPos[i] +platPos[(i+2)]))   ) {

      playerHeight = basePlayerHeight + height-platPos[(i+1)] ;
      
      console.log("this is a platform!!!" + platPos[i+1] + platPos[i] + "hctig ="+ (basePlayerHeight + height-platPos[i+1] ) );
      cred =true;
      break;
      
    } 
    // if (yVal===(platPos[(i+1)]-basePlayerHeight) && (xVal >=(platPos[i]-playerWidth)) && (xVal <=(platPos[i] +platPos[(i+2)]))   ) {
    // worldData.player.fallingSpeed = 0
    // worldData.player.y = (platPos[(i+1)]-basePlayerHeight);
    // }





    // else if ((xVal <=(platPos[i]-playerWidth)) || (xVal >=(platPos[i] +platPos[i+2])) ){
    //   playerHeight = basePlayerHeight;
    //   // console.log("NO platform!!!" + playerHeight);
    // }

    // else { //if (yVal <= basePlayerHeight)
    //   playerHeight = basePlayerHeight;
    //   console.log("NO platform!!!" + platPos[(i+1)]);
    // }
    // console.log("something's weird")
    
    // console.log ("is it true?="+ ((yVal<=platPos[i][1] && (xVal >=platPos[i][0]-playerWidth) && (xVal <=(platPos[i][0] +platPos[i][2]))   )));
    // console.log ("check="+(xVal >=(platPos[i]-playerWidth)))
    // console.log("x=" +worldData.player.x+ "    maxX="+ (platPos[i][0] +platPos[i][2])  + (xVal <=(platPos[i][0] +platPos[i][2]))    +"     y="+ yVal)
    // console.log("x="+xVal +"    y="+yVal);
    // console.log ((xVal >=(platPos[i]-playerWidth)) + "    x= "+xVal+ "          "+ (platPos[i]-playerWidth));
    console.log((xVal <=(platPos[i]-playerWidth)) || (xVal >=(platPos[i] +platPos[i+2]))  ) 
}
// for (i=0;i<platPos.length;i+=4){
   
//   if (cred === false && ((xVal <=(platPos[i]-playerWidth)) || (xVal >=(platPos[i] +platPos[i+2])) )){
//     playerHeight = basePlayerHeight;
//     // console.log("NO platform!!!" + playerHeight);
//   }
// }

  console.log ("cred=" + cred)
  if (cred === false){
  playerHeight = basePlayerHeight;
  // console.log("NO platform!!!" + playerHeight);
}



  // if ((xVal <=(platPos[i]-playerWidth)) || (xVal >=(platPos[i] +platPos[i+2])) ){
  //   playerHeight = basePlayerHeight;
  //   // console.log("NO platform!!!" + playerHeight);
  // }
  console.log ("x= "+xVal+ "          y="+ yVal);


}




// if (worldData.player.y!= 0){
//   checkForPlatform (worldData.player.x , worldData.player.y);
// }




// function checkForPlatform (xVal, yVal){
//   var cred = false;
//   for (i=0;i<platPos.length;i++){
   
      
//       if (yVal<=platPos[i][1] && (xVal >=(platPos[i][0]-playerWidth)) && (xVal <=(platPos[i][0] +platPos[i][2]))   ) {
//         playerHeight = basePlayerHeight + height-platPos[i][1] ;
//         // console.log("this is a platform!!!" + platPos[i][1] + platPos[i][0] + "hctig ="+ (basePlayerHeight + height-platPos[i][1] ) );
//         cred =true;
//         break;
        
//       } 

//       else { //if (yVal <= basePlayerHeight)
//         playerHeight = basePlayerHeight;
//         console.log("NO platform!!!" + platPos[i][1]);
//       }
  
      
//       // console.log ("is it true?="+ ((yVal<=platPos[i][1] && (xVal >=platPos[i][0]-playerWidth) && (xVal <=(platPos[i][0] +platPos[i][2]))   )));
//       console.log ("check="+(xVal >=(platPos[i][0]-playerWidth)))
//       // console.log("x=" +worldData.player.x+ "    maxX="+ (platPos[i][0] +platPos[i][2])  + (xVal <=(platPos[i][0] +platPos[i][2]))    +"     y="+ yVal)
//       // console.log("x="+xVal +"    y="+yVal);
//       console.log ((xVal >=(platPos[i][0]-playerWidth)) + "    x= "+xVal+ "          "+ (platPos[i][0]-playerWidth));
//   }

//     // playerHeight = basePlayerHeight;
//     //  console.log("NO platform!!!" + playerHeight);

// }

// }

            
            // //to land on the test platform:
            // if (worldData.player.y <430  && (worldData.player.x >=50-50+5) && (worldData.player.x <=50 +150)   ){
            //   playerHeight = 63 + 500-450;
            // } 
            // else{
            //   playerHeight = 63;
            // }


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