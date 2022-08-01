const Elements = {
    userIn: document.querySelector(".header input"),
    getBtn: document.querySelector(".header span"),
    dataField: document.querySelector(".data"),
};

Elements.userIn.focus();

Elements.getBtn.addEventListener("click", () => {
    open(`https://github.com/${Elements.userIn.value}`, `_blank`);
});

Elements.userIn.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {
        open(`https://github.com/${Elements.userIn.value}`, `_blank`);
    }
});

Elements.userIn.addEventListener("input", () => {
    console.log("fetching...");
    checkUser();
});

function checkUser() {
    setTimeout(() => {
        let inValue = Elements.userIn.value,
            validName = Array.from(inValue)
                .filter((char) => {
                    return char.match(/[a-zA-Z]/);
                })
                .toString()
                .replace(/[,]/g, "");

        if (validName.trim() !== "") {
            fetchRepos(validName);
        } else {
            Elements.dataField.innerHTML = `<span>Invalid User Name !</span>`;
        }
    }, 1000);
}

function fetchRepos(username) {
    let url = `https://api.github.com/users/${username}/repos`;

    try {
        fetch(url)
            .then((res) => res.json())
            .then((repos) => {
                if (repos.length > 0) {
                    console.log("data found");

                    Elements.dataField.innerHTML = "";

                    repos.forEach((repo) => {
                        let link = document.createElement("a"),
                            capsola = document.createElement("div"),
                            repoSpan = document.createElement("span"),
                            repoData = document.createTextNode(repo.name),
                            repoUrl = repo.html_url,
                            starSpan = document.createElement("span"),
                            starImg = document.createElement("img"),
                            starTxt = document.createTextNode(
                                `${repo.stargazers_count}`
                            );

                        link.classList.add("link");
                        link.setAttribute("target", "_blank");
                        link.href = `${repoUrl}`;

                        capsola.classList.add("capsola");

                        starImg.setAttribute("class", "star");
                        starImg.setAttribute("src", "star.png");

                        starSpan.appendChild(starTxt);
                        starSpan.appendChild(starImg);
                        repoSpan.appendChild(repoData);
                        capsola.appendChild(repoSpan);
                        capsola.appendChild(starSpan);
                        link.appendChild(capsola);
                        Elements.dataField.appendChild(link);
                    });
                } else {
                    console.log("No Data");
                    Elements.dataField.innerHTML = `No Data to show`;
                }
            });
    } catch (err) {
        console.error(err);
    }
}
