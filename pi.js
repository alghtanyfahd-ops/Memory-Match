// ==========================
// Pi Login System
// ==========================

let piUser = null;
let accessToken = null;


// ==========================
// تشغيل Pi SDK
// ==========================

if (typeof Pi === "undefined") {

    console.error("Pi SDK not loaded");

} else {

    Pi.init({

        version: "2.0",

        sandbox: true

    });

}


// ==========================
// تسجيل الدخول عبر Pi
// ==========================

async function loginWithPi(){

    try {


        const auth =
        await Pi.authenticate(
            ["username"]
        );


        piUser = auth.user;

        accessToken =
        auth.accessToken;



        if(!piUser){

            throw new Error(
                "لم يتم استلام بيانات المستخدم"
            );

        }



        const playerName =
        piUser.username;



        const nameInput =
        document.getElementById("name");


        if(nameInput){

            nameInput.value = playerName;

        }



        // فتح اللعبة

        if(typeof startGame === "function"){

            startGame(playerName);

        }
        else if(typeof openGame === "function"){

            openGame();

        }


    } catch(error){


        console.error(
            "Pi Login Error:",
            error
        );


        alert(
            "تعذر تسجيل الدخول عبر Pi"
        );

    }

}


// جعل الزر يعمل

window.loginWithPi = loginWithPi;



// ==========================
// فتح اللعبة
// ==========================

window.openGame = function(){


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


    if(typeof newLevel === "function"){

        newLevel();

    }

};
