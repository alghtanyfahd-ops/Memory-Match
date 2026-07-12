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

}

// ==========================
// قلب البطاقات
// ==========================

function flip(index){

    const card = deck[index];

    if(lock || card.open || card.done){
        return;
    }

    card.open = true;

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

        render();

        if(deck.every(c => c.done)){

            if(typeof celebrateWin === "function"){
                celebrateWin();
            }

            if(level < MAX_LEVEL){

                level++;

                saveScore();

                setTimeout(function(){

                    newLevel();

                },700);

            }else{

                alert("🎉 مبروك! لقد أنهيت جميع المستويات.");

            }

        }

    }else{

        lock = true;

        render();

        setTimeout(function(){

            firstCard.open = false;
            card.open = false;

            first = null;
            lock = false;

            render();

            showLeaders();

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

    const login = document.getElementById("login");
    if(login){
        login.classList.add("hidden");
    }

    const game = document.getElementById("game");
    if(game){
        game.classList.remove("hidden");
    }

    // إخفاء عجلة الحظ عند بدء اللعبة
    const wheel = document.getElementById("wheelModal");
    if(wheel){
        wheel.classList.add("hidden");
    }

    newLevel();

    dailyReward();

    showLeaders();

};

// ==========================
// زر ابدأ اللعبة
// ==========================

function start(){

    const input = document.getElementById("name");

    if(!input){
        return;
    }

    const name = input.value.trim();

    if(name === ""){

        alert("اكتب اسم اللاعب أولاً");

        return;

    }

    startGame(name);

}

window.start = start;

// ==========================
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
// المكافأة اليومية
// ==========================

function dailyReward(){

    const today = new Date().toDateString();

    const lastReward = localStorage.mmDailyReward;

    if(lastReward !== today){

        coins += 50;

        localStorage.mmDailyReward = today;

        render();

        setTimeout(function(){

            alert("🎁 حصلت على 50 عملة كمكافأة يومية!");

        },400);

    }

}
// ==========================
// حفظ النقاط على السيرفر
// ==========================

async function saveScore(){

    try{

        await fetch("/api/leaderboard",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name: player,
                score: score,
                level: level

            })

        });

        showLeaders();

    }catch(error){

        console.log("Leaderboard Error:", error);

    }

}

// ==========================
// لوحة المتصدرين
// ==========================

async function showLeaders(){

    const board = document.getElementById("board");

    if(!board){
        return;
    }

    try{

        const res = await fetch("/api/leaderboard");

        const data = await res.json();

        if(!data.ok){

            board.innerHTML =
            "<li>لا توجد بيانات</li>";

            return;
        }

        board.innerHTML = "";

        data.players.forEach(function(playerData,index){

            const li = document.createElement("li");

            li.textContent =
            "🏆 " +
            (index+1) +
            " - " +
            playerData.name +
            " : " +
            playerData.score +
            " نقطة";

            board.appendChild(li);

        });

    }catch(error){

        console.log(error);

    }

}

window.showLeaders = showLeaders;

// ==========================
// إضافة عملات (لعجلة الحظ)
// ==========================

window.addCoins = function(amount){

    coins += amount;

    render();

    saveProgress();

};

// ==========================
// عند تحميل الصفحة
// ==========================

window.onload = function(){

    const wheel =
    document.getElementById("wheelModal");

    if(wheel){

        wheel.classList.add("hidden");

    }

    if(localStorage.mmPlayer){

        const input =
        document.getElementById("name");

        if(input){

            input.value =
            localStorage.mmPlayer;

        }

    }

    showLeaders();

};

console.log("game.js loaded successfully");
