if (localStorage.getItem("lastFetch")) {
    document.getElementById("background").style.background = "transparent";
    document.getElementById("root").style.background = "rgba(255,255,255,0.05)";
    document.getElementById("root").style.backdropFilter = "blur(15px)";
    document.body.style.background = "transparent";
}

window.onload = () => {
    if (localStorage.getItem("unsplashApiKey")) {
        document.getElementById("setKeyBox").value =
            localStorage.getItem("unsplashApiKey");
    } else {
        document.getElementById("cornerButtonContainer").classList.add("hide");
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
document.getElementsByClassName("settings")[0].addEventListener("click", () => {
    parent.document.getElementById("settingsPanelContainer").style.display = "none"
    parent.document.getElementsByClassName("options")[0].style.display = "block";
})
