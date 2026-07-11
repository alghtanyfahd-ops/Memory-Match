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

"🐶","🐱","🐭","🐰",
"🦊","🐼","🐨","🐯",
"🦁","🐸","🐵","🐷",
"🐮","🐔","🐧","🦄"

];


// ==========================
// بداية المستوى
// ==========================

function newLevel(){

    moves = 0;
    first = null;
    lock = false;


    const pairs =
    Math.min(
        4 + Math.floor((level - 1) / 2),
        SYMBOLS.length
    );


    const symbols =
    SYMBOLS.slice(0,pairs);


    deck =
    [...symbols,...symbols]
    .sort(
        () => Math.random() - 0.5
    )
    .map(v => ({

        v:v,
        open:false,
        done:false

    }));


    render();

}


window.newLevel = newLevel;
