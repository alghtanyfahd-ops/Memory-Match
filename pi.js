// ==========================
// Pi Login System
// ==========================


let piUser = null;
let accessToken = null;


// ==========================
// تشغيل Pi SDK
// ==========================

if (typeof Pi === "undefined") {

    alert("خطأ: Pi SDK غير محمل");

    console.error(
        "Pi SDK not found"
    );

} else {


    Pi.init({

        version: "2.0",

        sandbox: true

    });


    console.log(
        "Pi SDK Loaded:",
        window.Pi
    );

}



// ==========================
// تسجيل الدخول عبر Pi
// ==========================


async function loginWithPi(){


    try{


        alert(
            "بدء تسجيل الدخول عبر Pi"
        );



        if(typeof Pi === "undefined"){

            throw new Error(
                "Pi SDK غير موجود"
            );

        }



        const auth =
        await Pi.authenticate(
            ["username"]
        );



        console.log(
            "Authentication:",
            auth
        );



        piUser =
        auth.user;


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

            nameInput.value =
            playerName;

        }



        alert(
            "تم تسجيل الدخول بنجاح: "
            + playerName
        );



     if(typeof openGame === "function"){

    alert("وجدت دالة openGame");

    openGame();

}else{

    alert("لا توجد دالة openGame");

}


    }catch(error){


        console.error(
            "Pi Login Error:",
            error
        );



        alert(

            "خطأ Pi\n\n" +

            "الرسالة: "
            +
            (error.message || "لا توجد رسالة")
            +

            "\n\nالكود: "
            +
            (error.code || "لا يوجد")
            +

            "\n\nالتفاصيل: "
            +
            JSON.stringify(error)

        );


    }


}



// ==========================
// تسجيل الخروج
// ==========================


function logoutPi(){

    piUser = null;

    accessToken = null;

}



window.loginWithPi = loginWithPi;

window.logoutPi = logoutPi;
