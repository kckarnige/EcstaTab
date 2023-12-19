window.onload = () => {
    if (localStorage.getItem("fetchedBgImg")) {
        document.getElementById("background").style.backgroundImage = `url(${localStorage.getItem("fetchedBgImg")})`;
    }
    if (localStorage.getItem("unsplashApiKey")) {
        document.getElementById("setKeyBox").value =
            localStorage.getItem("unsplashApiKey");
    } else {
        document.getElementById("cornerButton").classList.add("hide");
    }
    if (!localStorage.getItem("unsplashApiQuery")) {
        localStorage.setItem("unsplashApiQuery", "&query=sea")
    }
};
document.body.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        if (document.getElementById("setKeyBox").value.length == 43) {
            localStorage.setItem(
                "unsplashApiKey",
                document.getElementById("setKeyBox").value
            );
            alert(`Successfully set!`);
            if (document.getElementsByClassName("hide")[0]) {
                location.href = "index.html"
            }
        } else {
            alert(`Must be a 43 character Unsplash access key.`);
        }
    }
});
