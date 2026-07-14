let currentPiUser = null;

async function initPi() {
    try {
        await Pi.init({
            version: "2.0",
            sandbox: true
        });

        console.log("Pi SDK جاهز");
    } catch (error) {
        console.error("خطأ في تهيئة Pi SDK:", error);
    }
}

window.addEventListener("load", initPi);

window.loginPi = async function () {
    alert("تم الضغط على زر Pi");

    try {
        const auth = await Pi.authenticate(["username"]);

        currentPiUser = auth.user;

        localStorage.setItem("piUsername", currentPiUser.username);

        const userElement = document.getElementById("playerName");
        if (userElement) {
            userElement.textContent = currentPiUser.username;
        }

        console.log("تم تسجيل الدخول:", currentPiUser.username);

    } catch (error) {
        console.error("فشل تسجيل الدخول:", error);
    }
};

window.logoutPi = function () {
    localStorage.removeItem("piUsername");
    location.reload();
};

window.getPiUser = function () {
    return currentPiUser;
};
window.loginWithPi = window.loginPi;
