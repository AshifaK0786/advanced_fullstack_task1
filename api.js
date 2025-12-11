let url = "https://api.github.com/users";

// MAIN USER LIST
fetch(url)
    .then(res => res.json())
    .then(data => {
        let container = document.getElementById("container");

        data.map(user => {
            let card = document.createElement("div");
            card.className = "card";

            let img = document.createElement("img");
            img.src = user.avatar_url;

            let name = document.createElement("h3");
            name.innerText = user.login;

            let type = document.createElement("p");
            type.innerText = `Type: ${user.type}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(type);

            // CLICK → show details
            card.addEventListener("click", () => showDetails(user.login));

            container.appendChild(card);
        });
    });


// SHOW FULL DETAILS
function showDetails(username) {
    // Hide container
    document.getElementById("container").style.display = "none";
    document.getElementById("detailsSection").style.display = "block";

    fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById("avatar").src = user.avatar_url;
            document.getElementById("name").innerText = `Name: ${user.name}`;
            document.getElementById("login").innerText = `Login: ${user.login}`;
            document.getElementById("type").innerText = `Type: ${user.type}`;
            document.getElementById("url").innerText = `Profile: ${user.html_url}`;
            document.getElementById("repos").innerText = `Public Repos: ${user.public_repos}`;
            document.getElementById("followers").innerText = `Followers: ${user.followers}`;
            document.getElementById("following").innerText = `Following: ${user.following}`;
        });
}


// BACK BUTTON → Return to list
document.getElementById("backBtn").addEventListener("click", function () {
    document.getElementById("detailsSection").style.display = "none";
    document.getElementById("container").style.display = "grid";
});
