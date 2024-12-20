document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("register-btn");

    registerButton.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const firstname = document.getElementById("firstName").value;
        const lastname = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            // ทำการเรียกใช้ API สำหรับการลงทะเบียนที่นี่
            // ใช้ fetch หรือ axios เพื่อทำการ HTTP Request ไปยัง API

            // เช่น:
            fetch('https://neko-skills-api.replit.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
                    email: email,
                    firstname: firstname,
                    lastname: lastname
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                // ดำเนินการตามผลลัพธ์ที่ได้จาก API
                if (data.UserID) {
                    alert("Registration successful");
                    window.location.href="login.html"
                } else {
                    alert("Registration failed: ");
                }
            })
            .catch((error) => {
                alert("An error occurred during registration");
            });
        }
    });

    // function displayAlert(message) {
    //     const alertBox = document.querySelector(".alert-box");
    //     const alertMessage = document.querySelector(".alert");

    //     alertMessage.textContent = message;
    //     alertBox.style.display = "block";

    //     setTimeout(() => {
    //         alertBox.style.display = "none";
    //     }, 5000);
    // }
});