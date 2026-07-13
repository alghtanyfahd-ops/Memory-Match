let piUser = null;

async function initPi() {
    try {

        await Pi.init({
            version: "2.0",
            sandbox: true
        });

        console.log("Pi SDK Ready");

    } catch (e) {

        console.error(e);

    }
}

window.addEventListener("load", initPi);


window.loginAndEnter = async function () {

    try {

        const auth = await Pi.authenticate(["username"]);

        piUser = auth.user;

        localStorage.setItem("piUser", piUser.username);

        enterApp();

    } catch (err) {

        console.error(err);

        alert("فشل تسجيل الدخول");

    }

};
