// ==========================
// Pi Login System
// ==========================


let piUser = null;
let accessToken = null;



// تشغيل Pi SDK

Pi.init({

    version: "2.0",

    sandbox: true

});



// اختبار تحميل Pi

console.log(
    "Pi SDK Loaded:",
    window.Pi
);



// ==========================
// تسجيل الدخول عبر Pi
// ==========================


async function loginWithPi(){

    try{


        alert("بدء تسجيل الدخول عبر Pi");



        const auth = await Pi.authenticate(
            ["username"]
        );



        piUser = auth.user;

        accessToken =
        auth.accessToken;



        console.log(
            "Pi User:",
            piUser
        );



        const playerName =
        piUser.username;



        document
        .getElementById("name")
        .value =
        playerName;



        if(typeof openGame === "function"){

            openGame();

        }



    }catch(error){


        console.error(
            "Pi Login Error:",
            error
        );


        alert(
            "فشل تسجيل الدخول عبر Pi\n" +
            JSON.stringify(error)
        );


    }

}



// جعل الزر يستطيع الوصول للدالة

window.loginWithPi = loginWithPi;
