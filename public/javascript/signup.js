async function userSignupForm(event) {
    event.preventDefault();

    const email = document.querySelector("#email-signup").value.trim();
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    const response = await fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
            email,
            username,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
};

document.querySelector(".userSignup").addEventListener("submit", userSignupForm);