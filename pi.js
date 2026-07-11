alert("pi.js تم تحميله");
// ==========================
// Pi SDK
// ==========================

let piUser = null;
let accessToken = null;

Pi.init({
    version: "2.0",
    sandbox: true
});

console.log("Pi =", window.Pi);
alert(typeof Pi);

// تسجيل الدخول
async function loginWithPi() {

    try {

        alert("1- بدأ تسجيل الدخول");

        const auth = await Pi.authenticate(
            ["username"],
            function(payment){},
            function(payment){}
        );

        alert("2- نجح تسجيل الدخول");

        console.log(auth);

        piUser = auth.user;
        accessToken = auth.accessToken;

        player = piUser.username;

        document.getElementById("name").value = player;

        openGame();

    } catch(err) {
console.error("Pi Error:", err);

alert(
    "الرسالة: " + (err.message || "") +
    "\nالكود: " + (err.code || "") +
    "\nالبيانات: " + JSON.stringify(err)
); 
}
}

window.loginWithPi = loginWithPi;
