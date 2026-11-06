const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    const response = await fetch(form.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Message sent successfully!");
    } else {
        alert("Something went wrong!");
    }
});