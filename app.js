let gameSeq = [];
let userSeq = [];
let btnColor = ["yellow", "red", "green", "purple"];

let start= false;
 
// starting of game 
function startGame() {
   document.addEventListener("keypress", function (){
      if(start == false)
      {
         console.log("start");
         start = true;
         levelUp();
      }
   })
};

let h2 = document.querySelector("h2");
let level = 0;

//   getting score and high score
let liveScore = document.querySelector(".score");
let highScore = document.querySelector(".high-score");
let high_score = 0;

// level up and start flshing btns
function levelUp() 
 {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`; 
    let score = (level*10)-10;
    liveScore.innerHTML = `<br> Score: ${score}`; 

       if(score > high_score)
        {
            high_score = score;
            highScore.innerHTML = `<br> High-Score: ${high_score}`; 
        }

    flash(randomBtnSelect());
 }


//  select random btns
const randomBtnSelect = ()=> {
    let idx = Math.floor(Math.random()* 4);            //generate random idx
    let btn = document.querySelector(`.${btnColor[idx]}`);
    gameSeq.push(btnColor[idx]);                        // pushing btn data to game array
    return btn;
 }

// flashes random btns internal
 function flash(btn)
  {

    btn.classList.toggle("flash");

       setTimeout(() => {
        btn.classList.toggle("flash");
       },150);
  }

//   flashes btns that pressed by user
  function userFlash(btn)
   {

        btn.classList.toggle("user-flash");

            setTimeout(() => {
            btn.classList.toggle("user-flash");
            },250);
   }


//    adding event listner for all btns
let allBtns = document.querySelectorAll(".btn");

for(btns of allBtns)
 {
    btns.addEventListener("click", function (){
        userFlash(this);
        userSeq.push(this.classList[1]);           // pushing btn data to user array

        matchColor(userSeq.length - 1);
    })
 }

// matching game and user data 
 
 function matchColor(idx)
  {
    if(userSeq[idx] === gameSeq[idx])
     {
        if(userSeq.length === gameSeq.length)
         {
            setTimeout(levelUp,1500);
         }
     }
     else {
            start = false;
            h2.innerHTML = `Game over! Press any Key to Restart`

            resetGame();           
            document.addEventListener("keypress",startGame());
        }
  }

//   reset the game
  const resetGame = ()=> {
    document.querySelector("body").style.backgroundColor = "red";
    
    setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "white";
    }, 50);

    level = 0;
    gameSeq = [];
    userSeq = []; 
  }

  startGame();