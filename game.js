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
// ==========================
// Game Sounds
// ==========================

const sounds = {

    flip: new Audio(
        "melo-rock-13-by-ende-dot-app.mp3"
    ),

};


function playSound(){

    try{

        let s =
        sounds.flip.cloneNode();

        s.volume = 0.15;

        s.play();

    }catch(e){

        console.log(e);

    }

}
const MAX_LEVEL = 70;

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
// إنشاء مستوى جديد
// ==========================

function newLevel(){

    moves = 0;
    first = null;
    lock = false;

    let pairs = 4 + Math.floor((level - 1) / 2);

    if(pairs > SYMBOLS.length){
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

    const who = document.getElementById("who");
    if(who) who.textContent = player;

    const levelBox = document.getElementById("level");
    if(levelBox) levelBox.textContent = level;

    const scoreBox = document.getElementById("score");
    if(scoreBox) scoreBox.textContent = score;

    const coinsBox = document.getElementById("coins");
    if(coinsBox) coinsBox.textContent = coins;

    const movesBox = document.getElementById("moves");
    if(movesBox) movesBox.textContent = moves;

    const grid = document.getElementById("grid");

    if(!grid) return;

    grid.innerHTML = "";

    grid.style.gridTemplateColumns =
        "repeat(" + Math.ceil(Math.sqrt(deck.length)) + ",1fr)";

    deck.forEach((card,index)=>{

  const btn = document.createElement("button");

btn.type = "button";
btn.className = "tile";

        if(card.open || card.done){

            btn.classList.add("open");
            btn.textContent = card.v;

        }else{

            btn.textContent = "?";

        }

        if(card.done){
            btn.classList.add("done");
        }

        btn.onclick = () => flip(index);

        grid.appendChild(btn);

    });

}// ==========================
// قلب البطاقات
// ==========================

function flip(index){

    const card = deck[index];

    if(lock || card.open || card.done){
        return;
    }

    card.open = true;playSound();

    if(first === null){

        first = index;
        render();
        return;

    }

    moves++;

    const firstCard = deck[first];

    if(firstCard.v === card.v){

        firstCard.done = true;
        card.done = true;

        score += 10;
        coins += 5;

        first = null;

        if(deck.every(c => c.done)){

            if(level < MAX_LEVEL){

                level++;

                setTimeout(() => {

                    newLevel();

                },700);

            }else{

                alert("🎉 مبروك! أكملت جميع المستويات.");

            }

        }

        render();

    }else{

        lock = true;

        render();

        setTimeout(()=>{

            firstCard.open = false;
            card.open = false;

            first = null;
            lock = false;

            showLeaders();
           
            render();

        },700);

    }

}


// ==========================
// بدء اللعبة
// ==========================

window.startGame = function(username){

    player = username || "Player";

    localStorage.mmPlayer = player;

    loadProgress();

    const input = document.getElementById("name");
    if(input){
        input.value = player;
    }

    const login = document.getElementById("login");
    if(login){
        login.classList.add("hidden");
    }

    const game = document.getElementById("game");
    if(game){
        game.classList.remove("hidden");
    }

    newLevel();

};// ==========================
// حفظ التقدم
// ==========================

function saveProgress(){

    localStorage.mmProgress = JSON.stringify({

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

    const saved = JSON.parse(
        localStorage.mmProgress || "null"
    );

    if(saved && saved.player === player){

        level = saved.level || 1;
        score = saved.score || 0;
        coins = saved.coins || 0;

    }

}


// ==========================
// إعادة المستوى
// ==========================

function resetGame(){

    newLevel();

}

window.resetGame = resetGame;


// ==========================
// الخروج
// ==========================

function logout(){

    saveProgress();

    localStorage.removeItem("mmPlayer");

    location.reload();

}

window.logout = logout;


// ==========================
// زر ابدأ اللعبة
// ==========================

function start(){

    const name =
    document.getElementById("name").value.trim();


    if(!name){

        alert("اكتب اسم اللاعب أولاً");

        return;

    }


    startGame(name);

}

window.start = start;


// ==========================
// تم تحميل اللعبة
// ==========================
// ==========================
// لوحة المتصدرين
// ==========================

function addLeader(){

    let list = JSON.parse(
        localStorage.mmLeaders || "[]"
    );


    list.push({

        name: player,
        score: score

    });


    list.sort(
        (a,b)=> b.score - a.score
    );


    localStorage.mmLeaders =
    JSON.stringify(
        list.slice(0,10)
    );

}



function showLeaders(){

    const board =
    document.getElementById("board");


    if(!board) return;


    const list =
    JSON.parse(
        localStorage.mmLeaders || "[]"
    );


    board.innerHTML =
    list.length ?

    list.map((x,i)=>
    `<li>${i+1}- ${x.name} : ${x.score}</li>`
    ).join("")
    
    :

    "<li>لا توجد نتائج بعد</li>";

}


window.showLeaders = showLeaders;
// ==========================
// Daily Reward 🎁
// ==========================

function dailyReward(){

    const today =
    new Date().toDateString();


    const lastReward =
    localStorage.mmDailyReward;


    if(lastReward !== today){


        coins += 50;


        localStorage.mmDailyReward =
        today;


        localStorage.mmCoins =
        coins;


        setTimeout(()=>{

            alert(
                "🎁 مكافأة يومية!\n\nحصلت على 50 عملة"
            );

        },500);


    }

}


// تشغيل المكافأة عند بدء اللعبة

const oldStartGame = window.startGame;


window.startGame = function(username){

    oldStartGame(username);

    dailyReward();

};
console.log("game.js loaded successfully");
