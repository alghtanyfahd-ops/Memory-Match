// ==========================
// Memory Match Game
// ==========================

let player = "";
let level = 1;
let score = 0;
let coins = 0;
let moves = 0;

let first = null;
let lock = false;

let deck = [];


// المستويات

const MAX_LEVEL = 70;


// الرموز

const SYMBOLS = [
"🐶","🐱","🐭","🐰","🦊",
"🐼","🐨","🐯","🦁","🐸",
"🐵","🐷","🐮","🐔","🐧",
"🦄","🐝","🦋","🐢","🐬",
"🍎","🍌","🍇","🍉","🍒",
"⚽","🏀","🏈","🎾","🎲",
"🚗","🚕","🚌","🚓","🚑",
"🌲","🌳","🌴","🌸","🌹",
"⭐","🌙","☀️","🔥"
];

// ==========================
// بداية المستوى
// ==========================

function newLevel(){

    moves = 0;
    first = null;
    lock = false;

    let pairs = 4 + Math.floor((level - 1) / 2);

    if(pairs > Math.floor(SYMBOLS.length / 1)){
        pairs = SYMBOLS.length;
    }

    const symbols = SYMBOLS.slice(0, pairs);

    deck = [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map(symbol => ({
            v: symbol,
            open: false,
            done: false
        }));

    render();
}


window.newLevel = newLevel;
// ==========================
// رسم اللعبة
// ==========================

function render(){

    const who =
    document.getElementById("who");

    if(who){
        who.textContent = player;
    }


    const levelBox =
    document.getElementById("level");

    if(levelBox){
        levelBox.textContent = level;
    }


    const scoreBox =
    document.getElementById("score");

    if(scoreBox){
        scoreBox.textContent = score;
    }


    const movesBox =
    document.getElementById("moves");

    if(movesBox){
        movesBox.textContent = moves;
    }


    const tilesBox =
    document.getElementById("tiles");

    if(tilesBox){
        tilesBox.textContent = deck.length;
    }



    const grid =
    document.getElementById("grid");


    if(!grid) return;


    grid.innerHTML = "";



    deck.forEach((card,index)=>{


        const btn =
        document.createElement("button");


        btn.className =
        "tile " +
        ((card.open || card.done)
        ? "open "
        : "") +
        (card.done ? "done" : "");



        btn.textContent =
        (card.open || card.done)
        ? card.v
        : "?";



        btn.onclick = function(){

            flip(index);

        };



        grid.appendChild(btn);


    });


}



// ==========================
// فتح البطاقة
// ==========================

function flip(index){


    const card =
    deck[index];


    if(
        lock ||
        card.open ||
        card.done
    ){

        return;

    }



    card.open = true;



    if(first === null){

        first = index;

        render();

        return;

    }



    moves++;


    const firstCard =
    deck[first];



    if(firstCard.v === card.v){


        firstCard.done = true;

        card.done = true;


        score += 10;

        coins += 5;



        first = null;



        if(
            deck.every(
                x => x.done
            )
        ){

            level++;


            setTimeout(
                newLevel,
                700
            );

        }



    }else{


        lock = true;


        setTimeout(()=>{


            firstCard.open = false;

            card.open = false;


            first = null;

            lock = false;


            render();


        },700);


    }



    render();

}
// ==========================
// فتح اللعبة
// ==========================

window.startGame = function(username){

    player = username || "Player";


    localStorage.mmPlayer =
    player;


    const name =
    document.getElementById("name");


    if(name){

        name.value = player;

    }


    const login =
    document.getElementById("login");


    const game =
    document.getElementById("game");


    if(login){

        login.classList.add("hidden");

    }


    if(game){

        game.classList.remove("hidden");

    }


    newLevel();

};



// ==========================
// حفظ التقدم
// ==========================

function saveProgress(){

    localStorage.mmProgress =
    JSON.stringify({

        player: player,

        level: level,

        score: score,

        coins: coins

    });

}



// ==========================
// تحميل التقدم
// ==========================

function loadProgress(){


    const saved =
    JSON.parse(
        localStorage.mmProgress || "null"
    );


    if(saved && saved.player === player){


        level =
        saved.level || 1;


        score =
        saved.score || 0;


        coins =
        saved.coins || 0;


    }

}



// ==========================
// إعادة اللعبة
// ==========================

function resetGame(){

    newLevel();

}



window.resetGame = resetGame;



// ==========================
// خروج
// ==========================

function logout(){

    saveProgress();

    location.reload();

}


window.logout = logout;



console.log(
    "game.js loaded successfully"
);
