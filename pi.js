// ==========================
// Pi SDK
// ==========================

// تأكد من تحميل Pi SDK
if (typeof Pi === "undefined") {
    alert("خطأ: Pi SDK لم يتم تحميله.");
    console.error("Pi SDK is undefined");
} else {
    alert("pi.js تم تحميله");
    console.log("Pi =", Pi);

    Pi.init({
        version: "2.0",
        sandbox: true
    });
}

let piUser = null;
let accessToken = null;

// ==========================
// تسجيل الدخول
// ==========================
async function loginWithPi() {

    alert("نسخة pi.js الجديدة تعمل");

    try {

        alert("بدء المصادقة مع Pi");

        const auth = await Pi.authenticate(
            ["username"],
            function (payment) {
                console.log("Incomplete payment:", payment);
            },
            function (payment) {
                console.log("Completed payment:", payment);
            }
        );

        alert("تم تسجيل الدخول بنجاح");

        console.log(auth);

        piUser = auth.user;
        accessToken = auth.accessToken;

        if (typeof player !== "undefined") {
            player = piUser.username;
        }

        const input = document.getElementById("name");
        if (input) {
            input.value = piUser.username;
        }

        if (typeof openGame === "function") {
            openGame();
        }

    } catch (err) {

        console.error("Pi Error:", err);

        alert(
            "حدث خطأ أثناء تسجيل الدخول.\n\n" +
            "message: " + (err.message || "لا توجد رسالة") + "\n" +
            "code: " + (err.code || "لا يوجد") + "\n\n" +
            JSON.stringify(err)
        );
    }
}

// جعل الدالة متاحة لـ onclick
window.loginWithPi = loginWithPi;

// ==========================
// تسجيل الخروج
// ==========================
function logoutPi() {
    piUser = null;
    accessToken = null;
}

window.logoutPi = logoutPi;
