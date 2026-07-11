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

// تسجيل الدخول
async function loginWithPi() {

    try {

        const auth = await Pi.authenticate(["username"]);

        piUser = auth.user;
        accessToken = auth.accessToken;

        player = piUser.username;

        document.getElementById("name").value = player;

        openGame();

    } catch (err) {

        console.error(err);

        alert("تعذر تسجيل الدخول بحساب Pi");

    }

}

// تسجيل الخروج
function logoutPi() {

    piUser = null;
    accessToken = null;

}

// هل المستخدم مسجل؟
function isPiLoggedIn() {

    return piUser !== null;

}

// اسم المستخدم
function getPiUsername() {

    return piUser ? piUser.username : "";
window.loginWithPi = loginWithPi;
}
